const { POSIntegrado } = require('transbank-pos-sdk');
const pos = new POSIntegrado();
pos.setDebug(true);  // Habilitar modo depuración

// Conectar al POS
exports.connect = async () => {
  const port = await pos.autoconnect();
  if (!port) {
    throw new Error('No se encontró ningún POS conectado');
  }
  return port.path;
};

// Cargar las llaves en el POS
exports.loadKeys = async () => {
  return await pos.loadKeys();
};

// Obtener el puerto conectado
exports.getConnectedPort = () => {
  return pos.getConnectedPort();
};

// Verificar si el POS está conectado
exports.isConnected = () => {
  return pos.isConnected();
};

// Desconectar el POS
exports.disconnect = async () => {
  return await pos.disconnect();
};

// Realizar una venta
exports.sale = async (amount, ticket) => {
  return await pos.sale(amount, ticket);
};

// Realizar una venta con trazabilidad
exports.tracedSale = async (amount, ticket) => {
  const callback = (data) => {
    console.log('Estado intermedio recibido:', data);
  };
  return await pos.sale(amount, ticket, true, callback);  // Trazabilidad activada con callback
};

// Anular una transacción (refund)
exports.refund = async (operationId) => {
  return await pos.refund(operationId);
};

// Obtener la última transacción
exports.getLastSale = async () => {
  return await pos.getLastSale();
};

// Cierre de ventas del día
exports.closeDay = async () => {
  return await pos.closeDay();
};

// Obtener el total de ventas del día
exports.getTotals = async () => {
  return await pos.getTotals();
};

// Obtener el detalle de todas las ventas
exports.salesDetail = async () => {
  return await pos.salesDetail();
};
