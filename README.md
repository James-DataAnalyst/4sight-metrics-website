# 4Sight Metrics — Elite HTML Website

A responsive, single-page business intelligence website built with plain HTML, CSS and JavaScript. No React, Next.js, build tool or package installation is required.

## Open the website

### Quick method

Double-click `index.html`.

### Recommended method in VS Code

1. Open this folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

## Where to edit content

Open `data/site-data.js`. It contains:

- technology tools
- service cards
- A Glimpse of Clarity slides
- Selected Work projects and filters
- testimonials
- footer social links

The layout is generated automatically from that data.

## Add a new Glimpse image

1. Put the PNG, JPG or WebP in `assets/images/glimpse/`.
2. Open `data/site-data.js`.
3. Copy one item inside the `glimpses` array.
4. Change the text and project ID.
5. Set the image field, for example:

```js
image: "assets/images/glimpse/my-new-dashboard.png"
```

## Add a new Selected Work project

1. Put the project image in `assets/images/projects/` if you have one.
2. Copy one object inside the `projects` array in `data/site-data.js`.
3. Give it a unique `id`.
4. Update its category, title, description, tags and metrics.
5. Add the project URL to `url` when available.
6. Leave `image` empty to use the built-in professional dashboard mockup, or add your image path.

## Important items to replace before launch

- Add verified client testimonials in `data/site-data.js`. Current testimonial entries are marked as demo companies.
- Add the real LinkedIn, Facebook, Instagram and X URLs under `socialLinks`.
- Add live portfolio/demo links under each project's `url`.
- Confirm the telephone, email, location and domain in `index.html`.
- Update `robots.txt`, `sitemap.xml`, canonical URL and structured data if the final domain changes.
- Connect the form to Formspree, Web3Forms, Netlify Forms or your own backend if you do not want the current email-app workflow.

## Publishing

Upload the contents of this folder to the root of your hosting account. It works with Netlify, Vercel static hosting, GitHub Pages, cPanel and most traditional web hosts.

## Main folders

```text
assets/brand/           Logo and favicon
assets/icons/           Tool and social icons
assets/images/glimpse/  Glimpse images you add
assets/images/projects/ Selected Work images you add
assets/vendor/          Local Lucide icon library
css/styles.css          Complete responsive design
data/site-data.js       Easy-to-edit website content
js/app.js               Interactions and rendering
```

