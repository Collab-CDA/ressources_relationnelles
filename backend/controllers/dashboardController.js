const {
  getDashboardStatistics,
  exportDashboardStatistics,
  snapshotStatistics,
  getStatisticsHistory
} = require('../services/dashboardService');

const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardStatistics();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

const exportDashboard = async (req, res) => {
  try {
    const csvData = await exportDashboardStatistics();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="dashboard_statistics.csv"');
    res.status(200).send(csvData);
  } catch (error) {
    console.error('Erreur lors de l’export des statistiques:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

const takeSnapshot = async (req, res) => {
  try {
    const record = await snapshotStatistics();
    res.status(201).json(record);
  } catch (error) {
    console.error('Erreur snapshot manuel:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await getStatisticsHistory(req.query);
    res.status(200).json(history);
  } catch (error) {
    console.error('Erreur historique:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = {
  getDashboard,
  exportDashboard,
  takeSnapshot,
  getHistory
};
