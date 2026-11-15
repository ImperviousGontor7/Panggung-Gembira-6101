export const MESSAGE = Object.freeze({
  SUCCESS: "Success",
  ERROR: "Terjadi kesalahan",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  NOT_FOUND: "Data tidak ditemukan",
  VALIDATION_ERROR: "Validation error",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",

  AUTH: Object.freeze({
    REGISTER_SUCCESS: "Registrasi berhasil",
    LOGIN_SUCCESS: "Login berhasil",
    REFRESH_SUCCESS: "Refresh token berhasil",
    LOGOUT_SUCCESS: "Logout berhasil",
    INVALID_CREDENTIALS: "Email atau password salah",
    USER_DISABLED: "Akun tidak aktif",
    USER_NOT_FOUND: "User tidak ditemukan",
    UNAUTHORIZED: "Unauthorized",
    TOKEN_EXPIRED: "Token sudah kedaluwarsa",
    TOKEN_INVALID: "Token tidak valid",
    EMAIL_ALREADY_USED: "Email sudah digunakan",
    USERNAME_ALREADY_USED: "Username sudah digunakan",
  }),

  RATE_LIMIT: Object.freeze({
    DEFAULT: "Terlalu banyak request, coba lagi nanti",
    AUTH: "Terlalu banyak percobaan autentikasi, coba lagi nanti",
  }),

  UPLOAD: Object.freeze({
    IMAGE_ONLY: "File harus berupa gambar",
    FILE_TOO_LARGE: "Ukuran file melebihi batas",
    UPLOAD_SUCCESS: "Upload berhasil",
  }),
});

export default MESSAGE;