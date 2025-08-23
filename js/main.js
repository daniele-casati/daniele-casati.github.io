(() => {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const tabWrapper = $("#fh5co-main");
  const isCoarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;
  function setContainerHeight() {
    const currentTab = $(".fh5co-tab-content.active");
    if (!currentTab || !tabWrapper) return;

    const extraHeight = isCoarsePointer ? 50 : 0;
    const targetHeight = currentTab.getBoundingClientRect().height + extraHeight;

    if (!tabWrapper.style.transition) tabWrapper.style.transition = "height 300ms ease";
    tabWrapper.style.height = `${targetHeight}px`;
  }

  let isAnimating = false;
  function switchTab(anchor) {
    if (isAnimating) return;

    const tabId = anchor.getAttribute("data-tab");
    if (!tabId) return;

    const currentTab = $(".fh5co-tab-content.active");
    const nextTab = $(`.fh5co-tab-content[data-content="${tabId}"]`);
    if (!nextTab || currentTab === nextTab) return;

    $$(".fh5co-tab-menu li").forEach(listItem =>
      listItem.classList.remove("active")
    );
    anchor.closest("li")?.classList.add("active");

    isAnimating = true;
    currentTab.classList.remove("animated", "fadeInUp");

    const onOutEnd = (event) => {
      if (event.target !== currentTab) return;
      currentTab.removeEventListener("animationend", onOutEnd);
      currentTab.classList.remove("active", "animated", "fadeOutDown");

      nextTab.classList.add("active", "animated", "fadeInUp");
      setContainerHeight();

      nextTab.addEventListener("animationend", () => {
        nextTab.classList.remove("animated", "fadeInUp");
        isAnimating = false;
      }, { once: true });
    };

    currentTab.addEventListener("animationend", onOutEnd);
    requestAnimationFrame(() => {
      currentTab.classList.add("animated", "fadeOutDown");
    });
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setContainerHeight, 150);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setContainerHeight();

    document.addEventListener("click", (event) => {
      const anchor = event.target.closest(".fh5co-tab-menu a");
      if (!anchor) return;
      event.preventDefault();
      switchTab(anchor);
    });

    window.addEventListener("resize", onResize);
  });
})();