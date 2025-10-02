<?php
// controllers/estadisticasController.php

require_once __DIR__ . '/../config/database.php';

class EstadisticasController
{

    // GET /api/estadisticas/top-war
    public function topWar()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT * 
                FROM jugadores 
                WHERE war >=30
                ORDER BY CAST(war AS DECIMAL(4,2)) DESC 
 
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top WAR: ' . $e->getMessage()]);
        }
    }

    // GET /api/estadisticas/top-avg
    public function topAvg()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT *
                FROM jugadores 
                WHERE promedio_bateo >=0.280 and veces_al_bate>100
                ORDER BY CAST(promedio_bateo AS DECIMAL(4,3)) DESC;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top AVG: ' . $e->getMessage()]);
        }
    }
    public function topHr()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT *
                FROM jugadores 
                ORDER BY home_runs DESC
                limit 18
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top HR: ' . $e->getMessage()]);
        }
    }
    public function top1b()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT *
                FROM jugadores 
                ORDER BY hits DESC
                limit 18
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top 1B: ' . $e->getMessage()]);
        }
    }

    public function resumen()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
                SELECT 
                    COUNT(*) as total_jugadores,
                    SUM(home_runs) as total_hr,
                    AVG(CAST(war AS DECIMAL(4,2))) as avg_war,
                    MAX(CAST(war AS DECIMAL(4,2))) as max_war,
                    (SELECT nombre FROM jugadores ORDER BY CAST(war AS DECIMAL(4,2)) DESC LIMIT 1) as mejor_war
                FROM jugadores
            ");
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($row);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener resumen: ' . $e->getMessage()]);
        }
    }

    public function destacados() 
    {
        global $pdo;

        try {
            // 1. WAR más alto
            $stmt_war = $pdo->query("
                SELECT id, nombre, CAST(war AS DECIMAL(4,2)) as war, lugar_nacimiento 
                FROM jugadores 
                WHERE war IS NOT NULL 
                ORDER BY war DESC 
                LIMIT 1
            ");
            $war = $stmt_war->fetch(PDO::FETCH_ASSOC);

            // 2. Mejor AVG
            $stmt_avg = $pdo->query("
                SELECT id, nombre, promedio_bateo, lugar_nacimiento 
                FROM jugadores 
                WHERE promedio_bateo IS NOT NULL  AND veces_al_bate > 3000
                ORDER BY promedio_bateo DESC 
                LIMIT 1
            ");
            $avg = $stmt_avg->fetch(PDO::FETCH_ASSOC);

            // 3. Más apariciones en All-Star
            $stmt_all_star = $pdo->query("
                SELECT id, nombre, all_star_appearances, lugar_nacimiento 
                FROM jugadores 
                WHERE all_star_appearances IS NOT NULL 
                ORDER BY all_star_appearances DESC 
                LIMIT 1
            ");
            $all_star = $stmt_all_star->fetch(PDO::FETCH_ASSOC);

            // 4. Más ops
            $stmt_hr = $pdo->query("
                SELECT id, nombre, ops, lugar_nacimiento 
                FROM jugadores 
                WHERE ops IS NOT NULL 
                AND ops >= 0.700
                AND años_en_mlb > 5
                AND veces_al_bate > 1000
                ORDER BY ops DESC 
                LIMIT 1
            ");
            $hr = $stmt_hr->fetch(PDO::FETCH_ASSOC);

            // Preparar respuesta
            $data = [
                'war_mas_alto' => [
                    'id' => $war ? $war['id'] : null,
                    'valor' => $war ? $war['war'] : null,
                    'jugador' => $war ? $war['nombre'] : 'N/A',
                    'ciudad' => $war ? $war['lugar_nacimiento'] : 'N/A'
                ],
                'mejor_avg' => [
                    'id' => $avg ? $avg['id'] : null,
                    'valor' => $avg ? number_format($avg['promedio_bateo'], 3) : '0.000',
                    'jugador' => $avg ? $avg['nombre'] : 'N/A',
                    'ciudad' => $avg ? $avg['lugar_nacimiento'] : 'N/A'
                ],
                'mas_all_star' => [
                    'id' => $all_star ? $all_star['id'] : null,
                    'valor' => $all_star ? $all_star['all_star_appearances'] : 0,
                    'jugador' => $all_star ? $all_star['nombre'] : 'N/A',
                    'ciudad' => $all_star ? $all_star['lugar_nacimiento'] : 'N/A'
                ],
                'lider_ops' => [
                    'id' => $hr ? $hr['id'] : null,
                    'valor' => $hr ? $hr['ops'] : 0,
                    'jugador' => $hr ? $hr['nombre'] : 'N/A',
                    'ciudad' => $hr ? $hr['lugar_nacimiento'] : 'N/A'
                ]
            ];

            // ✅ Imprimir el JSON (como hace resumen)
            echo json_encode($data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener destacados: ' . $e->getMessage()]);
        }
    }
        public function getciudades()
    {
        global $pdo;
        try {
            $stmt = $pdo->query("
               SELECT 
                j1.lugar_nacimiento,
                j2.total_jugadores,  
                j1.id,
                j1.nombre as jugador_destacado,
                j1.war as war_del_destacado
            FROM jugadores j1
            INNER JOIN (
                SELECT 
                    lugar_nacimiento,
                    MAX(war) as max_war,
                    COUNT(*) as total_jugadores  
                FROM jugadores
                WHERE lugar_nacimiento IS NOT NULL
                GROUP BY lugar_nacimiento
            ) j2 
            ON j1.lugar_nacimiento = j2.lugar_nacimiento 
            AND j1.war = j2.max_war
            ORDER BY j2.total_jugadores DESC, j1.nombre;
            ");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error al obtener top 1B: ' . $e->getMessage()]);
        }
    }
   



}
