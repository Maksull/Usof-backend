import { User, UserRole } from './models/User';
import { Category } from './models/Category';
import { Post, PostStatus } from './models/Post';
import { Comment } from './models/Comment';
import { Like } from './models/Like';

export const mockData = {
    users: [
        {
            login: 'user1',
            password: 'password1',
            fullName: 'User One',
            email: 'user1@example.com',
            role: UserRole.USER
        },
        {
            login: 'user2',
            password: 'password2',
            fullName: 'User Two',
            email: 'user2@example.com',
            role: UserRole.USER
        }
    ],
    categories: [
        {
            title: 'Technology',
            description: 'Posts about technology'
        },
        {
            title: 'Science',
            description: 'Posts about scientific discoveries'
        }
    ],
    posts: [
        {
            title: 'First Post',
            content: 'This is the content of the first post',
            status: PostStatus.ACTIVE
        },
        {
            title: 'Second Post',
            content: 'This is the content of the second post',
            status: PostStatus.ACTIVE
        }
    ],
    comments: [
        {
            content: 'Great post!'
        },
        {
            content: 'Interesting topic!'
        }
    ],
    likes: [
        {
            type: 'like'
        },
        {
            type: 'like'
        }
    ]
};
