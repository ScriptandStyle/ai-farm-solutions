const crypto = require('crypto');

function generateSecrets() {
  // Generate JWT secret
  const jwtSecret = crypto.randomBytes(64).toString('base64');
  
  // Generate refresh token secret
  const refreshSecret = crypto.randomBytes(64).toString('base64');
  
  console.log('\nAdd these secrets to your .env file:\n');
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log(`REFRESH_TOKEN_SECRET=${refreshSecret}\n`);
}

generateSecrets(); 