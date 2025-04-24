document.addEventListener('DOMContentLoaded', async () => {
    try {
        const posts = await getPosts();
        posts.forEach(post => {
            addPostToUI(post);
        });
    } catch (error) {
        console.error('Error loading posts:', error);
    }
});

document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('postContent').value.trim();
    if (!content) return;

    try {
        const post = await createPost(content);
        addPostToUI(post);
        document.getElementById('postContent').value = '';
    } catch (error) {
        console.error('Error creating post:', error);
    }
});

function addPostToUI(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <button class="edit-btn" data-id="${post.id}">Edit</button>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
        </div>
    `;

    const editBtn = postElement.querySelector('.edit-btn');
    const deleteBtn = postElement.querySelector('.delete-btn');

    editBtn.addEventListener('click', async () => {
        const newContent = prompt('Edit your post:', post.content);
        if (newContent && newContent.trim() !== post.content) {
            try {
                const updatedPost = await updatePost(post.id, newContent.trim());
                postElement.querySelector('.post-content').textContent = updatedPost.content;
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    });

    deleteBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(post.id);
                postElement.remove();
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    });

    document.getElementById('postsContainer').appendChild(postElement);
}

const API_BASE_URL = '/.netlify/functions/api';

async function createPost(content) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

async function getPosts() {
    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
}

async function updatePost(id, content) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

async function deletePost(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
} 