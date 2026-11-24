{
  const R = window.REGIONES || [];
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const burger = document.querySelector(".burger"), nav = document.querySelector(".top nav");
  burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  $("grid").innerHTML = R.map((r, i) => `
    <button class="card" data-i="${i}">
      <img src="${r.img}" alt="Mapa de la región ${esc(r.nombre)}" loading="lazy">
      <div class="meta"><div class="code">${esc(r.code)}</div><h3>${esc(r.nombre)}</h3></div>
    </button>`).join("");

  const dlg = $("ficha-region"); let idx = 0;
  function show() {
    const r = R[idx];
    $("fx-img").src = r.img; $("fx-img").alt = "Mapa de la región " + r.nombre;
    $("fx-code").textContent = `Región ${r.code} · ${idx + 1} de ${R.length}`;
    $("fx-name").textContent = r.nombre;
    $("fx-secs").innerHTML = r.secs.map(s => `${s.sub ? `<h4>${esc(s.sub)}</h4>` : ""}<p>${esc(s.desc)}</p><p class="hay"><b>Puedes encontrar</b> · ${esc(s.hay)}</p>`).join("");
    dlg.scrollTop = 0;
  }
  $("grid").addEventListener("click", e => { const b = e.target.closest(".card"); if (!b) return; idx = +b.dataset.i; show(); dlg.showModal(); });
  dlg.querySelector(".close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  $("fx-prev").addEventListener("click", () => { idx = (idx - 1 + R.length) % R.length; show(); });
  $("fx-next").addEventListener("click", () => { idx = (idx + 1) % R.length; show(); });
  document.addEventListener("keydown", e => { if (!dlg.open) return; if (e.key === "ArrowRight") $("fx-next").click(); if (e.key === "ArrowLeft") $("fx-prev").click(); });
}
