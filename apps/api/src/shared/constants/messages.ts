export const Messages = {
  COMMON: {
    CREATED: "Resource created successfully.",
    UPDATED: "Resource updated successfully.",
    DELETED: "Resource deleted successfully.",
    FETCHED: "Data fetched successfully.",
    SUCCESS: "Operation completed successfully.",
    INTERNAL_SERVER_ERROR: "Something went wrong.",
  },

  AUTH: {
    REGISTER_SUCCESS: "User registered successfully.",
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",

    INVALID_CREDENTIALS: "Invalid email or password.",
    ACCESS_DENIED: "Access denied.",
    UNAUTHORIZED: "Unauthorized.",

    TOKEN_EXPIRED: "Token expired.",
    INVALID_TOKEN: "Invalid token.",
  },

  USER: {
    NOT_FOUND: "User not found.",
    ALREADY_EXISTS: "User already exists.",
  },

  PRODUCT: {
    NOT_FOUND: "Product not found.",
  },

  CART: {
    EMPTY: "Cart is empty.",
  },

  ORDER: {
    NOT_FOUND: "Order not found.",
  },
} as const;