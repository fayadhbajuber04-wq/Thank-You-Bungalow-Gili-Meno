# Thank You Bungalow — English Landing Page (Updated)

I've updated the landing page with the assets and links you provided.

What I changed
- Replaced Booking.com default link with your link: https://www.booking.com/Share-JnSLK2d
- Replaced Google Maps short link with your link: https://maps.app.goo.gl/xa4MRGkRWWut2dhQ7 (used in the embedded iframe and the "open in Google Maps" anchor)
- Updated the contact email (bottom and contact section) to: thankyougilimeno@gmail.com
- The page expects the three images you provided to be placed in `assets/images/` with the exact filenames:
  - `sunset.jpg` (Image 1)
  - `sunrise.jpg` (Image 2)
  - `moon.jpg` (Image 3)

Files included
- `index.html` — main page (English) — updated with your Booking/Maps/email.
- `assets/css/styles.css` — styling (no change, included for completeness).
- `assets/js/main.js` — interactive behavior; DEFAULT_BOOKING updated to your Booking.com share link.
- `assets/images/` — place your three photos here as noted above.

Deploy instructions (quick)
1. Create or open a GitHub repository (example: `thank-you-bungalow`) and clone:
   git clone git@github.com:<your-username>/thank-you-bungalow.git
   cd thank-you-bungalow
2. Copy the files from this template into the repo folder.
3. Add your images (you already provided them) to `assets/images/`:
   - `assets/images/sunset.jpg`
   - `assets/images/sunrise.jpg`
   - `assets/images/moon.jpg`
4. Commit & push:
   git add .
   git commit -m "Add updated landing page with provided images and links"
   git push origin main
5. Enable GitHub Pages in repository Settings → Pages → select branch `main` and root `/` → Save.

Notes & next steps
- I used the image filenames you mentioned. If your images have different extensions (e.g., .png) rename them to `.jpg` or update the `src` in `index.html`/`main.js`.
- If you want me to push these files to a GitHub repo for you, provide the repo in `owner/repo` format and confirm; I'll ask for any additional required details.
- If you'd like per-room Booking.com URLs (different links for each room), send those links and I will wire them so each "Book" button opens the correct room page.

Thank you — the page is now ready to be added to your GitHub Pages site with the images and links you supplied.