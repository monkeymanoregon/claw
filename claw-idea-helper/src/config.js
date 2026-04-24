// config.js
const getApiUrl = () => {
  // Prefer RENDER_EXTERNAL_URL or fallback to localhost
  if (process.env.REACT_APP_API_URL) return process.env.REACT_APP_API_URL;
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:5001/api/idea'
    : 'https://<RENDER_SERVICE_URL>/api/idea'; // <-- update this after deploying backend
};

export default getApiUrl;
