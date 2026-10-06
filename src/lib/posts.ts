// Alle Beiträge aus src/content/vogelperspektiven/*.md, neueste zuerst.
// Neuer Beitrag = neue .md-Datei; der Dateiname wird zur URL.
type Frontmatter = { title: string; date: string | Date; image?: string; excerpt?: string };
type MdModule = {
  frontmatter: Frontmatter;
  rawContent: () => string;
  Content: any;
};

const files = import.meta.glob<MdModule>('../content/vogelperspektiven/*.md', { eager: true });

export const posts = Object.entries(files)
  .map(([path, mod]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const text = mod.rawContent().replace(/\s+/g, ' ').trim();
    return {
      slug,
      url: `/vogelperspektiven/${slug}`,
      title: mod.frontmatter.title,
      date: new Date(mod.frontmatter.date),
      image: mod.frontmatter.image,
      excerpt: mod.frontmatter.excerpt ?? text,
      Content: mod.Content,
    };
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());
