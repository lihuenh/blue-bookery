const express = require('express')
const mysql = require('mysql2')
const { config } = require('dotenv')
const cors = require('cors')
const os = require('os')
const fs = require('fs')

config()

const app = express()
const port = process.env.NODE_DOCKER_PORT

const hostname = os.hostname()
const interfaces = os.networkInterfaces()
let ipAddress = ''

app.use(express.json())

const corsOptions = {
  origin: '*', // Cambia esto a la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Cabeceras permitidas
  credentials: true, // Allows credentials like cookies, Authorization headers, etc.
}

app.use(cors(corsOptions))

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  port: process.env.MYSQLDB_DOCKER_PORT,
})

function isDocker() {
  try {
    return fs.existsSync('/.dockerenv')
  } catch (err) {
    return false
  }
}

// Función para detectar si estamos en Kubernetes
function isKubernetes() {
  return process.env.KUBERNETES_SERVICE_HOST !== undefined
}

// Función para obtener la IP del contenedor
function getIpAddress() {
  const interfaces = os.networkInterfaces()
  let ipAddress = ''
  Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((interfaceInfo) => {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        ipAddress = interfaceInfo.address
      }
    })
  })
  return ipAddress
}

db.connect((err) => {
  if (err) throw err
  console.log('Conectado a la base de datos MySQL')
})

// Obtener todos los libros
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

// Ruta para obtener la información del contenedor/host
app.get('/api/hostinfo', (req, res) => {
  const docker = isDocker()
  const kubernetes = isKubernetes()
  const podName = process.env.HOSTNAME || 'No es un pod de Kubernetes'
  const hostname = os.hostname()
  const ipAddress = getIpAddress()

  res.json({
    Docker: docker,
    Kubernetes: kubernetes,
    PodName: podName,
    hostname: hostname,
    IP: ipAddress,
  })
})

// Obtener detalles de un libro específico
app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id

  // Buscar el libro por ID
  db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, result) => {
    if (err) throw err
    if (result.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    res.json(result[0]) // Retornar el primer (y único) resultado
  })
})

// Crear un nuevo libro
app.post('/api/books', (req, res) => {
  const { author, title, year, publisher, user, image } = req.body
  const date = new Date()
  const query =
    'INSERT INTO books (author, title, year, publisher, uploaded_by, upload_date, last_modified, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  db.query(
    query,
    [author, title, year, publisher, user, date, date, image],
    (err, result) => {
      if (err) throw err
      res.status(201).json({ id: result.insertId, ...req.body })
    }
  )
})

// Actualizar un libro existente
app.put('/api/books/:id', (req, res) => {
  const { author, title, year, publisher, uploaded_by, last_modified, image } =
    req.body
  const date = new Date()

  // Verificar si el libro existe
  db.query(
    'SELECT * FROM books WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) throw err
      if (result.length === 0) {
        return res.status(404).json({ message: 'Libro no encontrado' })
      }

      const query =
        'UPDATE books SET author = ?, title = ?, year = ?, publisher = ?, uploaded_by = ?, last_modified = ?, image = ? WHERE id = ?'
      db.query(
        query,
        [
          author,
          title,
          year,
          publisher,
          uploaded_by,
          date,
          image,
          req.params.id,
        ],
        (err, result) => {
          if (err) throw err
          res.json({ id: req.params.id, ...req.body })
        }
      )
    }
  )
})

// Eliminar un libro existente
app.delete('/api/books/:id', (req, res) => {
  // Verificar si el libro existe
  db.query(
    'SELECT * FROM books WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) throw err
      if (result.length === 0) {
        return res.status(404).json({ message: 'Libro no encontrado' })
      }

      const query = 'DELETE FROM books WHERE id = ?'
      db.query(query, [req.params.id], (err, result) => {
        if (err) throw err
        res.status(204).send()
      })
    }
  )
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
