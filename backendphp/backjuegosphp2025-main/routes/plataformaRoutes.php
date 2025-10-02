<?php
// routes/plataformaRoutes.php

require_once __DIR__ . '/../controllers/plataformaController.php';

require_once __DIR__ . '/../core/core.php';

$controller = new PlataformaController();

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Extraer ID si existe
$matches = [];
preg_match('/\/api\/plataformas\/(\d+)$/', $path, $matches);
$id = !empty($matches) ? (int)$matches[1] : null;

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