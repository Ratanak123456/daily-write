export const buildCreateBlogPayload = ({
  title,
  thumbnail,
  status,
  blogCategory,
  content,
}) => ({
  title: title.trim(),
  thumbnail,
  status,
  blogCategory: blogCategory.trim(),
  content,
});
