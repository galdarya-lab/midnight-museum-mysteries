# GitHub Pages

The existing game is deployed from the `main` branch of
`https://github.com/galdarya-lab/midnight-museum-mysteries`.

The game URL is `https://galdarya-lab.github.io/midnight-museum-mysteries/`.

`.github/workflows/pages.yml` installs the locked dependencies, builds the game
with its repository base path, and deploys `dist` using GitHub Pages. Future
pushes to `main` publish automatically. The repository is public so it can use
public GitHub Pages hosting.

`src/main.tsx` resolves image paths through Vite's `BASE_URL`. Ordinary local
builds (`npm run build`, `START_GAME.cmd`) still work at `/`. A Pages build is:

```text
npm run build -- --base=/midnight-museum-mysteries/
```

The game keeps progress in browser storage. The GitHub Pages address has its
own saved progress, separate from the local address and the Sites address.

GitHub's hosting setup follows the official Vite deployment instructions:
https://vite.dev/guide/static-deploy.html#github-pages
