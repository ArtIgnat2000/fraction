// Настройки (заглушка)
const Settings = (function() {
  const KEY = 'math_settings_v1';
  const defaults = { tts: false, animations: true, language: 'ru' };

  function load() {
    return Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}'));
  }
  function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }

  return { load, save };
})();

window.Settings = Settings;
