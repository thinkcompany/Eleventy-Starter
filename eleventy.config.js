/*
	Eleventy config
	https://www.11ty.dev/docs/config/
*/

import { browserslistToTargets, transform } from 'lightningcss';
import * as sass from 'sass';
import path from 'path';
import browserslist from 'browserslist';
import esbuild from 'esbuild';

export default (eleventyConfig) => {
	// make sure Eleventy knows to process file types with addTemplateFormats
  eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addTemplateFormats("js");
	eleventyConfig.addTemplateFormats("json");
	eleventyConfig.addTemplateFormats("svg");

	/*
		addPassthroughCopy tells Eleventy to copy files or directories to the output folder
		addPassthroughCopy can take a directory, file, or glob pattern
	*/
  eleventyConfig.addPassthroughCopy("src/assets/js/fontfaceobserver.standalone.js");

	/*
		CSS processing
		Transpile with Lightning CSS https://lightningcss.dev/
		Read more about CSS and Lightning https://11ty.rocks/posts/process-css-with-lightningcss/
	*/
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);

			if (parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || "."],
				sourceMap: false,
			});

			// Allow included files from @use or @import to
			this.addDependencies(inputPath, result.loadedUrls);

			let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

			return async () => {
				let { code } = transform({
					filename: 'style.css',
          entryPoints: [path],
					code: Buffer.from(result.css),
					minify: true,
					sourceMap: false,
					targets,
				});
				return code;
			};
		},
	});

	// JavaScript compilation
  eleventyConfig.addExtension('js', {
		outputFileExtension: 'js',
		compile: async (content, path) => {
			if (path !== './src/assets/js/index.js') {
				return;
			}

			return async () => {
				let output = await esbuild.build({
					target: 'es2020',
					entryPoints: [path],
					minify: true,
					bundle: true,
					write: false,
				});

				return output.outputFiles[0].text;
			}
		}
	});

	eleventyConfig.on("eleventy.before", ({ runMode }) => {
		// Set the environment variable
		if (runMode === "serve" || runMode === "watch") {
			process.env.BUILD_DRAFTS = true;
		}
	});

	/*
		Watch targets
		By default Eleventy will watch for template changes, but depending on your configuration additional watch targets may be necessary
		Run `npm run debug` to view current watch targets
	*/
	eleventyConfig.addWatchTarget("src/assets/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addWatchTarget("/src/assets/css/*.scss");
	eleventyConfig.addWatchTarget("/src/assets/js/*.js");

	/*
		Other config options
		Make changes to default directory structure
		See this post for a deeper look into directory architecture https://www.njfamirm.ir/en/blog/eleventy-folder-structure-guide/
		Specify template engine options
		https://www.11ty.dev/docs/languages/
	*/

  return {
    dir: {
      input: "src",
      output: "dist",
			includes: "_includes",
    },
		templateFormats: [ "md", "njk", "html", "liquid"],
		markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk", // Allows us to use Nunjucks in HTML files
    dataTemplateEngine: "njk",
  };
}