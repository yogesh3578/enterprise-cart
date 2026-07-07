export const getSort = (
  sortBy = "createdAt",
  order: "asc" | "desc" = "desc"
) => ({
  [sortBy]: order === "asc" ? 1 : -1,
});