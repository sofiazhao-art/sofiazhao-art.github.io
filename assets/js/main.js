function workMeta(work) {
  return [work.year, work.medium, work.size].filter(Boolean).join(" · ");
}

function createWorkCard(work) {
  const article = document.createElement("article");
  article.className = "work-card";
  article.dataset.series = work.series || "";

  const button = document.createElement("button");
  button.className = "work-button";
  button.type = "button";

  const imageWrap = document.createElement("div");
  imageWrap.className = "work-image-wrap";

  if (work.image) {
    const img = document.createElement("img");
    img.src = work.image;
    img.alt = `${work.title || "Untitled"}, ${work.year || ""}`;
    img.loading = "lazy";
    imageWrap.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.textContent = "Add image path in works-data.js";
    imageWrap.appendChild(placeholder);
  }

  const meta = document.createElement("div");
  meta.className = "work-meta";

  const title = document.createElement("h3");
  title.textContent = work.title || "Untitled";

  const details = document.createElement("p");
  details.textContent = workMeta(work);

  const series = document.createElement("p");
  series.textContent = work.series || "";

  meta.appendChild(title);
  meta.appendChild(details);
  if (work.series) meta.appendChild(series);

  button.appendChild(imageWrap);
  button.appendChild(meta);

  button.addEventListener("click", () => openWorkDialog(work));

  article.appendChild(button);
  return article;
}

function renderWorks(containerId, works) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  works.forEach((work) => container.appendChild(createWorkCard(work)));
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  const grid = document.getElementById("works-grid");
  const introText = document.getElementById("series-intro-text");

  const seriesIntros = {
    all: "Selected works across painting, mixed media, and works on paper.",
    "Third Series": "This series explores bodily fragments, emotional pressure, unstable inner structures, and the tension between figuration and abstraction.",
    "Venus in the Cave": "This series centers on enclosure, intimacy, bodily space, and the ambiguous relationship between protection, desire, and pressure.",
    "Cat Room": "This series uses the cat, the room, the chair, and the window as symbolic structures through which vulnerability, interiority, and containment are explored.",
    Studies: "Studies, experiments, and works on paper that trace the development of form, color, gesture, and visual language."
  };

  function setSeriesIntro(filter) {
    if (!introText) return;
    introText.textContent = seriesIntros[filter] || seriesIntros.all;
  }

  if (!buttons.length || !grid || !window.WORKS) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      const filteredWorks = filter === "all"
        ? window.WORKS
        : window.WORKS.filter((work) => work.series === filter);

      setSeriesIntro(filter);
      renderWorks("works-grid", filteredWorks);
    });
  });

  setSeriesIntro("all");
}

function openWorkDialog(work) {
  const dialog = document.getElementById("work-dialog");
  if (!dialog) return;

  const image = document.getElementById("dialog-image");
  const title = document.getElementById("dialog-title");
  const meta = document.getElementById("dialog-meta");
  const note = document.getElementById("dialog-note");

  image.src = work.image || "";
  image.alt = `${work.title || "Untitled"}, ${work.year || ""}`;
  image.style.display = work.image ? "block" : "none";
  title.textContent = work.title || "Untitled";
  meta.textContent = workMeta(work);
  note.textContent = work.note || "";

  dialog.showModal();
}

function setupDialog() {
  const dialog = document.getElementById("work-dialog");
  const closeButton = document.querySelector(".dialog-close");
  if (!dialog || !closeButton) return;

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function setupNav() {
  const button = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  setupNav();

  if (window.WORKS) {
    renderWorks("works-grid", window.WORKS);
    renderWorks("featured-grid", window.WORKS.filter((work) => work.featured).slice(0, 6));
    setupFilters();
    setupDialog();
  }
});