import rss from '@astrojs/rss';
import type { AstroGlobal } from 'astro';
import { getCollection } from 'astro:content';

export async function GET({ site }: AstroGlobal) {
  if (!site) {
    return new Response('Site not found', { status: 404 });
  }

  let posts = (await getCollection("posts")).sort((a, b) => {
    return b.data.published.getTime() - a.data.published.getTime();
  });

  // TODO: Add full post content
  // Will need to update Astro and use a similar approach to https://blog.damato.design/posts/astro-rss-mdx/
  // OR update everything to use plain markdown, and only use MDX for special circumstances
  // (with a note that parts of this posts won't look correct on other readers)

  return rss({
    title: 'Michael Savchuk',
    description: 'I’m a Full-Stack Developer with a background in design. And these are my latest thoughts.',
    site: site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/posts/${post.slug}`,
      pubDate: post.data.published,
    })),
  });
}
