// Состояние для двухшаговой подсказки
let hintStep = 1;
// Вынесенный из index.html inline-скрипт — сохраняем идентичную логику визуала
// Глобальные переменные
let selectedSectors = [false, false, false, false, false, false];
const denominator = 6; // общий знаменатель для 1/3 + 1/6

// Создать одно колесо (для подсказки или ответа)
function createWheel(n, d, color = "#4CAF50") {
  const size = 90;
  const r = size / 2;
  const innerR = 20;
  const strokeWidth = 1.4;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

  // Серые сегменты (знаменатель)
  for (let i = 0; i < d; i++) {
    const a1 = (i * 2 * Math.PI) / d;
    const a2 = ((i + 1) * 2 * Math.PI) / d;

    const x1 = r + Math.cos(a1) * innerR;
    const y1 = r + Math.sin(a1) * innerR;
    const x2 = r + Math.cos(a1) * r;
    const y2 = r + Math.sin(a1) * r;
    const x3 = r + Math.cos(a2) * r;
    const y3 = r + Math.sin(a2) * r;
    const x4 = r + Math.cos(a2) * innerR;
    const y4 = r + Math.sin(a2) * innerR;

    const bg = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bg.setAttribute("d", `M${x1},${y1}L${x2},${y2}A${r},${r} 0 0 1 ${x3},${y3}L${x4},${y4}A${innerR},${innerR} 0 0 0 ${x1},${y1}Z`);
    bg.setAttribute("fill", "#E0E0E0");
    bg.setAttribute("stroke", "#CCCCCC");
    bg.setAttribute("stroke-width", strokeWidth);
    svg.appendChild(bg);

    // Цветной сегмент (если i < n)
    if (i < n) {
      const fg = document.createElementNS("http://www.w3.org/2000/svg", "path");
      fg.setAttribute("d", `M${x1},${y1}L${x2},${y2}A${r},${r} 0 0 1 ${x3},${y3}L${x4},${y4}A${innerR},${innerR} 0 0 0 ${x1},${y1}Z`);
      fg.setAttribute("fill", color);
      fg.setAttribute("stroke", "#CCCCCC");
      fg.setAttribute("stroke-width", strokeWidth);
      svg.appendChild(fg);
    }
  }

  return svg;
}

