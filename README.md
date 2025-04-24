# X Post Automator

A simple web-based application for automating X (Twitter) posts with scheduling capabilities.

## Features

- Create and schedule posts for X (Twitter)
- Edit and delete scheduled posts
- Simple and intuitive user interface
- Serverless deployment ready

## Prerequisites

- Node.js 18 or higher
- X (Twitter) Developer Account
- Twitter API v2 credentials

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/NaveenRagunathan/x-post-automation.git
   cd x-post-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser

## Deployment

### Netlify

1. Fork this repository
2. Create a new site on Netlify
3. Connect your forked repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
5. Add environment variables in Netlify dashboard
6. Deploy!

### Vercel

1. Fork this repository
2. Create a new project on Vercel
3. Import your forked repository
4. Configure environment variables
5. Deploy!

## Environment Variables Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new project and app
3. Generate API keys and tokens
4. Set up the required permissions:
   - Read and Write permissions
   - OAuth 1.0a authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository. 