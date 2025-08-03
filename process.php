<?php
// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$service = isset($_POST['service']) ? trim($_POST['service']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address';
}

if (empty($service)) {
    $errors[] = 'Please select a service';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Validation failed',
        'errors' => $errors
    ]);
    exit;
}

// Sanitize data
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$company = htmlspecialchars($company, ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Prepare email content
$to = 'hello@marketingavedh.com'; // Change this to your email
$subject = 'New Contact Form Submission - Marketing Avedh';

$emailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #6366f1; }
        .value { margin-top: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p>Marketing Avedh Website</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>Company:</div>
                <div class='value'>" . ($company ? $company : 'Not provided') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Service Interest:</div>
                <div class='value'>$service</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>$message</div>
            </div>
            <div class='footer'>
                <p>This message was sent from the Marketing Avedh contact form on " . date('Y-m-d H:i:s') . "</p>
                <p>IP Address: " . $_SERVER['REMOTE_ADDR'] . "</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Marketing Avedh Website <noreply@marketingavedh.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

// Log the submission (optional)
$logEntry = date('Y-m-d H:i:s') . " - Name: $name, Email: $email, Service: $service\n";
file_put_contents('contact_log.txt', $logEntry, FILE_APPEND | LOCK_EX);

// Return response
if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email. Please try again later.'
    ]);
}

// Function to send notification email to customer (optional)
function sendCustomerNotification($customerEmail, $customerName) {
    $subject = 'Thank you for contacting Marketing Avedh';
    
    $customerEmailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank you for contacting us!</h2>
            </div>
            <div class='content'>
                <p>Dear $customerName,</p>
                <p>Thank you for reaching out to Marketing Avedh. We have received your message and will review it carefully.</p>
                <p>Our team will get back to you within 24-48 hours with a detailed response and next steps.</p>
                <p>In the meantime, feel free to explore our services and case studies on our website.</p>
                <p>Best regards,<br>The Marketing Avedh Team</p>
                <div class='footer'>
                    <p>Marketing Avedh<br>Premium Digital Marketing Agency</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Marketing Avedh <hello@marketingavedh.com>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail($customerEmail, $subject, $customerEmailBody, implode("\r\n", $headers));
}

// Send customer notification (uncomment if you want to send auto-reply)
// if ($mailSent) {
//     sendCustomerNotification($email, $name);
// }
?> 