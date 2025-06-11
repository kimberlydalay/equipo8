const pool = require('../config/db.js');

// 1. ¿Cuántas plantas hay de cada tipo?
exports.arbolesPorProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL plantasPorTipo()');
    const labels = rows[0].map(row => row.tipo);
    const values = rows[0].map(row => row.cantidad);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 2. ¿Cuántas plantas hay en total?
exports.contarArboles = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL plantasPorTipo()');
    const total = rows[0].reduce((acc, row) => acc + (row.cantidad || 0), 0);
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 3. ¿Cuántos cuidados se aplican según el tipo de planta?
exports.informesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL cuidadosPorTipo()');
    const labels = rows[0].map(row => row.tipo);
    const values = rows[0].map(row => row.cantidad);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 4. ¿Cuántas plantas hay en cada ubicación?
exports.actividadesEmpleado = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL plantasPorUbicacion()');
    const labels = rows[0].map(row => row.ubicacion);
    const values = rows[0].map(row => row.cantidad);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 5. ¿Cuántos registros de cuidado se han hecho por mes?
exports.detallesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL registrosPorMes()');
    const labels = rows[0].map(row => `Mes ${row.mes}`);
    const values = rows[0].map(row => row.cantidad);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 6. ¿Qué cuidados son los más aplicados?
exports.informesProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL cuidadosFrecuentes()');
    const labels = rows[0].map(row => row.nombre);
    const values = rows[0].map(row => row.veces_aplicado);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 7. ¿Cuántas plantas hay en cada categoría?
exports.equiposProyecto = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL plantasPorCategoria()');
    const labels = rows[0].map(row => row.nombre);
    const values = rows[0].map(row => row.cantidad);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 8. ¿Cuál es el total de participantes registrados?
exports.materialesActividad = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL totalParticipantes()');
    const total = rows[0][0]?.total || 0;
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 9. ¿Cuál es el promedio de árboles por ubicación?
exports.promedioArbolesUbicacion = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL promedioArbolesUbicacion()');
    const promedio = rows[0][0]?.promedio || 0;
    res.json({ promedio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 10. ¿Qué plantas tienen la mayor cantidad de cuidados registrados?
exports.plantasConMuchosCuidados = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL plantasConMuchosCuidados()');
    const labels = rows[0].map(row => `Planta ${row.idPlanta} (${row.tipoPlanta})`);
    const values = rows[0].map(row => row.total_cuidados);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};

// 11. ¿Cuántos cuidados se aplican por ubicación?
exports.cuidadosPorUbicacion = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL cuidadosPorUbicacion()');
    const labels = rows[0].map(row => row.ubicacion);
    const values = rows[0].map(row => row.total);
    res.json({ labels, values });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en la consulta' });
  }
};
