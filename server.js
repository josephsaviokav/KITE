const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());

// JioSaavn API headers
const jioHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Referer': 'https://www.jiosaavn.com/',
  'Accept': 'application/json'
};

// Search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get('https://www.jiosaavn.com/api.php', {
      params: {
        __call: 'search.getResults',
        p: 1,
        q,
        _format: 'json',
        _marker: 0,
        ctx: 'web6dot0',
        n: 20
      },
      headers: jioHeaders
    });
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});


// Song decryption dependencies
const forge = require('node-forge');

// Helper to decrypt JioSaavn encrypted media URL
function createDownloadLink(encryptedMediaUrl) {
  if (!encryptedMediaUrl) return [];
  const qualities = [
    { id: "_12", bitrate: "12kbps" },
    { id: "_48", bitrate: "48kbps" },
    { id: "_96", bitrate: "96kbps" },
    { id: "_160", bitrate: "160kbps" },
    { id: "_320", bitrate: "320kbps" },
  ];
  const key = "38346591";
  const iv = "00000000";
  const encrypted = forge.util.decode64(encryptedMediaUrl);
  const decipher = forge.cipher.createDecipher("DES-ECB", forge.util.createBuffer(key));
  decipher.start({ iv: forge.util.createBuffer(iv) });
  decipher.update(forge.util.createBuffer(encrypted));
  decipher.finish();
  const decryptedLink = decipher.output.getBytes();
  return qualities.map(quality => ({
    quality: quality.bitrate,
    url: decryptedLink.replace("_96", quality.id),
  }));
}

// Helper to fetch and decrypt song URL
async function encurlfetch(id) {
  try {
    const result = await fetch(`https://www.jiosaavn.com/api.php?__call=song.getDetails&pids=${id}&api_version=4&_format=json&_marker=0&ctx=web6dot0`, {
      headers: {
        'User-Agent': jioHeaders['User-Agent'],
        'Referer': jioHeaders['Referer'],
        'Accept': 'application/json'
      }
    });
    if (!result.ok) {
      throw new Error('Error fetching enc url');
    } else {
      const data = await result.json();
      const play_link = createDownloadLink(data.songs[0].more_info.encrypted_media_url);
      return play_link[4]?.url;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Endpoint to get decrypted song URL
app.get('/getSong', async (req, res) => {
  const { id } = req.query;
  try {
    const decoded_url = await encurlfetch(id);
    res.send(decoded_url);
  } catch {
    res.status(500).send('Error Decrypting data');
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/search?q=shape`);
});