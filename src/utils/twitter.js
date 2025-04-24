const { TwitterApi } = require('twitter-api-v2');

// Initialize Twitter client
const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

// Get the Read/Write part of the client
const rwClient = client.readWrite;

/**
 * Post a tweet using the X API
 * @param {string} text - The content of the tweet
 * @returns {Promise<Object|null>} - The posted tweet data or null if failed
 */
async function postTweet(text) {
    if (!text || text.length === 0) {
        console.error("Error: Tweet text is empty.");
        return null;
    }

    if (text.length > 280) {
        console.warn("Warning: Tweet text exceeds 280 characters and will be truncated by X API.");
    }

    try {
        console.log(`Attempting to post tweet: "${text}"`);
        const { data: tweet } = await rwClient.v2.tweet(text);
        console.log("Tweet posted successfully:", tweet);
        return tweet;
    } catch (error) {
        console.error("Error posting tweet:", error);
        return null;
    }
}

module.exports = {
    postTweet
}; 