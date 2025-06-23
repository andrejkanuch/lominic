-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types if needed
-- CREATE TYPE user_role AS ENUM ('admin', 'user', 'moderator');

-- Set timezone
SET timezone = 'UTC'; 