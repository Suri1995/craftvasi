-- Create leads table for storing form submissions
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT,
  project_category VARCHAR(100),
  project_type VARCHAR(100),
  bhk_type VARCHAR(50),
  living_room TEXT,
  master_bedroom TEXT,
  children_bedroom TEXT,
  kitchen TEXT,
  dining_area TEXT,
  study_area TEXT,
  additional_rooms TEXT,
  design_preference VARCHAR(100),
  timeline VARCHAR(100),
  budget_range VARCHAR(100),
  additional_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'new',
  email_sent BOOLEAN DEFAULT FALSE
);

-- Create index on email and created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
