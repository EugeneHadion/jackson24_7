# OAuth Authentication Library

A simple OAuth Authentication Library for Node.js applications.

## Installation

```bash
npm install oauth-authentication
```

## Usage

```javascript
const OAuthAuthentication = require('oauth-authentication');

const clientId = 'your-client-id';
const clientSecret = 'your-client-secret';
const redirectUri = 'https://your-redirect-uri.com';

const oauth = new OAuthAuthentication(clientId, clientSecret, redirectUri);

(async () => {
  try {
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
```

Replace `'your-client-id'`, `'your-client-secret'`, and `'https://your-redirect-uri.com'` with your actual OAuth client credentials and redirect URI. Make sure to handle the OAuth callback (authorization code exchange) appropriately in your application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
# jackson24_7
