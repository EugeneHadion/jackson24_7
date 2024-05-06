// oauth-authentication.js

const axios = require('axios');

class OAuthAuthentication {
  constructor(clientId, clientSecret, redirectUri) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.accessToken = null;
  }

  async authenticate(code) {
    try {
      const response = await axios.post('https://oauth.provider.com/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        code: code,
        grant_type: 'authorization_code'
      });

      this.accessToken = response.data.access_token;
      return this.accessToken;
    } catch (error) {
      console.error('Error authenticating:', error.response.data);
      throw new Error('Authentication failed');
    }
  }

  async getUserInfo() {
    if (!this.accessToken) {
      throw new Error('Access token not available. Please authenticate first.');
    }

    try {
      const response = await axios.get('https://oauth.provider.com/userinfo', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error.response.data);
      throw new Error('Failed to fetch user info');
    }
  }
}

module.exports = OAuthAuthentication;

// Example usage:
(async () => {
  try {
    const OAuthAuthentication = require('./oauth-authentication');

    const clientId = 'your-client-id';
    const clientSecret = 'your-client-secret';
    const redirectUri = 'https://your-redirect-uri.com';

    const oauth = new OAuthAuthentication(clientId, clientSecret, redirectUri);

    // Step 1: Get authorization code from OAuth provider (e.g., through a redirect)
    const code = 'authorization-code-from-provider';

    // Step 2: Authenticate using the authorization code
    await oauth.authenticate(code);

    // Step 3: Fetch user info
    const userInfo = await oauth.getUserInfo();
    console.log('User Info:', userInfo);
  } catch (error) {
    console.error('Authentication failed:', error.message);
  }
})();
