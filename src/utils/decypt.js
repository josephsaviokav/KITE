export const decryptUrl = (encryptedUrl) => {
  // This is a simplified version - you'll need the actual decryption algorithm
  if (!encryptedUrl) return null;
  
  try {
    // Sample transformation - replace with actual decryption
    const decrypted = encryptedUrl
      .replace(/_96\.mp4$/, '_320.mp3')
      .replace(/_96_p\.mp4$/, '_320.mp3');
    
    return decrypted;
  } catch (err) {
    console.error('Decryption failed:', err);
    return null;
  }
};