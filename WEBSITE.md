# ALP Cabinet deployment

## Cloudflare Worker (current hosting)

Worker name: `alp-cabinet`. Production branch: `main`.

- Build command: none
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

`wrangler.jsonc` deploys the static website from the repository root. `.assetsignore` includes only the public HTML, styles, script, images, and Cloudflare header/redirect files. No backend entry point or build step is required.

Routes: `/`, `/services`, `/process`, `/about`, `/contact`. Each route has its own HTML document. HTML handling serves `.html` files at extensionless URLs; unknown routes use `404.html`. `/approach` redirects to `/process`. Old section links redirect through script.js.

## Updating

Push changes to `main`. In Cloudflare, check the Worker's build history for the new commit and deployment. If a build fails, open the build details and inspect its log. A successful GitHub commit alone does not confirm a successful Cloudflare deployment.

## Content

The business installs customer-supplied cabinets or provides cabinets as part of the installation project. Contact links open the phone app, WhatsApp, or an email draft. There is no contact form backend. The kitchen image is supplied business-card imagery labeled as inspiration.
