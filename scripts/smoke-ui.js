const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
const window = dom.window;

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

(async function run() {
  // wait a moment for scripts to execute
  await delay(200);
  try {
    if (typeof window.showHint !== 'function') throw new Error('showHint not found');
    if (typeof window.renderAnswerWheel !== 'function' && typeof window.WheelView === 'undefined') throw new Error('renderAnswerWheel / WheelView not found');

    console.log('Calling showHint() (step 1)');
    window.showHint();
    await delay(100);
    const hintBox = window.document.getElementById('hintBox');
    const wheels = window.document.getElementById('hintWheels');
    console.log('hintBox display:', hintBox.style.display || '(empty)');
    console.log('hintWheels children:', wheels.children.length);

    const next = window.document.getElementById('nextHintStep');
    if (!next) console.warn('next button missing'); else {
      console.log('Clicking next button');
      next.click();
      await delay(100);
      console.log('after next, State.hintStep =', window.State && window.State.hintStep);
      console.log('hintWheels children after next:', wheels.children.length);
    }

    console.log('Rendering answer wheel');
    if (typeof window.renderAnswerWheel === 'function') window.renderAnswerWheel();
    else if (window.WheelView && typeof window.WheelView.renderAnswer === 'function') window.WheelView.renderAnswer('answerWheel');
    await delay(50);
    const ans = window.document.getElementById('answerWheel');
    console.log('answerWheel innerHTML length:', ans && ans.innerHTML.length);
  } catch (e) {
    console.error('SMOKE ERROR:', e && e.stack ? e.stack : e);
    process.exitCode = 2;
  }
})();

