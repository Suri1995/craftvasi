-- Craftvasi Database Setup
-- Run this SQL in your MySQL database (phpMyAdmin or command line)

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS craftvasi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE craftvasi_db;

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(100),
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role ENUM('admin', 'editor') DEFAULT 'editor',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects/Portfolio Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    category ENUM('residential', 'commercial', 'office', 'hospitality') NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    gallery_images TEXT,
    location VARCHAR(200),
    client_name VARCHAR(200),
    completion_date DATE,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    company VARCHAR(100),
    content TEXT NOT NULL,
    rating TINYINT DEFAULT 5,
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    short_description VARCHAR(500),
    full_description TEXT,
    image_url VARCHAR(500),
    icon VARCHAR(100),
    features TEXT,
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Page Views / Analytics Table
CREATE TABLE IF NOT EXISTS page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_url VARCHAR(500) NOT NULL,
    referrer VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_page_url (page_url(255)),
    INDEX idx_viewed_at (viewed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - CHANGE THIS!)
INSERT INTO admin_users (username, email, password, name, role) VALUES
('admin', 'craftvasi@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator', 'admin')
ON DUPLICATE KEY UPDATE username = username;

-- Insert sample services
INSERT INTO services (title, slug, short_description, image_url, display_order, status) VALUES
('Home Interiors', 'home-interiors', 'Transform your living spaces with our expert home interior design services.', 'images/services/home-interior.jpg', 1, 'active'),
('Modular Kitchen', 'modular-kitchen', 'Modern, functional, and stylish modular kitchen solutions tailored to your needs.', 'images/services/modular-kitchen.jpg', 2, 'active'),
('Custom Furniture', 'custom-furniture', 'Bespoke furniture pieces designed and crafted to match your unique style.', 'images/services/custom-furniture.jpg', 3, 'active'),
('Office Interiors', 'office-interiors', 'Professional office interior designs that boost productivity and impress clients.', 'images/services/office-interior.jpg', 4, 'active'),
('Commercial Spaces', 'commercial-spaces', 'Complete interior solutions for retail stores, restaurants, and commercial establishments.', 'images/services/commercial.jpg', 5, 'active'),
('Construction', 'construction', 'Full construction services from foundation to finishing with quality assurance.', 'images/services/construction.jpg', 6, 'active')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert sample testimonials
INSERT INTO testimonials (name, designation, company, content, rating, featured, status) VALUES
('Rajesh Kumar', 'Business Owner', 'Tech Solutions Pvt Ltd', 'Craftvasi transformed our office space completely. The team was professional, creative, and delivered on time. Highly recommended!', 5, TRUE, 'approved'),
('Priya Sharma', 'Homeowner', 'Banjara Hills', 'We are extremely happy with our new modular kitchen. The quality of work and attention to detail is exceptional.', 5, TRUE, 'approved'),
('Anil Reddy', 'Managing Director', 'Reddy Enterprises', 'Outstanding work on our commercial project. The Craftvasi team understood our requirements perfectly.', 5, TRUE, 'approved'),
('Sunita Devi', 'Homeowner', 'Jubilee Hills', 'Beautiful home interior design! They made our dream home a reality. Thank you Craftvasi!', 5, TRUE, 'approved')
ON DUPLICATE KEY UPDATE name = VALUES(name);

SELECT 'Database setup completed successfully!' AS message;
