const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topNav = document.getElementById("topNav");
const pageLinks = document.querySelectorAll("[data-page-link]");
const pages = document.querySelectorAll("[data-page]");
const buttons = document.querySelectorAll(".btn");
const bootScreen = document.getElementById("bootScreen");
const typingCode = document.getElementById("typingCode");

let isSwitchingPage = false;
let queuedPageId = null;

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

function updateActiveLinks(pageId) {
  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === pageId);
  });
}

function setActivePage(pageId) {
  const targetPage = Array.from(pages).find((page) => page.dataset.page === pageId);
  if (!targetPage) return;

  updateActiveLinks(pageId);

  if (navLinks) {
    navLinks.classList.remove("show");
  }

  const currentPage = document.querySelector(".view.active");

  if (!currentPage || currentPage === targetPage) {
    pages.forEach((page) => {
      if (page !== targetPage) {
        page.classList.remove("active", "view-enter", "view-enter-active", "view-leave");
      }
    });

    targetPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    runReveal();
    return;
  }

  if (isSwitchingPage) {
    queuedPageId = pageId;
    return;
  }

  isSwitchingPage = true;
  currentPage.classList.add("view-leave");

  targetPage.classList.add("active", "view-enter");
  window.requestAnimationFrame(() => {
    targetPage.classList.add("view-enter-active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  window.setTimeout(() => {
    currentPage.classList.remove("active", "view-leave");
    targetPage.classList.remove("view-enter", "view-enter-active");
    runReveal();

    isSwitchingPage = false;

    if (queuedPageId && queuedPageId !== pageId) {
      const nextPage = queuedPageId;
      queuedPageId = null;
      setActivePage(nextPage);
      return;
    }

    queuedPageId = null;
  }, 420);
}

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "").trim();
  const valid = ["home", "projects", "events", "team"];
  return valid.includes(hash) ? hash : "home";
}

function runBootSequence() {
  if (!bootScreen || !typingCode) return;

  const code = [
    "public class Main {",
    "    public static void main(String[] args) {",
    "        System.out.println(\"Hello Coders\");",
    "    }",
    "}"
  ].join("\n");

  let index = 0;
  typingCode.textContent = "";
  document.body.classList.add("intro-active");

  const typingTimer = window.setInterval(() => {
    typingCode.textContent = code.slice(0, index);
    index += 1;

    if (index > code.length) {
      window.clearInterval(typingTimer);

      window.setTimeout(() => {
        bootScreen.classList.add("done");
        document.body.classList.remove("intro-active");
      }, 700);
    }
  }, 34);

  window.setTimeout(() => {
    if (!bootScreen.classList.contains("done")) {
      bootScreen.classList.add("done");
      document.body.classList.remove("intro-active");
      window.clearInterval(typingTimer);
    }
  }, 10000);
}

function runReveal() {
  const active = document.querySelector(".view.active");
  if (!active) return;

  const revealNodes = active.querySelectorAll(".reveal");
  revealNodes.forEach((node, idx) => {
    node.classList.remove("show");
    window.setTimeout(() => node.classList.add("show"), 65 * (idx + 1));
  });
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.dataset.pageLink;
    if (!pageId) return;

    event.preventDefault();
    window.location.hash = pageId;
  });
});

window.addEventListener("hashchange", () => {
  setActivePage(getPageFromHash());
});

if (topNav && navLinks) {
  document.addEventListener("click", (event) => {
    if (!topNav.contains(event.target)) {
      navLinks.classList.remove("show");
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    button.style.setProperty("--mx", `${x}px`);
    button.style.setProperty("--my", `${y}px`);
  });
});

const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (supportsHover) {
  const cards = document.querySelectorAll(".interactive-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 8;

      card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      card.classList.add("tilt-active");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.classList.remove("tilt-active");
    });
  });
}

runBootSequence();
setActivePage(getPageFromHash());
