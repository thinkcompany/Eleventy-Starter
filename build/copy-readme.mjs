import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source = join(__dirname, '..', 'README.md');
const destination = join(__dirname, '..', 'src', 'README.md');

const readmeContent = readFileSync(source, 'utf-8');

// Add front matter data so it renders as a page
const frontMatter = `---
  layout: layouts/base.html
  pageTitle: README the page
  eleventyNavigation:
    key: readme
    title: README
    order: 3
---
`;

const outputContent = `${frontMatter}\n${readmeContent}`;

writeFileSync(destination, outputContent);

console.log('README.md copied to /src directory with front matter');
