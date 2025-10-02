<?php
// index.php

// Habilitar CORS
require_once __DIR__ . '/./core/core.php';
// Incluir conexión
require_once 'config/database.php';

// Obtener la ruta
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Eliminar la base (/backjuegos) y limpiar barras
$basePath = '/backjuegos';
$cleanPath = trim(str_replace($basePath, '', $path), '/');

// Rutas

if (preg_match('/^api\/generos/', $cleanPath)) {
    require_once 'routes/generoRoutes.php';
} elseif (preg_match('/^api\/plataformas/', $cleanPath)) {
    require_once 'routes/plataformaRoutes.php';
} else {
    if ($cleanPath === '') {
        // Mostrar archivo HTML estático con documentación
        header('Content-Type: text/html; charset=UTF-8');
        readfile(__DIR__ . '/views/index.html');
        exit;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada']);
    }
};
if (preg_match('/^api\/juegos/', $cleanPath)) {
    require_once 'routes/juegosRoutes.php';
} elseif (preg_match('/^api\/plataformas/', $cleanPath)) {
    require_once 'routes/plataformaRoutes.php';
} else {
    if ($cleanPath === '') {
        // Mostrar archivo HTML estático con documentación
        header('Content-Type: text/html; charset=UTF-8');
        readfile(__DIR__ . '/views/index.html');
        exit;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Ruta no encontrada']);
    }
}
?>