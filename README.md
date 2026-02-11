# SQC Club Website

Official website project for **SQC (Super Quant Coders)**, a college tech club focused on coding, robotics, AI, and collaborative building.

## Overview
This project is a polished single-page-style multi-section website with animated page switching, glassmorphism UI, and a custom startup intro screen.

When someone opens the site:
1. A black "boot screen" appears.
2. Java code types in green (hacker-style), including:
   `System.out.println("Hello Coders");`
3. The main site fades in automatically.

## Tech Stack
- HTML5
- CSS3 (custom animations + glass UI)
- Vanilla JavaScript (no framework)

## Main Sections
- Home
- Projects (featured: **Chi-Chi**, SQC robotic dog)
- Events
- Team

## Key Features
- Startup typing animation screen (terminal style)
- Smooth page transitions between sections (fade + blur + slide)
- Pitch-black glass theme
- Neon tricolor animated SQC brand in navbar
- Interactive hover effects on cards and buttons
- Subtle 3D tilt effect on cards (desktop pointer devices)
- Responsive navigation menu for mobile
- Instagram CTAs linked to: `https://www.instagram.com/sqc_nitj/`

## Project Structure
```text
.
|-- index.html     # Site structure and sections
|-- style.css      # Visual styling, theme, transitions, animations
|-- main.js        # Navigation logic, transitions, intro typing, interactions
|-- chi.png        # Chi-Chi robotic dog image
```

## Run Locally
No build tools are required.

1. Open `index.html` directly in a browser.
2. If changes do not reflect immediately, hard refresh with `Ctrl + F5`.

## Customize Content
- Club text/content: edit `index.html`
- Colors, effects, layout tuning: edit `style.css`
- Navigation, animations, interactions: edit `main.js`
- Project image: replace/update `chi.png`

## Notes
This is a static frontend project and can be hosted on:
- GitHub Pages
- Netlify
- Vercel (static)
- Any basic web hosting that serves HTML/CSS/JS
