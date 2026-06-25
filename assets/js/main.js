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

function updateSeriesIntro(filter) {
  const introText = document.getElementById("series-intro-text");
  if (!introText || !window.SERIES_INTROS) return;

  introText.textContent = window.SERIES_INTROS[filter] || "";
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  const grid = document.getElementById("works-grid");
  if (!buttons.length || !grid) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      const filteredWorks = filter === "all"
        ? window.WORKS
        : window.WORKS.filter((work) => work.series === filter);

      updateSeriesIntro(filter);
      renderWorks("works-grid", filteredWorks);
    });
  });

  updateSeriesIntro("all");
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
