<?php
/**
 * Contact Form Handler
 * Handles contact form submissions
 */

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Include database configuration
require_once __DIR__ . '/../config/database.php';

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// If no JSON data, try form data
if (empty($data)) {
    $data = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email', 'phone', 'message'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

// Validate phone (basic validation)
if (!empty($data['phone']) && !preg_match('/^[\d\s\+\-\(\)]{10,20}$/', $data['phone'])) {
    $errors[] = 'Invalid phone number format';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors), 'errors' => $errors]);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8');
$service = isset($data['service']) ? htmlspecialchars(trim($data['service']), ENT_QUOTES, 'UTF-8') : '';
$message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
$ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';

// Get database connection
$pdo = getDBConnection();

if ($pdo === null) {
    // Database connection failed, try to send email instead
    $email_sent = sendEmailNotification($name, $email, $phone, $service, $message);
    
    if ($email_sent) {
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you for contacting us! We will get back to you soon.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Unable to submit your message. Please try again or contact us directly.'
        ]);
    }
    exit;
}

try {
    // Insert into database
    $sql = "INSERT INTO contact_submissions (name, email, phone, service, message, ip_address, user_agent) 
            VALUES (:name, :email, :phone, :service, :message, :ip_address, :user_agent)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':service' => $service,
        ':message' => $message,
        ':ip_address' => $ip_address,
        ':user_agent' => $user_agent
    ]);
    
    $submission_id = $pdo->lastInsertId();
    
    // Send email notification
    sendEmailNotification($name, $email, $phone, $service, $message, $submission_id);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for contacting us! We will get back to you within 24 hours.',
        'id' => $submission_id
    ]);
    
} catch (PDOException $e) {
    error_log("Contact Form Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while submitting your message. Please try again.'
    ]);
}

/**
 * Send email notification to admin
 */
function sendEmailNotification($name, $email, $phone, $service, $message, $submission_id = null) {
    $to = SITE_EMAIL;
    $subject = "New Contact Form Submission - " . SITE_NAME;
    
    $body = "New contact form submission received:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Service: " . ($service ?: 'Not specified') . "\n";
    $body .= "Message:\n$message\n\n";
    if ($submission_id) {
        $body .= "Submission ID: $submission_id\n";
    }
    $body .= "Submitted at: " . date('Y-m-d H:i:s') . "\n";
    
    $headers = "From: " . SITE_NAME . " <noreply@craftvasi.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    return mail($to, $subject, $body, $headers);
}
?>
