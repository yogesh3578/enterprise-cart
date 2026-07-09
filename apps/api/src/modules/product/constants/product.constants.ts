export const PRODUCT_SEARCHABLE_FIELDS = [
  "name",
  "description",
  "sku",
  "barcode",
] as const;

export const PRODUCT_FILTERABLE_FIELDS = [
  "search",
  "category",
  "isFeatured",
  "isActive",
] as const;

export const PRODUCT_SORTABLE_FIELDS = [
  "name",
  "sellingPrice",
  "costPrice",
  "stock",
  "createdAt",
] as const;