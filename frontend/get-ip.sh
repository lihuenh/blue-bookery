#!/bin/sh
# Obtiene la IP del contenedor
IP=$(hostname -i)
HOSTNAME=$(hostname)
# Crear un archivo JS accesible desde el frontend
cat <<EOF >/usr/share/nginx/html/env.js
window.__ENV__ = {
  VITE_IP: "$IP",
  VITE_HOSTNAME: "$HOSTNAME"
};
EOF

# Iniciar nginx
exec nginx -g "daemon off;"
