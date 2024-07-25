---
  layout: layouts/base.html
  pageTitle: README the page
  eleventyNavigation:
    key: readme
    title: README
    order: 3
---

# Think Company Eleventy Starter

A minimal Eleventy starter repo:
- Sass to CSS processing
- CSS transpiled by Lightning CSS
- Javascript bundled and minified by esbuild
- Simple blog functionality

This project uses a canary version of Eleventy for [ESM support](https://equk.co.uk/2023/12/29/11ty-ecmascript-modules-support/). For anything client related consider using the latest stable build (2.0.x).

## Table of Contents

- [Getting Started](#getting-started)
- [Key Concepts](#key-concepts)
- [Other things to know](#other-things-to-know)
- [Other Resources](#other-resources)

---
## Getting Started

1. Make a directory and go there

```bash
mkdir my-cool-site
cd my-cool-site
```

2. Clone this repository

```bash
git clone [REPO URL GOES HERE].
```

3. Install dependencies

```bash
npm install
```

4. Run Eleventy

Generate a production-ready build to the `dist` folder:

```bash
npm run build
```

Or build and spin up a local dev server:

```bash
npm run dev
```
---


## Key Concepts

### Templates
Files that define the structure and layout of your project

**Key Template Features:**

Layouts
: Layouts in Eleventy are special templates used to wrap other content. In the context of this project, `_includes/layouts/base.html` is the main layout as it contains the "outer shell" HTML markup.
```

<!doctype html>
  <html lang="{{ metadata.language }}">
    ...
      <main class="site-main">
        {{ content | safe }}
      </main>
    ...
  </html>
```

Data Binding and the Data Cascade
: Templates can output data from multiple sources, and is merged in order of priority:
1. [Computed Data](https://www.11ty.dev/docs/data-computed/) is processed at the end of the data cascade. Can be used to centralize repeated data. See how draft post functionality has been enabled in `eleventy.config.js` - search for "Computed Data"
2. [Front matter data](https://www.11ty.dev/docs/data-frontmatter/) in a template
3. [Template specifc data](https://www.11ty.dev/docs/data-template-dir/) files, for ex; a js or json file residing in /src/pagename/
4. [Directory data](https://www.11ty.dev/docs/data-template-dir/) files
5. [Front matter data in Layouts](https://www.11ty.dev/docs/layouts/#front-matter-data-in-layouts)
6. [Global config api data](https://www.11ty.dev/docs/data-global-custom/)
7. [Global data files](https://www.11ty.dev/docs/data-global/) are exposed to every Template. See how `_data/metadata.json` is used in `_includes/layouts/base.html`

Basic Project Setup
: Out of the box, Eleventy provides a simple project structure...
```
├── .            # Main input directory (root of your project)
├── _data        # Global data files
├── _includes    # Template parts and layouts
└── _site        # Output directory for the built website
```

but it is entirely configurable. The structure of this project has been modified (see the return statement in `eleventy.config.js`)
```
return {
  dir: {
    input: "src",
    output: "dist",
    includes: "_includes",
  },
  ...
};
```

Collections
: Groups of content that can be output in templates. Declaring a Collection in `eleventy.config.js` enables a directory to be used as a collection. Otherwise, the collection must be declared in the front matter of each file using the keyword "tags".

Tags
: Tags in Eleventy are not really taxonomy tags (but can be used as such)
```
layout: layouts/base.html
tags: tutorial
```


Front matter
: Meta data at the top of templates used for Eleventy specific configuration, for ex, defining a layout or permalink. Can also be used for project specifics like an SEO description, setting a variable to display conditional content, looping through items, or simply outputting some text.
```
---
layout: layouts/base.html
metaDescription: Please crawl my site
pageTitle: Why does this this site exist?
eleventyNavigation:
  key: about
  title: About
  order: 1
customBoolean: false
---

<h2>{{ pageTitle }}</h2>
{%- if customBoolean -%}
  <p>Conditional content</p>
{%- endif -%}

```

```
---
fruits:
  - Orange
  - Apple
  - Banana
  - Strawberry
---

<ul class="fruits">
  {%- for fruit in fruits -%}
    <li>{{ fruit }}</li>
  {%- endfor -%}
</ul>
```

Filters
: Filters allow you to do stuff to content and output it in templates. Add filters in `eleventy.config.js`.
```
// eleventy.config.js
eleventyConfig.addAsyncFilter("makeUppercase", async (value) => `${value.toUpperCase()}`);

// Usage
{{ "Hello, World!" | makeUppercase }}
```

Shortcodes
: Output reusable content in templates. Fetch data with [async shortcodes](https://davidea.st/articles/11ty-tips-i-wish-i-knew-from-the-start/#6-async-shortcodes-are-for-dynamic-data-fetching)
```
// eleventy.config.js
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
// Usage: {% year %}
```
---

# Other Things to Know
**Official Plugins**
[Plugins](https://www.11ty.dev/docs/plugins/) are custom code that Eleventy imports into the project. Official plugins are prefixed with `@11ty/` on NPM. The navigation in this repo is using the `'@11ty/eleventy-navigation'` plugin.

**Debugging**
`npm run debug` executes `DEBUG=Eleventy* npx @11ty/eleventy`

**Supplied Data**
Eleventy comes with data values that can be useful for debugging, or for use in a template. Use the `log` utility to view data in the console Data objects are `pkg`, `page`, `pagination`, `collections`, and `eleventy`. Usage "pkg | log"

**Demo build step**
The *source of truth* README lives in the root, as expected. `npm run copy-readme` copies that readme file into the `src/` directory as a markdown file, and adds front matter data so the page will render in the navigation.

This build step is combined with `npm run build` in `package.json`.

```bash
npm run copy-readme
```
---
---

## Resources
**Eleventy Resources**
[Template](https://www.11ty.dev/docs/templates/)
[Data](https://www.11ty.dev/docs/data/)
[Filters](https://www.11ty.dev/docs/filters/)
[Shortcodes](https://www.11ty.dev/docs/shortcodes/)
[Collections](https://www.11ty.dev/docs/collections/)
[Github](https://github.com/11ty/eleventy)
[Debugging in Eleventy](https://www.11ty.dev/docs/debugging/)
[Eleventy Supplied Data](https://www.11ty.dev/docs/data-eleventy-supplied/)


**11ty Community**
[11ty Rocks!](https://11ty.rocks)
[Architecting data in Eleventy](https://sia.codes/posts/architecting-data-in-eleventy/)
[Templating in Eleventy](https://cloudcannon.com/tutorials/eleventy-beginner-tutorial/templating-in-eleventy/)
[I Finally Understand Eleventy's Data Cascade](https://benmyers.dev/blog/eleventy-data-cascade/)

[Deploy to Netlify](https://docs.netlify.com/frameworks/eleventy/)