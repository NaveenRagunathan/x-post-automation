# X Post Automation Tool

A simple web-based application for automating posts to X (formerly Twitter). This tool allows users to schedule pre-written posts and generate/schedule posts based on provided topics.

## Features

- Schedule pre-written tweets
- Generate and schedule tweets based on topics
- View, edit, and delete scheduled posts
- Simple web interface for managing posts
- Uses X API Free tier

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your X API credentials:
   ```
   X_API_KEY=your_api_key
   X_API_SECRET=your_api_secret
   X_ACCESS_TOKEN=your_access_token
   X_ACCESS_TOKEN_SECRET=your_access_token_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:3000`

## Project Structure

```
x-post-automator/
├── public/           # Static files (HTML, CSS, JS)
├── src/
│   ├── controllers/  # Route controllers
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
├── .env              # Environment variables
├── package.json      # Project dependencies
└── server.js         # Main application file
```

## API Documentation

### Endpoints

- `POST /api/posts` - Create a new scheduled post
- `GET /api/posts` - Get all scheduled posts
- `PUT /api/posts/:id` - Update a scheduled post
- `DELETE /api/posts/:id` - Delete a scheduled post

## License

ISC 