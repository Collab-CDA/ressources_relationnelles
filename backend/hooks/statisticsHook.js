const cron = require('node-cron');
const { getDashboardStatistics, snapshotStatistics } = require('../services/dashboardService');

let lastStats = null;


function hasChanged(prev, current) {
  if (!prev) return true;
  return Object.keys(current).some(key => current[key] !== prev[key]);
}

async function checkAndSnapshot() {
  try {
    const current = await getDashboardStatistics();
    if (hasChanged(lastStats, current)) {
      const record = await snapshotStatistics();
      console.log(`[Scheduler] Nouveau snapshot enregistré à ${record.date_snapshot.toISOString()}`);
      lastStats = current;
    }
  } catch (err) {
    console.error('[Scheduler] Erreur lors du snapshot :', err);
  }
}


function startStatisticsScheduler() {
  cron.schedule('* * * * *', () => {
    console.log('[Scheduler] Vérification des statistiques…');
    checkAndSnapshot();
  });
}

module.exports = startStatisticsScheduler;
