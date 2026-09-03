CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'agrimart_migrator') THEN
    CREATE ROLE agrimart_migrator LOGIN PASSWORD 'agrimart_migrator_dev_password';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'agrimart_readonly') THEN
    CREATE ROLE agrimart_readonly LOGIN PASSWORD 'agrimart_readonly_dev_password';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'agrimart_fastapi_rw_limited') THEN
    CREATE ROLE agrimart_fastapi_rw_limited LOGIN PASSWORD 'agrimart_fastapi_dev_password';
  END IF;
END $$;
