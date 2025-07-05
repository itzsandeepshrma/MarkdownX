const textarea = document.getElementById('markdown');
const preview = document.getElementById('preview');
const converter = new showdown.Converter();

window.onload = () => {
  const saved = localStorage.getItem('markdown');
  if (saved) textarea.value = saved;
  renderMarkdown();
};

textarea.addEventListener('input', () => {
  localStorage.setItem('markdown', textarea.value);
  renderMarkdown();
});

function renderMarkdown() {
  const html = converter.makeHtml(textarea.value);
  preview.innerHTML = html;
}

function exportMarkdown() {
  const blob = new Blob([textarea.value], { type: 'text/markdown' });
  download(blob, 'markdownx.md');
}

function exportHTML() {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>MarkdownX Export</title></head><body>${converter.makeHtml(textarea.value)}</body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  download(blob, 'markdownx.html');
}

function download(blob, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

// particles.js config
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 2 },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
