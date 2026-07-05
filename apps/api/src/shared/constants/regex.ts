export const Regex = {
  EMAIL:
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

  OBJECT_ID:
    /^[a-f\d]{24}$/i,
};