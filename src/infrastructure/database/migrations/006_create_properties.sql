CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    host_id UUID NOT NULL REFERENCES users(id),

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    price_per_night NUMERIC(10,2) NOT NULL CHECK (price_per_night >= 0),

    country VARCHAR(100) NOT NULL,

    city VARCHAR(100) NOT NULL,

    address TEXT NOT NULL,

    max_guests INTEGER NOT NULL CHECK (max_guests > 0),

    bedrooms INTEGER NOT NULL CHECK (bedrooms > 0),

    bathrooms INTEGER NOT NULL CHECK (bathrooms > 0),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_properties_host_id ON properties(host_id);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_active ON properties(is_active);