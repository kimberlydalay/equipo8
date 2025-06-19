const pool = require('../config/db.js');

// 1. Plantas con su tipo de planta
exports.arbolesPorProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerPlantasConTipo()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener plantas con tipo' });
  }
};

// 2. Todas las plantas (para contar desde frontend)
exports.contarArboles = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerPlantasConTipo()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener listado de plantas' });
  }
};

// 3. Cuidados con tipo de planta
exports.informesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerCuidadosConTipo()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cuidados con tipo' });
  }
};

// 4. Plantas con su ubicación
exports.actividadesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerPlantasPorUbicacion()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener plantas con ubicación' });
  }
};

// 5. Registros de cuidado
exports.detallesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerRegistrosDeCuidado()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener registros de cuidado' });
  }
};

// 6. Cuidados registrados con nombres
exports.informesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerCuidadosRegistrados()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener lista de cuidados aplicados' });
  }
};

// 7. Plantas con categoría
exports.equiposProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerPlantasConCategorias()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener plantas con categoría' });
  }
};

// 8. Participantes
exports.materialesActividad = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerParticipantes()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener participantes' });
  }
};

// 9. Registros por planta
exports.promedioArbolesUbicacion = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerRegistrosPorPlanta()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener registros por planta' });
  }
};

// 10. Cuidados por ubicación
exports.plantasConMuchosCuidados = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerCuidadosPorUbicacion()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cuidados por ubicación' });
  }
};

// 11. Cuidados por ubicación (reutilizado)
exports.cuidadosPorUbicacion = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL obtenerCuidadosPorUbicacion()');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cuidados por ubicación' });
  }
};
