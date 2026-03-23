// Центральный модуль состояния приложения — тестируемый и изолированный
(function() {
  const State = {
    denominator: 6,
    selectedSectors: [],
    hintStep: 1,
    _listeners: [],

    init(d = 6) {
      this.denominator = d;
      this.selectedSectors = Array(d).fill(false);
      this.hintStep = 1;
      this._emit();
    },

    toggleSector(i) {
      if (i < 0 || i >= this.denominator) return;
      this.selectedSectors[i] = !this.selectedSectors[i];
      this._emit();
    },

    reset() {
      this.selectedSectors = Array(this.denominator).fill(false);
      this.hintStep = 1;
      this._emit();
    },

    setHintStep(s) {
      this.hintStep = s;
      this._emit();
    },

    getSelectedCount() {
      return this.selectedSectors.filter(Boolean).length;
    },

    checkAnswer() {
      const selected = this.getSelectedCount();
      if (selected === 0) return { ok: false, code: 'none', message: '❌ Коснитесь секторов!' };
      if (this.denominator === 6 && selected === 3) return { ok: true, code: 'correct', message: '✅ Правильно!' };
      return { ok: false, code: 'wrong', message: `❌ Нужно 3/6, вы выбрали ${selected}/${this.denominator}` };
    },

    onChange(cb) {
      if (typeof cb === 'function') this._listeners.push(cb);
    },

    _emit() {
      this._listeners.forEach(cb => {
        try { cb(this); } catch (e) { console.error('State listener error', e); }
      });
    }
  };

  State.init(6);
  window.State = State;
})();
