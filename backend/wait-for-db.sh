#!/bin/sh

echo "Esperando a que MySQL esté listo..."
until nc -z -v -w30 mysql 3306; do
  echo "MySQL aún no está listo, esperando..."
  sleep 5
done

echo "MySQL está listo, iniciando backend..."
exec npm start
