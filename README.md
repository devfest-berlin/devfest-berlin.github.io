# devfest-berlin.de

Landing and redirect page for [DevFest Berlin](https://devfest-berlin.de), hosted on GitHub Pages with no build step or external dependencies.

## Updating for a new edition

1. Update the target year/URL in `js/site.js` (`LATEST_DEVFEST_YEAR` and `DEVFEST_URL`).
2. Update the fallback URL in `index.html` (`<noscript>` `<meta http-equiv="refresh">` and `#redirect_link`).
3. Add a card for the previous edition under **Past Editions** in `index.html`.

## Local preview

```sh
python3 -m http.server
```

Then open <http://localhost:8000>.

## License

[MIT](LICENSE)
