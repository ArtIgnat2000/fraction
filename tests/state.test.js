const fs = require('fs');
const path = require('path');

describe('State module', () => {
  let window;

  beforeEach(() => {
    // create fresh JSDOM window and load state.js into it
    const { JSDOM } = require('jsdom');
    const html = `<!doctype html><html><body></body></html>`;
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    window = dom.window;
    const stateCode = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'state.js'), 'utf8');
    // evaluate in the JSDOM window context
    const scriptEl = dom.window.document.createElement('script');
    scriptEl.textContent = stateCode;
    dom.window.document.head.appendChild(scriptEl);
  });

  test('initializes with denominator and selectedSectors', () => {
    const State = window.State;
    expect(State).toBeDefined();
    expect(State.denominator).toBe(6);
    expect(Array.isArray(State.selectedSectors)).toBe(true);
    expect(State.selectedSectors.length).toBe(6);
    expect(State.getSelectedCount()).toBe(0);
  });

  test('toggleSector toggles a sector and emits change', () => {
    const State = window.State;
    let changed = false;
    State.onChange(() => { changed = true; });
    State.toggleSector(2);
    expect(State.selectedSectors[2]).toBe(true);
    expect(State.getSelectedCount()).toBe(1);
    expect(changed).toBe(true);
  });

  test('reset clears selections and hintStep', () => {
    const State = window.State;
    State.toggleSector(0);
    State.toggleSector(1);
    expect(State.getSelectedCount()).toBeGreaterThan(0);
    State.setHintStep(2);
    State.reset();
    expect(State.getSelectedCount()).toBe(0);
    expect(State.hintStep).toBe(1);
  });

  test('checkAnswer returns correct result for 3/6', () => {
    const State = window.State;
    State.reset();
    // select three sectors
    State.toggleSector(0);
    State.toggleSector(1);
    State.toggleSector(2);
    const res = State.checkAnswer();
    expect(res.ok).toBe(true);
    expect(res.code).toBe('correct');
  });
});
