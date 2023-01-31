#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER fridayfinance;
    CREATE DATABASE fridayfinance;
    GRANT ALL PRIVILEGES ON DATABASE fridayfinance TO fridayfinance;
EOSQL