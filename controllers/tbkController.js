const posService = require('../services/posService');

// Venta simple sin estados intermedios
exports.sale = async (req, res) => {
  const { amount, invoiceNumber } = req.body;

  if (!amount && !invoiceNumber) {
    return res.status(400).json({
      status: 400,
      error: 'Falta los parámetros "amount" e "invoiceNumber"',
    });
  }

  try {
    const response = await posService.sale(amount, invoiceNumber);
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// Venta con estados intermedios
exports.tracedSale = async (req, res) => {
  const { amount, invoiceNumber } = req.body;

  // Verificación de los parámetros
  if (!amount || !invoiceNumber) {
    return res.status(400).json({
      status: 400,
      error: 'Faltan los parámetros "amount" e "invoiceNumber"',
    });
  }

  try {
    // Verificar si ya hay una conexión activa con el POS
    const isConnected = posService.isConnected();
    if (!isConnected) {
      // Si no hay conexión, intentamos conectar al POS
      const connectedPort = await posService.connect();
      if (!connectedPort) {
        return res.status(404).json({
          status: 404,
          error: 'No se pudo conectar al POS',
        });
      }
    }

    // Función callback para los mensajes intermedios
    let callback = function (data) {
      console.log('Mensaje intermedio recibido: ', data);
    };

    // Una vez conectado, proceder con la venta
    const response = await posService.sale(amount, invoiceNumber, false, callback);
    return res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// Obtener la ultima transaccion
exports.getLastSale = async (req, res) => {
  try {
    const response = await posService.getLastSale();
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// Anular una transaccion
exports.refund = async (req, res) => {
  const { voucher } = req.body;

  if (!voucher) {
    return res.status(400).json({
      status: 400,
      error: 'Falta los parámetros "voucher"',
    });
  }

  try {
    const response = await posService.refund(voucher);
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// Cierre de caja
exports.closeDay = async (req, res) => {
  try {
    const response = await posService.closeDay();
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// Transacciones totales
exports.getTotals = async (req, res) => {
  try {
    const response = await posService.closeDay();
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};

// Transacciones totales (dentro del POS) con sus detalles
exports.salesDetail = async (req, res) => {
  try {
    const response = await posService.salesDetail();
    res.status(200).json({
      status: 200,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  }
};