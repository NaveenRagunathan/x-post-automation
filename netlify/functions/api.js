const { postController } = require('../../src/controllers/postController');

exports.handler = async (event, context) => {
    // Parse the request body
    const body = event.body ? JSON.parse(event.body) : {};
    
    // Handle different HTTP methods
    switch (event.httpMethod) {
        case 'GET':
            return await handleGet();
        case 'POST':
            return await handlePost(body);
        case 'PUT':
            return await handlePut(event.path.split('/').pop(), body);
        case 'DELETE':
            return await handleDelete(event.path.split('/').pop());
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ error: 'Method not allowed' })
            };
    }
};

async function handleGet() {
    try {
        const posts = await postController.getPosts();
        return {
            statusCode: 200,
            body: JSON.stringify(posts)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to get posts' })
        };
    }
}

async function handlePost(body) {
    try {
        const result = await postController.createPost({ body });
        return {
            statusCode: 201,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create post' })
        };
    }
}

async function handlePut(id, body) {
    try {
        const result = await postController.updatePost({ params: { id }, body });
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update post' })
        };
    }
}

async function handleDelete(id) {
    try {
        const result = await postController.deletePost({ params: { id } });
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to delete post' })
        };
    }
} 