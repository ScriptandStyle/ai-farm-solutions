const crypto = require('crypto');

function generateJWTSecret() {
  // Generate a random buffer of 64 bytes
  const buffer = crypto.randomBytes(64);
  
  // Convert the buffer to a base64 string
  const secret = buffer.toString('base64');
  
  return secret;
}

// Generate and display the secret key
const secretKey = generateJWTSecret();
console.log('Generated JWT Secret Key:');
console.log(secretKey);
console.log('\nCopy this key and paste it into your .env file as JWT_SECRET='); 