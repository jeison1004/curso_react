<?php
// controllers/generoController.php

require_once __DIR__ . '/../config/database.php';

class GeneroController {

    // GET /api/generos
    public function getAll() {
        global $pdo;
        try {
            $stmt = $pdo->query("SELECT * FROM generos");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // GET /api/generos/:id
    public function getById($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("SELECT * FROM generos WHERE idgenero = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(['message' => 'Género no encontrado']);
                return;
            }

            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // POST /api/generos
    public function create($data) {
        global $pdo;

        $nombre = $data['nombre'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $idestatus = $data['idestatus'] ?? 1;

        // 1. Validar nombre
        if (!$nombre || !is_string($nombre) || trim($nombre) === '') {
            http_response_code(400);
            echo json_encode(['error' => 'El campo nombre es requerido y debe ser una cadena válida']);
            return;
        }
        $nombreLimpio = trim($nombre);

        // 2. Validar idestatus
        if (!in_array($idestatus, [1, 2])) {
            http_response_code(400);
            echo json_encode(['error' => 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)']);
            return;
        }

        try {
            // 3. Evitar duplicados (case-insensitive)
            $stmt = $pdo->prepare("SELECT 1 FROM generos WHERE LOWER(TRIM(nombre)) = ? LIMIT 1");
            $stmt->execute([strtolower($nombreLimpio)]);
            if ($stmt->fetch()) {
                http_response_code(400);
                echo json_encode(['error' => "Ya existe un género con el nombre \"{$nombreLimpio}\""]);
                return;
            }

            // 4. Insertar
            $stmt = $pdo->prepare("INSERT INTO generos (nombre, descripcion, idestatus) VALUES (?, ?, ?)");
            $stmt->execute([$nombreLimpio, $descripcion, $idestatus]);

            // 5. Respuesta
            http_response_code(201);
            echo json_encode([
                'id' => $pdo->lastInsertId(),
                'nombre' => $nombreLimpio,
                'descripcion' => $descripcion,
                'idestatus' => $idestatus
            ]);
        } catch (Exception $e) {
            error_log('Error al crear género: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Ocurrió un error interno al crear el género']);
        }
    }

    // PUT /api/generos/:id
    public function update($id, $data) {
        global $pdo;

        $nombre = $data['nombre'] ?? null;
        $descripcion = $data['descripcion'] ?? null;
        $idestatus = $data['idestatus'] ?? null;

        // 1. Validar que haya al menos un campo
        if ($nombre === null && $descripcion === null && $idestatus === null) {
            http_response_code(400);
            echo json_encode([
                'error' => 'Debe proporcionar al menos uno de: nombre, descripcion, idestatus'
            ]);
            return;
        }

        try {
            // 2. Verificar existencia
            $stmt = $pdo->prepare("SELECT idgenero FROM generos WHERE idgenero = ?");
            $stmt->execute([$id]);
            if (!$stmt->fetch()) {
                http_response_code(404);
                echo json_encode(['message' => 'Género no encontrado']);
                return;
            }

            $updates = [];
            $values = [];

            // 3. Validar y preparar nombre
            if ($nombre !== null && trim($nombre) !== '') {
                $nombreLimpio = trim($nombre);
                $stmt = $pdo->prepare("SELECT idgenero FROM generos WHERE LOWER(TRIM(nombre)) = ? AND idgenero != ?");
                $stmt->execute([strtolower($nombreLimpio), $id]);
                if ($stmt->fetch()) {
                    http_response_code(400);
                    echo json_encode(['error' => "Ya existe un género con el nombre \"{$nombreLimpio}\""]);
                    return;
                }
                $updates[] = "nombre = ?";
                $values[] = $nombreLimpio;
            }

            // 4. Descripción
            if ($descripcion !== null) {
                $updates[] = "descripcion = ?";
                $values[] = $descripcion ?? null;
            }

            // 5. Estatus
            if ($idestatus !== null) {
                if (!is_numeric($idestatus) || !in_array((int)$idestatus, [1, 2])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'idestatus debe ser 1 o 2']);
                    return;
                }
                $updates[] = "idestatus = ?";
                $values[] = (int)$idestatus;
            }

            // 6. ¿Hay algo que actualizar?
            if (empty($updates)) {
                http_response_code(400);
                echo json_encode(['error' => 'No hay datos válidos para actualizar']);
                return;
            }

            // 7. Ejecutar
            $values[] = $id;
            $sql = "UPDATE generos SET " . implode(', ', $updates) . " WHERE idgenero = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);

            // 8. Respuesta
            $response = array_filter([
                'nombre' => $nombre !== null ? $nombreLimpio ?? trim($nombre) : null,
                'descripcion' => $descripcion,
                'idestatus' => $idestatus !== null ? (int)$idestatus : null
            ]);

            echo json_encode($response);
        } catch (Exception $e) {
            error_log('Error al actualizar género: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Ocurrió un error interno al actualizar el género']);
        }
    }

    // DELETE /api/generos/:id
    public function delete($id) {
        global $pdo;
        try {
            $stmt = $pdo->prepare("DELETE FROM generos WHERE idgenero = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['message' => 'Género no encontrado']);
                return;
            }

            // ✅ Ahora sí mostramos mensaje de éxito
            http_response_code(200);
            echo json_encode([
                'message' => 'Género eliminado con éxito',
                'id' => (int)$id
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}