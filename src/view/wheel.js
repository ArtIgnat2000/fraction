// Модуль рендера колёс — чистые функции генерации SVG и рендера ответа
(function() {
  function createWheel(n, d, color = '#4CAF50') {
    const size = 90;
    const r = size / 2;
    const innerR = 20;
    const strokeWidth = 1.4;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

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

      const pathD = `M${x1},${y1}L${x2},${y2}A${r},${r} 0 0 1 ${x3},${y3}L${x4},${y4}A${innerR},${innerR} 0 0 0 ${x1},${y1}Z`;

      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      bg.setAttribute('d', pathD);
      bg.setAttribute('fill', '#E0E0E0');
      bg.setAttribute('stroke', '#CCCCCC');
      bg.setAttribute('stroke-width', strokeWidth);
      svg.appendChild(bg);

      if (i < n) {
        const fg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        fg.setAttribute('d', pathD);
        fg.setAttribute('fill', color);
        fg.setAttribute('stroke', '#CCCCCC');
        fg.setAttribute('stroke-width', strokeWidth);
        svg.appendChild(fg);
      }
    }

    return svg;
  }

  function renderAnswer(containerId = 'answerWheel') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const denominator = window.State ? window.State.denominator : 6;
    const selected = window.State ? window.State.selectedSectors : Array(denominator).fill(false);

    const size = 120;
    const r = size / 2;
    const innerR = 30;
    const strokeWidth = 2;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

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

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1}L${x2},${y2}A${r},${r} 0 0 1 ${x3},${y3}L${x4},${y4}A${innerR},${innerR} 0 0 0 ${x1},${y1}Z`);
      path.setAttribute('fill', selected[i] ? '#FFD54F' : '#E0E0E0');
      path.setAttribute('stroke', '#CCCCCC');
      path.setAttribute('stroke-width', strokeWidth);
      svg.appendChild(path);

      const sector = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      sector.setAttribute('d', path.getAttribute('d'));
      sector.setAttribute('fill', 'transparent');
      sector.setAttribute('cursor', 'pointer');
      (function(idx) {
        sector.addEventListener('click', function() {
          window.State.toggleSector(idx);
          renderAnswer(containerId);
        });
      })(i);
      svg.appendChild(sector);
    }

    const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    center.setAttribute('cx', r);
    center.setAttribute('cy', r);
    center.setAttribute('r', 28);
    center.setAttribute('fill', 'white');
    center.setAttribute('stroke', '#BDBDBD');
    center.setAttribute('stroke-width', 1.5);
    svg.appendChild(center);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', r);
    text.setAttribute('y', r + 6);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '20px');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#212121');
    const count = selected.filter(Boolean).length;
    text.textContent = `${count}/${denominator}`;
    svg.appendChild(text);

    container.appendChild(svg);
  }

  window.WheelView = { createWheel, renderAnswer };
})();
