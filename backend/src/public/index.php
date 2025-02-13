<?php\n// Ponto de entrada do PHP

require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM usuarios");
    $usuarios = $stmt->fetchAll();
    echo json_encode([
        'status' => 'success',
        'data' => $usuarios
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}

?>
