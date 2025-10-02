const db = require('../config/db');

const getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT idusuario, idestatus, idrol, nombre, apellido, correo, telefonos, direccion FROM `usuarios`;');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getUsuariosById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE idusuario = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Categoria no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUsuarios = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, idestatus } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Id inválido' });
  }

  if (nombre !== undefined) {
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ error: 'El campo nombre debe ser una cadena válida' });
    }
  }
  if (apellido !== undefined) {
    if (typeof apellido !== 'string' || apellido.trim() === '') {
      return res.status(400).json({ error: 'El campo apellido debe ser una cadena válida' });
    }
  }

  if (idestatus !== undefined) {
    if (![1, 2].includes(Number(idestatus))) {
      return res.status(400).json({ error: 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)' });
    }
  }

  try {
    if (nombre) {
      // Validar que no exista otra categoría con el mismo nombre distinto al id actual
      const [existsResult] = await db.query(
        'SELECT EXISTS (SELECT 1 FROM usuarios WHERE nombre = ? AND idusuario != ?) AS existe',
        [nombre.trim(), id]
      );

      if (existsResult[0].existe) {
        return res.status(400).json({ error: 'El nombre de categoría ya existe' });
      }
    }

    // Construir consulta dinámica para actualizar sólo campos que vienen
    const fields = [];
    const values = [];

    if (nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(nombre.trim());
    }
    if (apellido !== undefined) {
      fields.push('apellido = ?');
      values.push(apellido.trim());
    }
    if (descripcion !== undefined) {
      fields.push('descripcion = ?');
      values.push(descripcion);
    }
    if (idestatus !== undefined) {
      fields.push('idestatus = ?');
      values.push(idestatus);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    }

    values.push(id);

    const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE idusuario = ?`;

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El nombre de categoría ya existe' });
    }
    res.status(500).json({ error: err.message });
  }
};

const createUsuario = async (req, res) => {
  const { nombre,apellido, descripcion, idestatus = 1 } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El campo nombre es requerido y debe ser una cadena válida' });
  }
  if (!apelido || typeof apellido !== 'string' || apellido.trim() === '') {
    return res.status(400).json({ error: 'El campo apellido es requerido y debe ser una cadena válida' });
  }

  if (![1, 2].includes(Number(idestatus))) {
    return res.status(400).json({ error: 'El campo idestatus debe ser 1 (Activo) o 2 (Inactivo)' });
  }

  try {
    // Verificar existencia con EXISTS para mejor performance
    const [existsResult] = await db.query(
      'SELECT EXISTS (SELECT 1 FROM usuarios WHERE nombre = ?) AS existe',
      [nombre.trim()]
    );

    if (existsResult[0].existe) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    const [result] = await db.query(
      'INSERT INTO categorias (nombre, apellido, descripcion, idestatus) VALUES (?, ?, ?, ?)',
      [nombre.trim(), apellido.trim(), descripcion || null, idestatus]
    );

    res.status(201).json({
      id: result.insertId,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      descripcion,
      idestatus,
    });
  } catch (err) {
    // Manejar error de duplicado si ocurre en inserción por concurrencia
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El nombre de categoría ya existe' });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Id inválido' });
  }
  try {
    const [result] = await db.query('DELETE FROM Usuarios WHERE idusuario = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrada' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAllUsuarios,
    getUsuariosById, 
    updateUsuarios,
    deleteUsuario
}