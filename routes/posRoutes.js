const express = require('express');
const router = express.Router();
const posController = require('../controllers/posController');
const tbkController = require('../controllers/tbkController');

router.get('/connect', posController.connectPOS)          // Conectar el POS
router.get('/load-keys', posController.loadKeys)          // Cargar las llaves en el POS
router.get('/connected-port', posController.getConnectedPort) // Obtener el puerto conectado
router.get('/is-connected', posController.isConnected)     // Verificar si el POS está conectado
router.get('/disconnect', posController.disconnectPOS)    // Desconectar el POS
router.post('/sale', tbkController.sale)  // Generar una transaccion
router.post('/traced-sale', tbkController.tracedSale) // Genera una transaccion con trazabilidad
router.post('/refund', tbkController.refund) // Anula la ultima transaccion aun activa en el POS
router.get('/last-sale', tbkController.getLastSale) // Ultima transaccion
router.get('/close-day', tbkController.closeDay) // Cierre de ventas del dia
router.get('/get-totals', tbkController.getTotals) //Trae el total de ventas del dia
router.get('/sales-detail', tbkController.salesDetail) // Transacciones totales (dentro del POS) con sus detalles

module.exports = router;
