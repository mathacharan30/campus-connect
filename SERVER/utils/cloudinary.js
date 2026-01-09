const cloudinary = require('cloudinary').v2;

// Expect environment variables to be set:
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Lightweight connectivity check for Cloudinary Admin API
// Returns: { ok: boolean, data?: any, error?: string }
cloudinary.checkConnection = async () => {
  const required = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    return { ok: false, error: `Missing env vars: ${missing.join(', ')}` };
  }
  try {
    const data = await new Promise((resolve, reject) => {
      cloudinary.api.ping((err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err && err.message ? err.message : String(err) };
  }
};

module.exports = cloudinary;
