// App orchestration — uses `State` and `WheelView` modules
(function() {
  function showHint(step) {
    if (!step) step = 1;
    if (window.State) window.State.setHintStep(step);
    const box = document.getElementById('hintBox');
    const wheels = document.getElementById('hintWheels');
    if (!box || !wheels) return;
    box.style.display = 'block';
    wheels.innerHTML = '';

    const hintStep = window.State ? window.State.hintStep : step;

    if (hintStep === 1) {
      box.querySelector('.hint-steps').innerHTML = `
        <b>Шаг 1:</b> Чтобы сложить дроби, нужен общий знаменатель.<br>
        Для 1/3 и 1/6 общий знаменатель — <b>6</b>.
      `;

      const vertical = document.createElement('div');
      vertical.style.display = 'flex';
      vertical.style.flexDirection = 'column';
      vertical.style.gap = '12px';

      const row1 = document.createElement('div');
      row1.style.display = 'flex';
      row1.style.alignItems = 'center';
      row1.style.gap = '8px';

      const w13 = document.createElement('div');
      w13.className = 'wheel-item';
      w13.appendChild(window.WheelView.createWheel(1, 3, '#4CAF50'));
      const c13 = document.createElement('div');
      c13.className = 'wheel-center';
      c13.textContent = '1/3';
      w13.appendChild(c13);
      row1.appendChild(w13);

      const eq1 = document.createElement('div');
      eq1.className = 'op';
      eq1.textContent = '=';
      row1.appendChild(eq1);

      const w26 = document.createElement('div');
      w26.className = 'wheel-item';
      w26.appendChild(window.WheelView.createWheel(2, 6, '#4CAF50'));
      const c26 = document.createElement('div');
      c26.className = 'wheel-center';
      c26.textContent = '2/6';
      w26.appendChild(c26);
      row1.appendChild(w26);

      vertical.appendChild(row1);

      const row2 = document.createElement('div');
      row2.style.display = 'flex';
      row2.style.alignItems = 'center';
      row2.style.gap = '8px';

      const w16l = document.createElement('div');
      w16l.className = 'wheel-item';
      w16l.appendChild(window.WheelView.createWheel(1, 6, '#2196F3'));
      const c16l = document.createElement('div');
      c16l.className = 'wheel-center';
      c16l.textContent = '1/6';
      w16l.appendChild(c16l);
      row2.appendChild(w16l);

      const eq2 = document.createElement('div');
      eq2.className = 'op';
      eq2.textContent = '=';
      row2.appendChild(eq2);

      const w16r = document.createElement('div');
      w16r.className = 'wheel-item';
      w16r.appendChild(window.WheelView.createWheel(1, 6, '#2196F3'));
      const c16r = document.createElement('div');
      c16r.className = 'wheel-center';
      c16r.textContent = '1/6';
      w16r.appendChild(c16r);
      row2.appendChild(w16r);

      vertical.appendChild(row2);
      wheels.appendChild(vertical);

      // remove any old footer controls
      const existingFooter = document.getElementById('hintFooter');
      if (existingFooter) existingFooter.remove();

      // create footer with Next button on the left
      const footer = document.createElement('div');
      footer.id = 'hintFooter';
      footer.style.display = 'flex';
      footer.style.justifyContent = 'space-between';
      footer.style.alignItems = 'center';
      footer.style.width = '100%';
      footer.style.marginTop = '10px';

      const nextBtn = document.createElement('button');
      nextBtn.id = 'nextHintStep';
      nextBtn.textContent = 'Дальше →';
      nextBtn.style.padding = '6px 10px';
      nextBtn.style.borderRadius = '8px';
      nextBtn.style.border = '1px solid #ccc';
      nextBtn.style.background = '#fff';
      nextBtn.style.cursor = 'pointer';

      // left spacer (could be used for a left-aligned control)
      const leftWrap = document.createElement('div');
      leftWrap.style.display = 'flex';
      leftWrap.style.justifyContent = 'flex-start';
      leftWrap.appendChild(nextBtn);

      // rightWrap left empty here (controls shown in step 2)
      const rightWrap = document.createElement('div');

      footer.appendChild(leftWrap);
      footer.appendChild(rightWrap);
      box.appendChild(footer);

      nextBtn.onclick = function() {
        if (window.State) window.State.setHintStep(2);
        showHint(2);
      };

    } else {
      box.querySelector('.hint-steps').innerHTML = `
        <b>Шаг 2:</b> Приводим дроби к общему знаменателю и складываем:<br>
        1/3 = 2/6, 1/6 = 1/6, 2/6 + 1/6 = 3/6
      `;

      const vertical = document.createElement('div');
      vertical.style.display = 'flex';
      vertical.style.flexDirection = 'column';
      vertical.style.gap = '14px';
      vertical.style.marginBottom = '18px';

      const row1 = document.createElement('div');
      row1.style.display = 'flex';
      row1.style.alignItems = 'center';
      row1.style.gap = '10px';

      const w26 = document.createElement('div');
      w26.className = 'wheel-item';
      w26.appendChild(window.WheelView.createWheel(2, 6, '#4CAF50'));
      const c26 = document.createElement('div');
      c26.className = 'wheel-center';
      c26.textContent = '2/6';
      w26.appendChild(c26);
      row1.appendChild(w26);

      const eq1 = document.createElement('div');
      eq1.className = 'op';
      eq1.textContent = '=';
      row1.appendChild(eq1);

      const w36 = document.createElement('div');
      w36.className = 'wheel-item';
      w36.appendChild(window.WheelView.createWheel(3, 6, '#66BB6A'));
      const c36 = document.createElement('div');
      c36.className = 'wheel-center';
      c36.textContent = '3/6';
      w36.appendChild(c36);
      row1.appendChild(w36);
      vertical.appendChild(row1);

      const row2 = document.createElement('div');
      row2.style.display = 'flex';
      row2.style.alignItems = 'center';
      row2.style.gap = '10px';

      const w16l = document.createElement('div');
      w16l.className = 'wheel-item';
      w16l.appendChild(window.WheelView.createWheel(1, 6, '#2196F3'));
      const c16l = document.createElement('div');
      c16l.className = 'wheel-center';
      c16l.textContent = '1/6';
      w16l.appendChild(c16l);
      row2.appendChild(w16l);

      const eq2b = document.createElement('div');
      eq2b.className = 'op';
      eq2b.textContent = '=';
      row2.appendChild(eq2b);

      const w16r = document.createElement('div');
      w16r.className = 'wheel-item';
      w16r.appendChild(window.WheelView.createWheel(1, 6, '#2196F3'));
      const c16r = document.createElement('div');
      c16r.className = 'wheel-center';
      c16r.textContent = '1/6';
      w16r.appendChild(c16r);
      row2.appendChild(w16r);

      vertical.appendChild(row2);
      wheels.appendChild(vertical);

      const btnRow = document.createElement('div');
      btnRow.style.display = 'flex';
      btnRow.style.justifyContent = 'flex-end';
      btnRow.style.gap = '14px';
      btnRow.style.marginTop = '10px';
      btnRow.style.width = '100%';

      const backBtn = document.createElement('button');
      backBtn.id = 'backHintStep';
      backBtn.innerHTML = '<span style="font-size:1.3em;vertical-align:middle;">&#8592;</span>';
      backBtn.style.fontSize = '1.1em';
      backBtn.style.padding = '10px 22px';
      backBtn.style.borderRadius = '14px';
      backBtn.style.border = 'none';
      backBtn.style.background = '#F2F2F7';
      backBtn.style.color = '#222';
      backBtn.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
      backBtn.style.cursor = 'pointer';
      btnRow.appendChild(backBtn);

      const closeBtn = document.createElement('button');
      closeBtn.id = 'closeHintStep';
      closeBtn.innerHTML = '<span style="font-size:1.3em;vertical-align:middle;">&#10006;</span>';
      closeBtn.style.fontSize = '1.1em';
      closeBtn.style.padding = '10px 22px';
      closeBtn.style.borderRadius = '14px';
      closeBtn.style.border = 'none';
      closeBtn.style.background = '#F2F2F7';
      closeBtn.style.color = '#222';
      closeBtn.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
      closeBtn.style.cursor = 'pointer';
      btnRow.appendChild(closeBtn);

      // place controls below the wheels, aligned to the right
      box.appendChild(btnRow);

      closeBtn.onclick = function() {
        box.style.display = 'none';
        if (window.State) window.State.setHintStep(1);
      };
      backBtn.onclick = function() {
        if (window.State) window.State.setHintStep(1);
        showHint(1);
      };
    }
  }

  function checkAnswer() {
    if (!window.State) return;
    const res = window.State.checkAnswer();
    const el = document.getElementById('result');
    if (!el) return;
    el.textContent = res.message;
    el.className = 'result ' + (res.ok ? 'correct' : 'incorrect');
  }

  window.showHint = showHint;
  window.checkAnswer = checkAnswer;

  document.addEventListener('DOMContentLoaded', function() {
    if (window.WheelView) window.WheelView.renderAnswer('answerWheel');
    if (window.State && window.WheelView) {
      window.State.onChange(() => window.WheelView.renderAnswer('answerWheel'));
    }
  });

})();
