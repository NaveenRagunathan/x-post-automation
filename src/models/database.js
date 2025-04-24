const Database = require('better-sqlite3');
const path = require('path');

// Initialize database connection
const db = new Database(path.join(__dirname, '../../posts.db'));

// Initialize database tables
function initializeDatabase() {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            scheduled_time DATETIME NOT NULL,
            status TEXT NOT NULL DEFAULT 'scheduled',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    console.log('Database initialized successfully');
}

// Initialize the database
initializeDatabase();

module.exports = db; 