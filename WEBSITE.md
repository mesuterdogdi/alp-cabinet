# Website structure

The site uses separate static HTML documents. Cloudflare Pages serves these at extensionless URLs:

| URL | Source |
| --- | --- |
| / | index.html |
| /services | services.html |
| /process | process.html |
| /about | about.html |
| /contact | contact.html |

No framework, build command, or environment variables are needed. Keep the Cloudflare Pages build output directory set to the repository root (`/`). A top-level `404.html` handles unknown routes instead of showing the home page. `_redirects` redirects /approach to /process. Legacy home-page section links are redirected by script.js.

For local previews, use a static server with extensionless HTML support. Python's basic http.server can preview /services.html and the other .html files, but does not resolve /services automatically.

Shared assets: styles.css, script.js, logo.png, business-card.jpeg. Each HTML document includes its navigation and footer, so content and links work without JavaScript. JavaScript enables the mobile menu and redirects old section links.

The business provides cabinet installation. Customers may supply cabinets, or ALP Cabinet may provide them as part of the project. No online cabinet store is included. Contact links open the phone app, WhatsApp, or an email draft; there is no form backend.

The kitchen visual comes from the supplied business card, is cropped with CSS, and is labeled inspiration. It is not presented as completed work.
