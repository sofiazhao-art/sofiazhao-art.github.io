# Sofia Zhao GitHub Pages Starter

A minimal static portfolio website for GitHub Pages.

## File structure

```text
.
├── index.html
├── works.html
├── statement.html
├── about.html
├── contact.html
└── assets
    ├── css/style.css
    ├── js/main.js
    ├── js/works-data.js
    └── works/
```

## How to add artworks

1. Put your artwork images in `assets/works/`.
2. Open `assets/js/works-data.js`.
3. Edit the artwork information:

```js
{
  title: "Untitled",
  year: "2026",
  medium: "Oil on canvas",
  size: "70 × 110 cm",
  series: "Third Series",
  image: "assets/works/my-image.jpg",
  featured: true,
  note: ""
}
```

## Recommended image size

For web use:

- Long edge: 1800–2400 px
- Format: JPG
- File size: ideally 1–3 MB
- Keep the original artwork ratio; do not force square crops.

## Publishing on GitHub Pages

1. Create a GitHub repository.
   - For a personal site, name it: `YOUR-USERNAME.github.io`
2. Upload all files from this folder.
3. Go to repository `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Choose branch `main`, folder `/root`, then Save.
7. Your site will publish at `https://YOUR-USERNAME.github.io/`.

## Notes

This first version is intentionally simple:
- No build tools
- No React
- No dependencies
- No backend
- Easy to edit by hand

It is a white-box room, not a machine room.
