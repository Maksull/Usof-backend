import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User';
import { Post, PostCategory } from './models/Post';
import { Category } from './models/Category';
import { Comment } from './models/Comment';
import { Like } from './models/Like';
import { mockData } from './mockData';

const PORT: number = 3000;

const app = express();

app.use(express.json());

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '3459',
    database: 'Usof',
    models: [User, Post, Category, Comment, Like, PostCategory],
    logging: true,
});

async function initializeDatabase() {
    try {
        // This will create the tables if they don't exist (and do nothing if they already exist)
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
}

async function insertMockData() {
    try {
        // Create mock users
        const users = await User.bulkCreate(mockData.users);

        // Create mock categories
        const categories = await Category.bulkCreate(mockData.categories);

        // Create mock posts
        const posts = await Post.bulkCreate(
            mockData.posts.map((post, index) => ({
                ...post,
                authorId: users[index % users.length].id,
                publishDate: new Date()
            }))
        );

        // Associate posts with categories
        await Promise.all(posts.map((post, index) => 
            post.$set('categories', [categories[index % categories.length]])
        ));

        // Create mock comments
        await Comment.bulkCreate(
            mockData.comments.map((comment, index) => ({
                ...comment,
                authorId: users[(index + 1) % users.length].id,
                postId: posts[index % posts.length].id,
                publishDate: new Date()
            }))
        );

        // Create mock likes
        await Like.bulkCreate(
            mockData.likes.map((like, index) => ({
                ...like,
                authorId: users[index % users.length].id,
                postId: posts[(index + 1) % posts.length].id,
                publishDate: new Date()
            }))
        );

        console.log('Mock data inserted successfully');
    } catch (error) {
        console.error('Error inserting mock data:', error);
    }
}

sequelize.authenticate()
    .then(async () => {
        console.log('Connected to database');

        // Initialize the database (create tables if they don't exist)
        await initializeDatabase();

        // Insert mock data
        await insertMockData();

        app.get('/', (req, res) => {
            res.send('Hello, TypeScript with Node.js and Express!');
        });

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}/`);
        });
    })
    .catch((error) => console.log('Error connecting to database:', error));
