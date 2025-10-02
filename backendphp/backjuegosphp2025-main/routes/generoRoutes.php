<?php
require_once __DIR__ . '/../controllers/generoController.php';

require_once __DIR__ . '/../core/core.php';

$controller = new GeneroController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// Extraer el ID de la URL si existe (ej: /api/generos/5)
$matches = [];
preg_match('/\/api\/generos\/(\d+)$/', $_SERVER['REQUEST_URI'], $matches);
if (!empty($matches)) {
    $id = (int)$matches[1];
}

$data = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if ($id) {
            $controller->getById($id);
        } else {
            $controller->getAll();
        }
        break;

    case 'POST':
        $controller->create($data);
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido']);
            break;
        }
        $controller->update($id, $data);
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID requerido']);
            break;
        }
        $controller->delete($id);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}
?>