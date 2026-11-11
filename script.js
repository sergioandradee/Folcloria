/* ==========================================================
   FOLCLORIA — lógica del app
   1) CONFIG: todo el contenido y las rutas de imágenes están aquí.
   2) Router, vistas, mapa con zoom, favoritos, PWA.
   ========================================================== */
'use strict';

/* ----------------------------------------------------------
   1) CONFIG — editar aquí
   Imágenes: copiar los archivos originales a /assets con estos
   nombres (o cambiar las rutas). Si un archivo no existe se
   muestra un recuadro neutro con su etiqueta.
   ---------------------------------------------------------- */
const CONFIG = {
  assets: {
    logo:    { src: 'assets/Logodefolclor.png',    label: 'Logotipo Folcloria' },
    mascota: { src: 'assets/imgs/personafolc.png', label: 'Mascota oficial' },
    mapa:    { src: 'assets/mapa.folcloria.png',    label: 'Mapa ilustrado del parque' },
    /* Brand pattern de fondo de la pantalla de inicio (una sola imagen).
       opacidad: 0 = invisible, 1 = colores completos (probar entre 0.15 y 0.35)
       opacidadHero: lo mismo, para la franja verde del logo y la mascota */
    patron:  { src: 'assets/imgs/patron.folc.png', opacidad: 0.2, opacidadHero: 0.2 }
  },

  welcome: {
    title: '¡Bienvenido a Folcloria!',
    subtitle: 'Un mundo de aventuras, naturaleza y leyendas brasileñas te espera.',
    button: '¡Empezar a explorar!'
  },

  /* Zonas del mapa. x / y = posición en % sobre la imagen del mapa
     (0,0 = esquina superior izquierda). AJUSTAR cuando llegue el mapa original. */
  zonas: [
    { id: 'entrada',  num: 1, nombre: 'Entrada / Recepción', x: 18.6, y: 49.1, tag: 'Zona 1',
      desc: 'Aquí comienza la aventura. Presenta tu entrada, pide información y recibe ayuda para toda la familia.' },
    { id: 'casulo',   num: 2, nombre: 'Casulo Encantado',    x: 33.7, y: 14.3, tag: 'Zona 2',
      desc: 'Un espacio mágico donde las leyendas del folclore brasileño cobran vida.' },
    { id: 'villa',    num: 3, nombre: 'Villa Encantada',     x: 81.4, y: 49.0, tag: 'Zona 3',
      desc: 'La villa de las historias: puestitos de colores, juegos y encuentros con los personajes de las leyendas.' },
    { id: 'alimentacion', num: 4, nombre: 'Alimentación',    x: 36.4, y: 50.4, tag: 'Zona 4',
      desc: 'Un espacio para descansar y recargar energías con meriendas y comidas para toda la familia.' },
    { id: 'salida',   num: 5, nombre: 'Salida',              x: 58.1, y: 73.9, tag: 'Zona 5',
      desc: 'Fin del recorrido. ¡Gracias por visitarnos! Vuelve pronto a descubrir más leyendas.' }
  ],

  /* Mascota — completar nombre e historia reales */
  mascota: {
    nombre: 'CURUMIN',
    rol: 'Mascota oficial de Folcloria',
    historia: 'Soy un pequeño guardián de la naturaleza y un gran explorador. Vivo en el mundo mágico de Folcloria, donde cada árbol guarda un secreto y cada rincón esconde una nueva aventura.',
    personalidad: 'AMIGABLE, CARISMÁTICO, CURIOSO, GUIA ',
    hace: [
      'Da la bienvenida: recibe a los visitantes y los invita a explorar el parque.',
      'Comparte secretos: revela curiosidades y pequeños misterios escondidos en el parque.'
    ],
    curiosidades: [
      'Su lugar favorito es la Floresta Encantada.',
      'Conoce muchísimas historias del folclore brasileño.',
      'Puede pasar horas explorando los rincones de la naturaleza.'
    ]
  },

  /* Leyendas — el id de imagen es assets/<id>.png */
  leyendas: [
    {
      id: 'iara', nombre: 'Iara', subtitulo: 'La madre de las aguas', color: '#def2fb',
      imagen: 'assets/imgs/Folcloria imprimir/iara.app.png',
      historia: 'Iara es una joven de belleza increíble que vive en las profundidades de los ríos de la Amazonía. Con su canto dulce atrae a los pescadores hacia el agua. Quien se deja encantar por su voz suele no volver a la orilla.',
      origen: 'Nace de las tradiciones de los pueblos indígenas de la Amazonía. Con el tiempo se mezcló con las historias europeas de sirenas y se convirtió en una de las leyendas más conocidas de Brasil.',
      curiosidades: [
        'Su nombre viene del tupi y se relaciona con «señora del agua».',
        'También se la conoce como Uiara o Mãe-d\'água.',
        'Se dice que se peina con un peine de oro en la orilla del río.'
      ]
    },
    {
      id: 'saci', nombre: 'Saci-Pererê', subtitulo: 'El travieso de una sola pierna', color: '#ffe6d3',
      imagen: 'assets/imgs/Folcloria imprimir/saci.app.png',
      historia: 'El Saci es un niño travieso con una sola pierna, gorro rojo y una pipa. Aparece en remolinos de viento y hace bromas: esconde objetos, espanta a los animales y quema el arroz. Dicen que quien le roba el gorro puede pedirle un deseo.',
      origen: 'Sus raíces están en el sur de Brasil, con influencias indígenas y africanas. La figura fue cambiando hasta llegar al personaje que hoy conocen niñas y niños de todo el país.',
      curiosidades: [
        'Se celebra el Día del Saci el 31 de octubre.',
        'Su gorro rojo le da poderes mágicos.',
        'Se lo puede atrapar con una botella y una cruz dentro de un remolino, según la tradición.'
      ]
    },
    {
      id: 'boto', nombre: 'Boto-cor-de-rosa', subtitulo: 'El delfín encantado', color: '#ffe0ec',
      imagen: 'assets/imgs/Folcloria imprimir/boto.app.png',
      historia: 'Cuenta la leyenda que en las noches de fiesta el boto rosado sale del río convertido en un joven elegante, siempre con sombrero para esconder su cabeza. Encanta a todos con su baile y, antes del amanecer, vuelve a las aguas.',
      origen: 'Es una leyenda típica de la región amazónica. El boto es un delfín de río real, y su color rosado y su comportamiento curioso inspiraron muchas historias.',
      curiosidades: [
        'El boto-cor-de-rosa existe de verdad: es un delfín de río de la Amazonía.',
        'En la leyenda usa sombrero para ocultar su orificio respiratorio.',
        'Hoy es una especie que necesita protección.'
      ]
    },
    {
      id: 'curupira', nombre: 'Curupira', subtitulo: 'El guardián del bosque', color: '#e3f5e8',
      imagen: 'assets/imgs/Folcloria imprimir/curupira.app.png',
      historia: 'El Curupira es el protector de la selva. Tiene el cabello rojo y los pies al revés, así que sus huellas confunden a quienes se internan en el bosque con malas intenciones. Cuida de los animales y castiga a quienes los lastiman.',
      origen: 'Es una de las leyendas más antiguas de Brasil, de origen indígena tupi. Ya aparece en relatos de los primeros siglos tras la llegada de los europeos.',
      curiosidades: [
        'Sus pies hacia atrás hacen que sus huellas apunten en dirección contraria.',
        'Su nombre en tupi suele traducirse como «cuerpo de niño».',
        'Es considerado un símbolo de la defensa de la naturaleza.'
      ]
    }
  ],

  /* Información — fácil de actualizar: cada bloque es un item */
  info: [
    { id: 'horarios', icono: '🕘', titulo: 'Horarios de funcionamiento', tipo: 'tabla',
      filas: [['Lunes a viernes', '[00:00 – 00:00]'], ['Sábados', '[00:00 – 00:00]'], ['Domingos y feriados', '[00:00 – 00:00]']],
      nota: 'Los horarios pueden cambiar en temporada alta.' },
    { id: 'ingresos', icono: '🎟️', titulo: 'Entradas', tipo: 'tabla',
      filas: [['Adultos', '[$ 0]'], ['Niños de 5 a 12 años', '[$ 0]'], ['Menores de 4 años', '[Gratis]'], ['Pase familiar', '[$ 0]']],
      nota: 'Consulta promociones y compra anticipada en los canales oficiales.' },
    { id: 'llegar', icono: '🚌', titulo: 'Cómo llegar', tipo: 'lista',
      items: ['[Dirección del parque]', '[Transporte público: líneas y paradas]', '[En auto: estacionamiento]'] },
    { id: 'comer', icono: '🍽️', titulo: 'Alimentación', tipo: 'lista',
      items: ['[Zona de comidas y meriendas]', '[Opciones para alergias y dietas especiales]', '[Se permite / no se permite ingresar comida]'] },
    { id: 'acces', icono: '♿', titulo: 'Accesibilidad', tipo: 'lista',
      items: ['[Rampas y recorridos accesibles]', '[Baños adaptados]', '[Préstamo de sillas de ruedas]', '[Apoyos para personas con discapacidad sensorial]'] },
    { id: 'reglas', icono: '📜', titulo: 'Reglas del parque', tipo: 'lista',
      items: ['Cuida la naturaleza: no arranques plantas ni dejes basura.', 'Los menores deben ir acompañados por un adulto.', 'Respeta a los demás visitantes y al personal.', '[Agregar otras reglas]'] },
    { id: 'faq', icono: '❓', titulo: 'Preguntas frecuentes', tipo: 'faq',
      items: [
        { q: '¿Puedo ingresar con mi mascota?', a: '[Respuesta]' },
        { q: '¿Hay guardarropa o lockers?', a: '[Respuesta]' },
        { q: '¿Qué pasa si llueve?', a: '[Respuesta]' }
      ] },
    { id: 'contacto', icono: '💬', titulo: 'Contacto y redes', tipo: 'links',
      links: [
        { t: 'Correo', u: 'mailto:contacto@ejemplo.com' },
        { t: 'Instagram', u: 'https://instagram.com/' },
        { t: 'WhatsApp', u: 'https://wa.me/' }
      ] }
  ]
};

