export function getBaseUrl() {
  return `https://${process.env.VERCEL_URL}` || 'http://localhost:3000';
}
