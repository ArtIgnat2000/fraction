// UI bridge — thin wrappers that can be used by new app logic without modifying visual functions
const UIBridge = (function() {
  function renderAnswer() { if (typeof renderAnswerWheel === 'function') renderAnswerWheel(); }
  function showHintBox() { if (typeof showHint === 'function') showHint(); }
  return { renderAnswer, showHintBox };
})();

window.UIBridge = UIBridge;
