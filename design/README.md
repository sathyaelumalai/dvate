# Design sources

`og-image.html` is the source for `public/og-image.png`, the 1200 by 630 image shown when a page is shared. It uses the site's palette and self-hosted fonts from `node_modules`, so run `npm install` first.

To export it again after a change:

1. Open `design/og-image.html` in Chrome.
2. Open DevTools, turn on the device toolbar and set the size to 1200 by 630.
3. Open the command menu (Cmd+Shift+P), run "Capture screenshot" and save the file as `public/og-image.png`.
