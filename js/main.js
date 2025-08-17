(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

  const main = $("#fh5co-main");
  const TAB_MENU_LINKS = $$(".fh5co-tab-menu a");

  function setContainerHeight() {
    const active = $(".fh5co-tab-content.active");
    if (!active || !main) return;
    const extra = isMobile ? 50 : 0;
    const target = active.getBoundingClientRect().height + extra;
    if (!main.style.transition) main.style.transition = "height 300ms ease";
    main.style.height = `${target}px`;
  }

  function switchTab(link) {
    const tab = link.getAttribute("data-tab");
    if (!tab) return;

    $$(".fh5co-tab-menu li").forEach(li => li.classList.remove("active"));
    link.closest("li")?.classList.add("active");

    const current = $(".fh5co-tab-content.active");
    const next = $(`.fh5co-tab-content[data-content="${tab}"]`);
    if (!next || current === next) return;

    current.classList.add("animated", "fadeOutDown");

    setTimeout(() => {
      current.classList.remove("active", "animated", "fadeOutDown", "fadeInUp");
      next.classList.add("animated", "fadeInUp", "active");
      setContainerHeight();
      setTimeout(() => next.classList.remove("animated", "fadeInUp"), 500);
    }, 500);
  }

  function onResize() {
    clearTimeout(onResize._t);
    onResize._t = setTimeout(setContainerHeight, 150);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setContainerHeight();

    TAB_MENU_LINKS.forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        switchTab(a);
      });
    });

    window.addEventListener("resize", onResize, { passive: true });
  });
})();