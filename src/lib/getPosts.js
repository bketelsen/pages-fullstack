export default async () => {
  let posts = await Promise.all(
    Object.entries(import.meta.glob("/src/routes/blog/*.md")).map(
      async ([path, page]) => {
        const { metadata } = await page();
        let pathComponents = path.split("/");
        const filename = pathComponents.pop();
        const slug = filename.split(".md", 1)[0];
        return {
          ...metadata,
          filename,
          slug,
          parsedDate: new Date(metadata.date),
        };
      }
    )
  );
  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return posts;
};