// Рендерим графическую подсказку: 2/4 + 1/4 = 3/4
// Рендерим колесо-ответ с интерактивными секторами
function renderAnswerWheel() {
  const container = document.getElementById('answerWheel');
  container.innerHTML = '';
  const size = 120;
  const r = size / 2;
  const innerR = 30;
  const strokeWidth = 2;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  for (let i = 0; i < denominator; i++) {
    const a1 = (i * 2 * Math.PI) / denominator;
    const a2 = ((i + 1) * 2 * Math.PI) / denominator;
    const x1 = r + Math.cos(a1) * innerR;
    const y1 = r + Math.sin(a1) * innerR;
    const x2 = r + Math.cos(a1) * r;
    const y2 = r + Math.sin(a1) * r;
    const x3 = r + Math.cos(a2) * r;
    const y3 = r + Math.sin(a2) * r;
    const x4 = r + Math.cos(a2) * innerR;
    const y4 = r + Math.sin(a2) * innerR;
    // Сектор
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M${x1},${y1}L${x2},${y2}A${r},${r} 0 0 1 ${x3},${y3}L${x4},${y4}A${innerR},${innerR} 0 0 0 ${x1},${y1}Z`);
    path.setAttribute("fill", selectedSectors[i] ? "#FFD54F" : "#E0E0E0");
    path.setAttribute("stroke", "#CCCCCC");
    path.setAttribute("stroke-width", strokeWidth);
    svg.appendChild(path);
    // Кликабельная область
    const sector = document.createElementNS("http://www.w3.org/2000/svg", "path");
    sector.setAttribute("d", `M${x1},${y1}L${x2},${y2}A${r},${r} 0 0 1 ${x3},${y3}L${x4},${y4}A${innerR},${innerR} 0 0 0 ${x1},${y1}Z`);
    sector.setAttribute("fill", "transparent");
    sector.setAttribute("cursor", "pointer");
    sector.addEventListener("click", (function(idx) {
      return function() {
        selectedSectors[idx] = !selectedSectors[idx];
        renderAnswerWheel();
      };
    })(i));
    svg.appendChild(sector);
  }
  // Центр
  const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  center.setAttribute("cx", r);
  center.setAttribute("cy", r);
  center.setAttribute("r", 28);
  center.setAttribute("fill", "white");
  center.setAttribute("stroke", "#BDBDBD");
  center.setAttribute("stroke-width", 1.5);
  svg.appendChild(center);
  // Текст в центре
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", r);
  text.setAttribute("y", r + 6);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "20px");
  text.setAttribute("font-weight", "bold");
  text.setAttribute("fill", "#212121");
  text.textContent = `${selectedSectors.filter(Boolean).length}/${denominator}`;
  svg.appendChild(text);
  container.appendChild(svg);
}

// Создать колесо-ответ с интерактивными секторами
function showHint(step) {
  if (!step) hintStep = 1;
  const box = document.getElementById('hintBox');
  const wheels = document.getElementById('hintWheels');
  box.style.display = 'block';
  wheels.innerHTML = '';
  if (hintStep === 1) {
    box.querySelector('.hint-steps').innerHTML = `
      <b>Шаг 1:</b> Чтобы сложить дроби, нужен общий знаменатель.<br>
      Для 1/3 и 1/6 общий знаменатель — <b>6</b>.<br>
      <button id="nextHintStep" style="margin-top:12px; font-size: 1em;">Дальше &rarr;</button>
    `;
    // Визуализация приведения к общему знаменателю — две строки вертикально
    wheels.innerHTML = '';
    const vertical = document.createElement('div');
    vertical.style.display = 'flex';
    vertical.style.flexDirection = 'column';
    vertical.style.gap = '12px';
    // Первая строка: 1/3 = 2/6
    const row1 = document.createElement('div');
    row1.style.display = 'flex';
    row1.style.alignItems = 'center';
    row1.style.gap = '8px';
    // Слева 1/3
    const w13 = document.createElement('div');
    w13.className = 'wheel-item';
    w13.appendChild(createWheel(1, 3, "#4CAF50"));
    const c13 = document.createElement('div');
    c13.className = 'wheel-center';
    c13.textContent = '1/3';
    w13.appendChild(c13);
    row1.appendChild(w13);
    // =
    const eq1 = document.createElement('div');
    eq1.className = 'op';
    eq1.textContent = '=';
    row1.appendChild(eq1);
    // Справа 2/6
    const w26 = document.createElement('div');
    w26.className = 'wheel-item';
    w26.appendChild(createWheel(2, 6, "#4CAF50"));
    const c26 = document.createElement('div');
    c26.className = 'wheel-center';
    c26.textContent = '2/6';
    w26.appendChild(c26);
    row1.appendChild(w26);
    vertical.appendChild(row1);
    // Вторая строка: 1/6 = 1/6
    const row2 = document.createElement('div');
    row2.style.display = 'flex';
    row2.style.alignItems = 'center';
    row2.style.gap = '8px';
    // Слева 1/6
    const w16l = document.createElement('div');
    w16l.className = 'wheel-item';
    w16l.appendChild(createWheel(1, 6, "#2196F3"));
    const c16l = document.createElement('div');
    c16l.className = 'wheel-center';
    c16l.textContent = '1/6';
    w16l.appendChild(c16l);
    row2.appendChild(w16l);
    // =
    const eq2 = document.createElement('div');
    eq2.className = 'op';
    eq2.textContent = '=';
    row2.appendChild(eq2);
    // Справа 1/6
    const w16r = document.createElement('div');
    w16r.className = 'wheel-item';
    w16r.appendChild(createWheel(1, 6, "#2196F3"));
    const c16r = document.createElement('div');
    c16r.className = 'wheel-center';
    c16r.textContent = '1/6';
    w16r.appendChild(c16r);
    row2.appendChild(w16r);
    vertical.appendChild(row2);
    wheels.appendChild(vertical);
    document.getElementById('nextHintStep').onclick = function() {
      hintStep = 2;
      showHint(2);
    };
  } else {
    box.querySelector('.hint-steps').innerHTML = `
      <b>Шаг 2:</b> Приводим дроби к общему знаменателю и складываем:<br>
      1/3 = 2/6, 1/6 = 1/6, 2/6 + 1/6 = 3/6
    `;
    // Визуализация (колёса) — каждая пара на своей строке
    wheels.innerHTML = '';
    const vertical = document.createElement('div');
    vertical.style.display = 'flex';
    vertical.style.flexDirection = 'column';
    vertical.style.gap = '14px';
    vertical.style.marginBottom = '18px';
    // Первая строка: 2/6 = 3/6
    const row1 = document.createElement('div');
    row1.style.display = 'flex';
    row1.style.alignItems = 'center';
    row1.style.gap = '10px';
    // Слева 2/6
    const w26 = document.createElement('div');
    w26.className = 'wheel-item';
    w26.appendChild(createWheel(2, 6, "#4CAF50"));
    const c26 = document.createElement('div');
    c26.className = 'wheel-center';
    c26.textContent = '2/6';
    w26.appendChild(c26);
    row1.appendChild(w26);
    // =
    const eq1 = document.createElement('div');
    eq1.className = 'op';
    eq1.textContent = '=';
    row1.appendChild(eq1);
    // Справа 3/6
    const w36 = document.createElement('div');
    w36.className = 'wheel-item';
    w36.appendChild(createWheel(3, 6, "#66BB6A"));
    const c36 = document.createElement('div');
    c36.className = 'wheel-center';
    c36.textContent = '3/6';
    w36.appendChild(c36);
    row1.appendChild(w36);
    vertical.appendChild(row1);
    // Вторая строка: 1/6 = 1/6
    const row2 = document.createElement('div');
    row2.style.display = 'flex';
    row2.style.alignItems = 'center';
    row2.style.gap = '10px';
    // Слева 1/6
    const w16l = document.createElement('div');
    w16l.className = 'wheel-item';
    w16l.appendChild(createWheel(1, 6, "#2196F3"));
    const c16l = document.createElement('div');
    c16l.className = 'wheel-center';
    c16l.textContent = '1/6';
    w16l.appendChild(c16l);
    row2.appendChild(w16l);
    // =
    const eq2 = document.createElement('div');
    eq2.className = 'op';
    eq2.textContent = '=';
    row2.appendChild(eq2);
    // Справа 1/6
    const w16r = document.createElement('div');
    w16r.className = 'wheel-item';
    w16r.appendChild(createWheel(1, 6, "#2196F3"));
    const c16r = document.createElement('div');
    c16r.className = 'wheel-center';
    c16r.textContent = '1/6';
    w16r.appendChild(c16r);
    row2.appendChild(w16r);
    vertical.appendChild(row2);
    wheels.appendChild(vertical);

    // Кнопки под колесами
    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.justifyContent = 'center';
    btnRow.style.gap = '14px';
    btnRow.style.marginTop = '10px';

    // Кнопка Назад (стрелка влево)
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

    // Кнопка Закрыть (крестик)
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

    wheels.appendChild(btnRow);

    // Обработчики
    closeBtn.onclick = function() {
      box.style.display = 'none';
      hintStep = 1;
    };
    backBtn.onclick = function() {
      hintStep = 1;
      showHint(1);
    };
  }
}

function checkAnswer() {
  const selectedNumerator = selectedSectors.filter(Boolean).length;
  if (selectedNumerator === 0) {
    document.getElementById('result').textContent = '❌ Коснитесь секторов!';
    document.getElementById('result').className = 'result incorrect';
    return;
  }
  if (selectedNumerator === 3 && denominator === 6) {
    document.getElementById('result').textContent = '✅ Правильно!';
    document.getElementById('result').className = 'result correct';
  } else {
    document.getElementById('result').textContent = `❌ Нужно 3/6, вы выбрали ${selectedNumerator}/${denominator}`;
    document.getElementById('result').className = 'result incorrect';
  }
}

// Экспортируем в глобальную область для inline-обработчиков

window.createWheel = createWheel;
window.showHint = showHint;
window.renderAnswerWheel = renderAnswerWheel;
window.checkAnswer = checkAnswer;

// Инициализация
window.addEventListener('DOMContentLoaded', function() {
  // Сбросить выделение при загрузке
  for (let i = 0; i < denominator; i++) selectedSectors[i] = false;
  renderAnswerWheel();
});
