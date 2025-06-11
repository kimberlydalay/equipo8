const express = require('express');
const router = express.Router();
const graficaController = require('../controllers/graficaController');

// Solo rutas que correspondan a los endpoints implementados en el controlador
router.get('/arbolesPorProyecto', graficaController.arbolesPorProyecto);
router.get('/contarArboles', graficaController.contarArboles);
router.get('/informesEmpleado', graficaController.informesEmpleado);
router.get('/actividadesEmpleado', graficaController.actividadesEmpleado);
router.get('/detallesProyecto', graficaController.detallesProyecto);
router.get('/informesProyecto', graficaController.informesProyecto);
router.get('/equiposProyecto', graficaController.equiposProyecto);
router.get('/materialesActividad', graficaController.materialesActividad);
router.get('/promedioArbolesUbicacion', graficaController.promedioArbolesUbicacion);
router.get('/plantasConMuchosCuidados', graficaController.plantasConMuchosCuidados);
router.get('/cuidadosPorUbicacion', graficaController.cuidadosPorUbicacion);

module.exports = router;
