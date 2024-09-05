const posService = require('../services/posService');

// Conectar al POS
exports.connectPOS = async (req, res) => {
  try {
    const port = await posService.connect();
    res.status(200).json({ success: true, port });
  } catch (err) {
    res.status(500).json({ error: 'Error conectando el POS', details: err.message });
  }
};

// Cargar llaves en el POS
exports.loadKeys = async (req, res) => {
  try {
    
    const response = await posService.loadKeys();
    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ error: 'Error cargando las llaves', details: err.message });
  }
};

// Obtener el puerto al que está conectado el POS
exports.getConnectedPort = (req, res) => {
  const port = posService.getConnectedPort();
  if (!port) {
    return res.status(404).json({ error: 'No hay ningún POS conectado' });
  }
  res.status(200).json({ success: true, port });
};

// Verificar si el POS está conectado
exports.isConnected = (req, res) => {
  const isConnected = posService.isConnected();
  res.status(200).json({ success: true, isConnected });
};

// Desconectar el POS
exports.disconnectPOS = async (req, res) => {
  try {
    const response = await posService.disconnect();
    res.status(200).json({ 
      success: true, 
      message: 'POS desconectado correctamente', 
      response 
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Error desconectando el POS', 
      details: err.message 
    });
  }
};

exports.changeToNormalMode = async (req, res) => {
  try {
    const response = await posService.changeToNormalMode();
    res.status(200).json({
      success: true,
      message: 'POS en modo normal',
      data: response
    })
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: err.message 
    });
  }
}
