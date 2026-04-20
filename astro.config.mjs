import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    // Output about.html, team.html, etc. — matches original structure
    // and is compatible with Hostinger's Git-based deployment.
    format: 'file',
  },
  // If deploying to GitHub Pages with a repo sub-path, set:
  // base: '/your-repo-name',
  // For a custom domain (adld.center), leave base unset.
});
