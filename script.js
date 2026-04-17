// ---- Matrix Rain Background ----
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|;:DSS';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5, 0, 10, 0.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Purple-red gradient effect
    const r = Math.random();
    if (r < 0.3) ctx.fillStyle = '#7c3aed';
    else if (r < 0.5) ctx.fillStyle = '#ef4444';
    else if (r < 0.7) ctx.fillStyle = '#3b82f6';
    else ctx.fillStyle = '#a855f7';

    // Occasional bright flash
    if (Math.random() < 0.01) ctx.fillStyle = '#ffffff';

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});

// ---- Floating Particles ----
function createParticles() {
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.background = ['#7c3aed', '#ef4444', '#3b82f6', '#a855f7'][Math.floor(Math.random() * 4)];
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = '0';
    document.body.appendChild(p);
  }
}
createParticles();

// ---- Typing Effect ----
const phrases = [
  'Initializing Purple Team Protocol...',
  'Scanning network perimeters...',
  'Exploit detected. Patching...',
  'Kibermakonni himoya qilamiz.',
  'DSS: Defend. Strike. Secure.',
  'SULTONOV SARDORBEK — Team Lead'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function typeEffect() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
  } else {
    typingEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeEffect, 500); return; }
  }
  setTimeout(typeEffect, deleting ? 30 : 70);
}
typeEffect();

// ---- Year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Lucide Icons ----
lucide.createIcons();

// ---- Intersection Observer for fade-in ----
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.animationPlayState = 'running'; } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => { el.style.animationPlayState = 'paused'; obs.observe(el); });

// ---- Element SDK ----
const defaultConfig = {
  hero_title: 'DSS',
  hero_subtitle: 'Dual Stack Security',
  about_title: 'Biz Haqimizda',
  leader_name: 'SULTONOV SARDORBEK',
  instagram_url: 'https://instagram.com/YOUR_HANDLE',
  telegram_url: 'https://t.me/YOUR_CHANNEL',
  youtube_url: 'https://youtube.com/@YOUR_CHANNEL',
  background_color: '#05000a',
  accent_color: '#a855f7',
  red_color: '#ef4444',
  text_color: '#c4b5fd',
  surface_color: '#140528',
  font_family: 'Orbitron',
  font_size: 16
};

function applyConfig(config) {
  const t = (k) => config[k] || defaultConfig[k];

  const heroTitle = document.getElementById('hero-title');
  heroTitle.textContent = t('hero_title');
  heroTitle.setAttribute('data-text', t('hero_title'));

  document.getElementById('hero-subtitle').textContent = t('hero_subtitle');
  document.getElementById('about-title').textContent = t('about_title');
  document.getElementById('leader-name').textContent = t('leader_name');

  document.getElementById('instagram-link').href = t('instagram_url');
  document.getElementById('telegram-link').href = t('telegram_url');
  document.getElementById('youtube-link').href = t('youtube_url');

  // Colors
  document.body.style.backgroundColor = t('background_color');
  document.querySelectorAll('.neon-purple').forEach(el => {
    el.style.textShadow = `0 0 7px ${t('accent_color')}, 0 0 20px ${t('accent_color')}, 0 0 42px ${t('accent_color')}`;
  });
  document.querySelectorAll('.cyber-card').forEach(el => {
    el.style.background = `linear-gradient(135deg, ${t('surface_color')}e6, ${t('background_color')}f2)`;
    el.style.borderColor = t('accent_color') + '33';
  });
  document.querySelectorAll('p[style*="color"]').forEach(el => {
    if (el.style.color === 'rgb(196, 181, 253)' || el.style.color === t('text_color')) {
      el.style.color = t('text_color');
    }
  });

  // Font
  const font = t('font_family');
  const baseSize = t('font_size');
  document.querySelectorAll('.orbitron').forEach(el => {
    el.style.fontFamily = `${font}, Orbitron, sans-serif`;
  });

  heroTitle.style.fontSize = `${baseSize * 5}px`;
  document.getElementById('hero-subtitle').style.fontSize = `${baseSize * 1.4}px`;
  document.getElementById('about-title').style.fontSize = `${baseSize * 2.5}px`;
  document.getElementById('leader-name').style.fontSize = `${baseSize * 2}px`;
}

window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => { applyConfig(config); },
  mapToCapabilities: (config) => {
    const c = (key) => ({
      get: () => config[key] || defaultConfig[key],
      set: (v) => { config[key] = v; window.elementSdk.setConfig({ [key]: v }); }
    });
    return {
      recolorables: [c('background_color'), c('surface_color'), c('text_color'), c('accent_color'), c('red_color')],
      borderables: [],
      fontEditable: c('font_family'),
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
      }
    };
  },
  mapToEditPanelValues: (config) => new Map([
    ['hero_title', config.hero_title || defaultConfig.hero_title],
    ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
    ['about_title', config.about_title || defaultConfig.about_title],
    ['leader_name', config.leader_name || defaultConfig.leader_name],
    ['instagram_url', config.instagram_url || defaultConfig.instagram_url],
    ['telegram_url', config.telegram_url || defaultConfig.telegram_url],
    ['youtube_url', config.youtube_url || defaultConfig.youtube_url],
  ])
});