/* ----------------------------------------------------------
   2) Utilidades
   ---------------------------------------------------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function pic(src, label, cls = '', alt = '') {
  return `<div class="ph-wrap ${cls}"><img src="${esc(src)}" alt="${esc(alt || label)}" draggable="false" onerror="this.parentNode.classList.add('missing')"><span class="ph-label">${esc(label)}<br>(aguardando imagen)</span></div>`;
}

function haptic() { try { navigator.vibrate && navigator.vibrate(8); } catch (e) {} }

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

/* Favoritos (localStorage con respaldo en memoria) */
const Fav = (() => {
  const KEY = 'folcloria:favs';
  let set = new Set();
  try { set = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...set])); } catch (e) {} };
  return {
    has: id => set.has(id),
    toggle(id) { set.has(id) ? set.delete(id) : set.add(id); save(); return set.has(id); },
    count: () => set.size
  };
})();

/* ----------------------------------------------------------
   3) Vistas
   ---------------------------------------------------------- */
function renderInicio() {
  const w = CONFIG.welcome, a = CONFIG.assets;
  const isiOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  const showTip = isiOS && !standalone && !sessionStorage.getItem('folcloria:tip');
  $('#view-inicio').innerHTML = `
    <div class="hero">
      ${pic(a.logo.src, a.logo.label, 'logo')}
      ${pic(a.mascota.src, a.mascota.label, 'mascot-hero')}
    </div>
    <div class="welcome">
      <div class="welcome-card">
        <h1>${esc(w.title)}</h1>
        <p>${esc(w.subtitle)}</p>
        <button class="btn btn-primary" data-go="#/mapa">${esc(w.button)}</button>
      </div>
    </div>
    <div class="quick">
      <button class="quick-card qc-map" data-go="#/mapa"><span class="emoji">🗺️</span><strong>Mapa</strong><small>Explora el parque</small></button>
      <button class="quick-card qc-mascot" data-go="#/mascota"><span class="emoji">🌟</span><strong>Mascota</strong><small>Conoce a nuestro guía</small></button>
      <button class="quick-card qc-legends" data-go="#/leyendas"><span class="emoji">🌿</span><strong>Leyendas</strong><small>Historias del folclore</small></button>
      <button class="quick-card qc-info" data-go="#/info"><span class="emoji">ℹ️</span><strong>Información</strong><small>Horarios y entradas</small></button>
    </div>
    ${showTip ? `<div class="install-tip" id="installTip"><span>📲 Para tener Folcloria como app: toca <b>Compartir</b> en Safari y elige <b>Agregar a pantalla de inicio</b>.</span><button aria-label="Cerrar" id="tipClose">×</button></div>` : ''}
  `;
  applyHeroPattern();
  const tc = $('#tipClose');
  if (tc) tc.onclick = () => { sessionStorage.setItem('folcloria:tip', '1'); $('#installTip').remove(); };
}

