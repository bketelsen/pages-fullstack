import azure from "svelte-adapter-azure-swa";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import footnotes from "remark-footnotes";
import headings from "remark-autolink-headings";
import unwrapImages from "remark-unwrap-images";
import slug from "remark-slug";
/** @type {import('@sveltejs/kit').Config} */

const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex({
      extensions: [".md"],
      layout: {
        blog: "./src/components/blog-post.svelte",
      },
      remarkPlugins: [footnotes, slug, headings, unwrapImages],
    }),
  ],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    adapter: azure(),
  },
};

export default config;
