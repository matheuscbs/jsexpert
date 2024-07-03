#!/bin/bash

# Inicializa o container do PostgreSQL
docker run \
  --name postgres \
  -e POSTGRES_USER=matheuscardoso \
  -e POSTGRES_PASSWORD=senhaadmin \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres:12-alpine

# Aguarda alguns segundos para o PostgreSQL inicializar completamente
echo "Aguardando o PostgreSQL iniciar..."
sleep 10

# Executa comandos SQL no PostgreSQL
docker exec -i postgres psql -U matheuscardoso -d heroes <<EOF
CREATE TABLE warriors(id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL);
SELECT * FROM warriors;
EOF

echo "Comandos PostgreSQL executados com sucesso."

# Inicializa o container do MongoDB
docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=matheuscardoso \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -p 27017:27017 \
  -d \
  mongo:4.2.8

echo "MongoDB inicializado."

# Loga saída do MongoDB (opcional)
docker logs mongodb
