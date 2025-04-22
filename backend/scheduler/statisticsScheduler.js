const cron = require('node-cron');
const { getDashboardStatistics } = require('../services/dashboardService');
const { Statistique } = require('../models/Statistiques');

let lastFormattedStats = null;

function formatStatsMultiLine(stats) {
  return `Utilisateurs\n${stats.users || 0}\n\n` +
         `Types de ressources\n${stats.types_ressource || 0}\n\n` +
         `Ressources\n${stats.ressources || 0}\n\n` +
         `Relations\n${stats.relations || 0}\n\n` +
         `Commentaires\n${stats.commentaires || 0}\n\n` +
         `Catégories de ressources\n${stats.categories || 0}`;
}

function hasChanged(prev, curr) {
  return prev !== curr;
}

async function checkAndInsertIfChanged() {
  try {
    const stats = await getDashboardStatistics();
    const formatted = formatStatsMultiLine(stats);
    if (hasChanged(lastFormattedStats, formatted)) {
      await Statistique.create({ valeur: formatted });
      lastFormattedStats = formatted;
    }
  } catch (err) {
  }
}

function startStatisticsScheduler() {
  cron.schedule('*/3 * * * * *', () => {
    checkAndInsertIfChanged();
  });
}

module.exports = startStatisticsScheduler;
