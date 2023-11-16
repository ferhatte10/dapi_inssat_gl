SELECT 'CREATE DATABASE intranet_prod' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'intranet_prod')\gexec
SELECT 'CREATE DATABASE intranet_test' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'intranet_test')\gexec
SELECT 'CREATE DATABASE intranet_dev' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'intranet_dev')\gexec
SELECT 'CREATE DATABASE intranet_demo' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'intranet_demo')\gexec
SELECT 'CREATE DATABASE intranet_auth' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'intranet_auth')\gexec

-- create user keycloak to access intranet_auth
-- CREATE USER authserver WITH encrypted PASSWORD '4gvstWsevk84hcgsOMG5fh';
-- CREATE USER api WITH encrypted PASSWORD '4gvstWsevazr87cgsOMG5fh';
--
-- GRANT ALL ON SCHEMA public TO authServer;
-- GRANT ALL ON SCHEMA public TO api;



