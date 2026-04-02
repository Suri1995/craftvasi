<?php
/**
 * Newsletter Subscription Handler
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (empty($data)) {
    $data = $_POST;
}

// Validate email
if (empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

$pdo = getDBConnection();

if ($pdo === null) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Service temporarily unavailable']);
    exit;
}

try {
    // Check if email already exists
    $check = $pdo->prepare("SELECT id, status FROM newsletter_subscribers WHERE email = :email");
    $check->execute([':email' => $email]);
    $existing = $check->fetch();
    
    if ($existing) {
        if ($existing['status'] === 'active') {
            echo json_encode(['success' => true, 'message' => 'You are already subscribed to our newsletter!']);
        } else {
            // Reactivate subscription
            $update = $pdo->prepare("UPDATE newsletter_subscribers SET status = 'active', unsubscribed_at = NULL WHERE id = :id");
            $update->execute([':id' => $existing['id']]);
            echo json_encode(['success' => true, 'message' => 'Welcome back! Your subscription has been reactivated.']);
        }
        exit;
    }
    
    // Insert new subscriber
    $stmt = $pdo->prepare("INSERT INTO newsletter_subscribers (email) VALUES (:email)");
    $stmt->execute([':email' => $email]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for subscribing! You will receive our latest updates.'
    ]);
    
} catch (PDOException $e) {
    error_log("Newsletter Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred. Please try again.']);
}
?>
