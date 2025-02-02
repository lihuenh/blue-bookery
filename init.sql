-- Crear la base de datos y la tabla si no existen
CREATE DATABASE IF NOT EXISTS library;

USE library;

-- Crear la tabla de libros
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    uploaded_by VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    image VARCHAR(255) -- Nueva columna para la URL de la imagen
);

-- Insertar todos los libros de la saga "The Wheel of Time" con fechas de carga y modificación
INSERT INTO books (title, author, year, publisher, uploaded_by, upload_date, last_modified, image)
VALUES 
    ('The Eye of the World', 'Robert Jordan', 1990, 'Tor Books', 'admin', '2025-02-01 10:00:00', '2025-02-01 10:00:00', 'https://upload.wikimedia.org/wikipedia/en/0/00/WoT01_TheEyeOfTheWorld.jpg'),
    ('The Great Hunt', 'Robert Jordan', 1990, 'Tor Books', 'admin', '2025-02-01 10:05:00', '2025-02-01 10:05:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89kUdlePGDelllY9lfQYvYhAagTSf0LeVuQ&s'),
    ('The Dragon Reborn', 'Robert Jordan', 1991, 'Tor Books', 'admin', '2025-02-01 10:10:00', '2025-02-01 10:10:00', 'https://http2.mlstatic.com/D_NQ_NP_868725-MLA75980002089_042024-O.webp'),
    ('The Shadow Rising', 'Robert Jordan', 1992, 'Tor Books', 'admin', '2025-02-01 10:15:00', '2025-02-01 10:15:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3O9o1nDX7Vl4HYAt85FtamKmpWH17vSgMU1qpzP_MoMUl2PRWIRpMArsx1g0FdbXEFYs&usqp=CAU'),
    ('The Fires of Heaven', 'Robert Jordan', 1993, 'Tor Books', 'admin', '2025-02-01 10:20:00', '2025-02-01 10:20:00', 'https://img.sfbook.com/books/large/the-fires-of-heaven.jpg'),
    ('Lord of Chaos', 'Robert Jordan', 1994, 'Tor Books', 'admin', '2025-02-01 10:25:00', '2025-02-01 10:25:00', 'https://http2.mlstatic.com/D_NQ_NP_877384-MLA49250199151_032022-O.webp'),
    ('A Crown of Swords', 'Robert Jordan', 1996, 'Tor Books', 'admin', '2025-02-01 10:30:00', '2025-02-01 10:30:00', 'https://jonahwrites.blog/wp-content/uploads/2022/01/gallery_35368_429_331702.png?w=640'),
    ('The Path of Daggers', 'Robert Jordan', 1998, 'Tor Books', 'admin', '2025-02-01 10:35:00', '2025-02-01 10:35:00', 'https://upload.wikimedia.org/wikipedia/en/5/51/WoT08_ThePathOfDaggers.jpg'),
    ('Winter\'s Heart', 'Robert Jordan', 2000, 'Tor Books', 'admin', '2025-02-01 10:40:00', '2025-02-01 10:40:00', 'https://i0.wp.com/inkstonebooks.com/wp-content/uploads/2023/09/Winters-Heart.png?fit=1500%2C2288&ssl=1'),
    ('Crossroads of Twilight', 'Robert Jordan', 2003, 'Tor Books', 'admin', '2025-02-01 10:45:00', '2025-02-01 10:45:00', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/WoT10_CrossroadsOfTwilight.jpg/220px-WoT10_CrossroadsOfTwilight.jpg'),
    ('Knife of Dreams', 'Robert Jordan', 2005, 'Tor Books', 'admin', '2025-02-01 10:50:00', '2025-02-01 10:50:00', 'https://http2.mlstatic.com/D_NQ_NP_659365-MLA49253219909_032022-O.webp'),
    ('The Gathering Storm', 'Robert Jordan / Brandon Sanderson', 2009, 'Tor Books', 'admin', '2025-02-01 10:55:00', '2025-02-01 10:55:00', 'https://http2.mlstatic.com/D_NQ_NP_825655-MLA75929542637_042024-O.webp'),
    ('Towers of Midnight', 'Robert Jordan / Brandon Sanderson', 2010, 'Tor Books', 'admin', '2025-02-01 11:00:00', '2025-02-01 11:00:00', 'https://images.cdn1.buscalibre.com/fit-in/520x520/24/a0/7512448fd17ecba1922d7918282c467b.jpg'),
    ('A Memory of Light', 'Robert Jordan / Brandon Sanderson', 2013, 'Tor Books', 'admin', '2025-02-01 11:05:00', '2025-02-01 11:05:00', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1485938837i/16031812.jpg'),
    ('New Spring', 'Robert Jordan', 2004, 'Tor Books', 'admin', '2025-02-01 11:10:00', '2025-02-01 11:10:00', 'https://upload.wikimedia.org/wikipedia/en/5/52/WoT00_NewSpring.jpg');