/* Aplica el brand pattern como fondo de toda la pantalla de inicio, aclarado.
   Si el archivo no existe, queda el degradé verde de siempre. */
function applyHeroPattern() {
  const p = CONFIG.assets.patron, view = $('#view-inicio');
  if (!p || !view) return;
  const img = new Image();
  img.onload = () => {
    const op = Math.min(1, Math.max(0, p.opacidad ?? 0.2));
    view.style.setProperty('--pattern', `url("${p.src}")`);
    const oh = Math.min(1, Math.max(0, p.opacidadHero ?? 0.2));
    view.style.setProperty('--veil', `rgba(244, 250, 245, ${(1 - op).toFixed(2)})`);
    view.style.setProperty('--hero-a', (1 - oh).toFixed(2));
    view.classList.add('has-pattern');
  };
  img.src = p.src;
}

function renderMascota() {
  const m = CONFIG.mascota, a = CONFIG.assets;
  const list = arr => `<ul>${arr.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
  $('#view-mascota').innerHTML = `
    <button class="back" data-go="#/inicio">‹ Inicio</button>
    ${pic(a.mascota.src, a.mascota.label, 'profile-art profile-art--mascot')}
    <div class="profile-title"><h1>${esc(m.nombre)}</h1><p>${esc(m.rol)}</p></div>
    <div class="block b-yellow"><h2>📖 Su historia</h2><p>${esc(m.historia)}</p></div>
    <div class="block b-green"><h2>💚 Personalidad</h2><p>${esc(m.personalidad)}</p></div>
    <div class="block b-blue"><h2>🎪 ¿Qué hace en el parque?</h2>${list(m.hace)}</div>
    <div class="block"><h2>✨ Curiosidades</h2>${list(m.curiosidades)}</div>
  `;
}

let legendFilterFav = false;
function legendCardHTML(l) {
  return `
    <div style="position:relative">
      <button class="legend-card" data-legend="${l.id}" style="--card-bg:${l.color}">
        ${pic(l.imagen, l.nombre, 'art')}
        <div class="meta"><h3>${esc(l.nombre)}</h3><small>${esc(l.subtitulo)}</small></div>
      </button>
      <button class="fav ${Fav.has(l.id) ? 'on' : ''}" data-fav="${l.id}" aria-label="Favorito: ${esc(l.nombre)}" aria-pressed="${Fav.has(l.id)}">♥</button>
    </div>`;
}
function renderLeyendas() {
  const items = CONFIG.leyendas.filter(l => !legendFilterFav || Fav.has(l.id));
  $('#view-leyendas').innerHTML = `
    <div class="page-head"><h1>Leyendas brasileñas</h1><p>Toca un personaje para conocer su historia.</p></div>
    <div class="filter">
      <button class="chip ${legendFilterFav ? '' : 'on'}" data-filter="all">Todas</button>
      <button class="chip ${legendFilterFav ? 'on' : ''}" data-filter="fav">♥ Favoritas (${Fav.count()})</button>
    </div>
    <div class="cards">
      ${items.length ? items.map(legendCardHTML).join('') : `<div class="empty">Aún no tienes favoritas.<br>Toca el corazón ♥ en un personaje para guardarlo.</div>`}
    </div>`;
}

function renderLeyenda(id) {
  const idx = CONFIG.leyendas.findIndex(l => l.id === id);
  if (idx < 0) return location.hash = '#/leyendas';
  const l = CONFIG.leyendas[idx];
  const prev = CONFIG.leyendas[(idx + CONFIG.leyendas.length - 1) % CONFIG.leyendas.length];
  const next = CONFIG.leyendas[(idx + 1) % CONFIG.leyendas.length];
  $('#view-leyenda').innerHTML = `
    <button class="back" data-go="#/leyendas">‹ Leyendas</button>
    <div class="detail-head">
      ${pic(l.imagen, l.nombre, 'profile-art')}
      <button class="fav ${Fav.has(l.id) ? 'on' : ''}" data-fav="${l.id}" aria-label="Favorito" aria-pressed="${Fav.has(l.id)}">♥</button>
    </div>
    <div class="profile-title"><h1>${esc(l.nombre)}</h1><p>${esc(l.subtitulo)}</p></div>
    <div class="block b-green"><h2>📖 Su historia</h2><p>${esc(l.historia)}</p></div>
    <div class="block b-yellow"><h2>🌎 Origen de la leyenda</h2><p>${esc(l.origen)}</p></div>
    <div class="block"><h2>✨ Curiosidades</h2><ul>${l.curiosidades.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
    <div class="pager">
      <button data-go="#/leyenda/${prev.id}">‹ ${esc(prev.nombre)}</button>
      <button data-go="#/leyenda/${next.id}">${esc(next.nombre)} ›</button>
    </div>`;
}

function renderInfo() {
  const body = it => {
    switch (it.tipo) {
      case 'tabla': return `<table>${it.filas.map(f => `<tr><td>${esc(f[0])}</td><td>${esc(f[1])}</td></tr>`).join('')}</table>${it.nota ? `<p style="margin-top:10px;font-size:14px">${esc(it.nota)}</p>` : ''}`;
      case 'lista': return `<ul>${it.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
      case 'faq': return it.items.map(f => `<details class="faq"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
      case 'links': return `<div class="links">${it.links.map(l => `<a href="${esc(l.u)}" target="_blank" rel="noopener">${esc(l.t)}</a>`).join('')}</div>`;
      default: return '';
    }
  };
  $('#view-info').innerHTML = `
    <div class="page-head"><h1>Información</h1><p>Todo lo que necesitas para tu visita.</p></div>
    <div class="acc">
      ${CONFIG.info.map(it => `
        <div class="acc-item" data-acc="${it.id}">
          <button class="acc-btn" aria-expanded="false"><span class="ic">${it.icono}</span><span>${esc(it.titulo)}</span><span class="chev">⌄</span></button>
          <div class="acc-panel"><div><div class="acc-body">${body(it)}</div></div></div>
        </div>`).join('')}
    </div>`;
}

/* ----------------------------------------------------------
   4) Mapa con zoom y pan (pellizco, arrastre, rueda, botones)
   ---------------------------------------------------------- */
const MapView = (() => {
  const MIN = 1, MAX = 4;
  let vp, stage, s = 1, tx = 0, ty = 0, built = false;
  const ptrs = new Map();
  let lastDist = 0, lastMid = null, moved = 0, dragging = false;

  function build() {
    vp = $('#mapViewport'); stage = $('#mapStage');
    const a = CONFIG.assets.mapa;
    stage.innerHTML = pic(a.src, a.label, 'map-img') + CONFIG.zonas.map(z =>
      `<button class="hotspot" data-zona="${z.id}" style="left:${z.x}%;top:${z.y}%" aria-label="${z.num}. ${esc(z.nombre)}"></button>`).join('');
    $('#mapLegend').innerHTML = CONFIG.zonas.map(z => `<button class="chip" data-zona="${z.id}">${z.num}. ${esc(z.nombre)}</button>`).join('');

    vp.addEventListener('pointerdown', onDown);
    vp.addEventListener('pointermove', onMove);
    vp.addEventListener('pointerup', onUp);
    vp.addEventListener('pointercancel', onUp);
    vp.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.15 : 1 / 1.15); }, { passive: false });
    vp.addEventListener('click', e => { if (moved > 8) { e.stopPropagation(); e.preventDefault(); } }, true);
    $('#zoomIn').onclick = () => zoomAt(null, null, 1.5);
    $('#zoomOut').onclick = () => zoomAt(null, null, 1 / 1.5);
    $('#zoomReset').onclick = () => { s = 1; tx = ty = 0; apply(true); };
    built = true;
  }

  function clamp() {
    const w = vp.clientWidth, h = vp.clientHeight;
    const sw = stage.offsetWidth * s, sh = stage.offsetHeight * s;
    tx = sw <= w ? (w - sw) / 2 : Math.min(0, Math.max(w - sw, tx));
    ty = sh <= h ? (h - sh) / 2 : Math.min(0, Math.max(h - sh, ty));
  }
  function apply(animate) {
    clamp();
    stage.style.transition = animate ? 'transform .25s ease' : 'none';
    stage.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    stage.style.setProperty('--inv', (1 / s).toFixed(3));
  }
  function zoomAt(cx, cy, f) {
    const r = vp.getBoundingClientRect();
    const px = (cx ?? r.left + r.width / 2) - r.left, py = (cy ?? r.top + r.height / 2) - r.top;
    const ns = Math.min(MAX, Math.max(MIN, s * f)), k = ns / s;
    tx = px - (px - tx) * k; ty = py - (py - ty) * k; s = ns;
    apply(cx == null);
  }
  const dist = () => { const [a, b] = [...ptrs.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  const mid = () => { const [a, b] = [...ptrs.values()]; return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; };

  function onDown(e) {
    if (e.target.closest('.map-controls')) return;
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) { moved = 0; dragging = true; }
    if (ptrs.size === 2) { lastDist = dist(); lastMid = mid(); moved = 99; }
  }
  function onMove(e) {
    if (!ptrs.has(e.pointerId)) return;
    const p = ptrs.get(e.pointerId), dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (ptrs.size === 1 && dragging) {
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 8) { try { vp.setPointerCapture(e.pointerId); } catch (_) {} tx += dx; ty += dy; apply(); }
    } else if (ptrs.size === 2) {
      const d = dist(), m = mid();
      zoomAt(m.x, m.y, d / lastDist);
      tx += m.x - lastMid.x; ty += m.y - lastMid.y; apply();
      lastDist = d; lastMid = m;
    }
  }
  function onUp(e) {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) lastDist = 0;
    if (ptrs.size === 0) { dragging = false; setTimeout(() => { moved = 0; }, 0); }
  }

  return {
    show() { if (!built) build(); requestAnimationFrame(() => apply()); },
    focus(id) {
      const z = CONFIG.zonas.find(z => z.id === id); if (!z) return;
      s = 2; const w = vp.clientWidth, h = vp.clientHeight;
      tx = w / 2 - (z.x / 100) * stage.offsetWidth * s;
      ty = h / 2 - (z.y / 100) * stage.offsetHeight * s;
      apply(true);
    }
  };
})();

/* Ventana inferior de zona */
function openZona(id) {
  const z = CONFIG.zonas.find(z => z.id === id); if (!z) return;
  haptic();
  $('#sheetBody').innerHTML = `<span class="tag">${esc(z.tag || 'Zona')}</span><h2 id="sheetTitle">${esc(z.nombre)}</h2><p>${esc(z.desc)}</p>`;
  $('#sheet').hidden = false; $('#sheetBackdrop').hidden = false;
  $('#sheetClose').focus({ preventScroll: true });
}
function closeSheet() { $('#sheet').hidden = true; $('#sheetBackdrop').hidden = true; }

/* ----------------------------------------------------------
   5) Router (hash)
   ---------------------------------------------------------- */
const ROUTES = {
  inicio:   { view: 'inicio',   tab: 'inicio',   render: renderInicio },
  mapa:     { view: 'mapa',     tab: 'mapa',     render: () => MapView.show() },
  mascota:  { view: 'mascota',  tab: 'inicio',   render: renderMascota },
  leyendas: { view: 'leyendas', tab: 'leyendas', render: renderLeyendas },
  leyenda:  { view: 'leyenda',  tab: 'leyendas', render: (id) => renderLeyenda(id) },
  info:     { view: 'info',     tab: 'info',     render: renderInfo }
};
const scrollPos = {};
let currentView = null;

function route() {
  closeSheet();
  const [, name = 'inicio', arg] = (location.hash || '#/inicio').split('/');
  const r = ROUTES[name] || ROUTES.inicio;
  if (currentView) scrollPos[currentView] = $('#view-' + currentView).scrollTop;
  $$('.view').forEach(v => v.classList.remove('active'));
  const el = $('#view-' + r.view);
  r.render(arg);
  el.classList.add('active');
  currentView = r.view;
  el.style.scrollBehavior = 'auto';
  el.scrollTop = (name === 'leyenda' || name === 'mascota') ? 0 : (scrollPos[r.view] || 0);
  el.style.scrollBehavior = '';
  $$('.tabbar a').forEach(a => a.classList.toggle('active', a.dataset.tab === r.tab));
  document.title = 'Folcloria · ' + el.dataset.title;
  if (r.view === 'mapa') MapView.show();
}
window.addEventListener('hashchange', route);

/* ----------------------------------------------------------
   6) Eventos globales
   ---------------------------------------------------------- */
document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { haptic(); location.hash = go.dataset.go; return; }

  const fav = e.target.closest('[data-fav]');
  if (fav) {
    e.stopPropagation();
    const id = fav.dataset.fav, on = Fav.toggle(id), l = CONFIG.leyendas.find(l => l.id === id);
    haptic();
    toast(on ? `♥ ${l.nombre} guardado en favoritas` : `${l.nombre} quitado de favoritas`);
    const inList = $('#view-leyendas').classList.contains('active');
    if (inList) { const top = $('#view-leyendas').scrollTop; renderLeyendas(); $('#view-leyendas').scrollTop = top; }
    else { fav.classList.toggle('on', on); fav.setAttribute('aria-pressed', on); }
    return;
  }

  const card = e.target.closest('[data-legend]');
  if (card) { location.hash = '#/leyenda/' + card.dataset.legend; return; }

  const filt = e.target.closest('[data-filter]');
  if (filt) { legendFilterFav = filt.dataset.filter === 'fav'; renderLeyendas(); return; }

  const zona = e.target.closest('[data-zona]');
  if (zona) { if (zona.classList.contains('chip')) MapView.focus(zona.dataset.zona); openZona(zona.dataset.zona); return; }

  const acc = e.target.closest('.acc-btn');
  if (acc) {
    const item = acc.parentNode, open = item.classList.toggle('open');
    acc.setAttribute('aria-expanded', open); return;
  }
  if (e.target.closest('#sheetClose') || e.target.id === 'sheetBackdrop') closeSheet();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

/* Evitar zoom accidental de página en iOS (el mapa tiene su propio zoom) */
['gesturestart', 'gesturechange'].forEach(ev => document.addEventListener(ev, e => e.preventDefault()));

/* ----------------------------------------------------------
   7) PWA
   ---------------------------------------------------------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(() => {}));
}

if (!location.hash) location.hash = '#/inicio';
route();