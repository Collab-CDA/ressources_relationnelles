const { getDashboardStatistics, exportDashboardStatistics } = require('../services/dashboardService');

const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardStatistics(req.query);
    res.status(200).json(data);
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

const exportDashboard = async (req, res) => {
  try {
    const csvData = await exportDashboardStatistics(req.query);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="dashboard_statistics.csv"');
    res.status(200).send(csvData);
  } catch (error) {
    console.error('Erreur lors de l’export des statistiques:', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = { getDashboard, exportDashboard };
