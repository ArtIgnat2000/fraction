// Простая заглушка для аналитики — будет расширена позже
const Analytics = (function() {
  const STORAGE_KEY = 'math_analytics_v1';

  function saveEvent(evt) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    all.push(Object.assign({ ts: Date.now() }, evt));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function exportCSV() {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!all.length) return '';
    const keys = Object.keys(all[0]);
    const rows = [keys.join(',')];
    all.forEach(r => rows.push(keys.map(k => JSON.stringify(r[k] ?? '')).join(',')));
    return rows.join('\n');
  }

  return { saveEvent, exportCSV };
})();

window.Analytics = Analytics;
