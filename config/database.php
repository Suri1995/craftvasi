<?php
/**
 * Database Configuration
 * Update these settings with your MySQL database credentials
 */

define('DB_HOST', 'localhost');          // Database host (usually localhost)
define('DB_NAME', 'craftvasi_db');       // Database name
define('DB_USER', 'root');               // Database username
define('DB_PASS', '');                   // Database password
define('DB_CHARSET', 'utf8mb4');         // Character set

// Site Settings
define('SITE_NAME', 'Craftvasi');
define('SITE_EMAIL', 'craftvasi@gmail.com');
define('SITE_PHONE', '+91 9573117830');

// Create database connection
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
        
    } catch (PDOException $e) {
        // Log error and return null
        error_log("Database Connection Error: " . $e->getMessage());
        return null;
    }
}

// Initialize session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
