import { api } from 'encore.dev/api';
import { SQLDatabase } from 'encore.dev/storage/sqldb';

// Database setup
export const db = new SQLDatabase('jokes', {
    migrations: './migrations',
});

// Types
interface JokeResponse {
    id: number;
    setup: string;
    punchline: string;
    category: string;
}

interface AddJokeRequest {
    joke: string;
    category: string;
}

interface AddJokeResponse {
    message: string;
}

// API endpoint to get a random joke
export const getRandomJoke = api(
    { expose: true, method: 'GET', path: '/jokes/random' },
    async (): Promise<JokeResponse> => {
        // Get a random joke from the database
        const result = await db.query<JokeResponse>`
            SELECT id, setup, punchline, category 
            FROM jokes 
            ORDER BY RANDOM() 
            LIMIT 1
        `;
        
        // Convert async iterator to array
        const jokes: JokeResponse[] = [];
        for await (const row of result) {
            jokes.push(row);
        }
        
        if (jokes.length === 0) {
            throw new Error('No jokes found');
        }

        return jokes[0];
    }
);

// API endpoint to add a new joke
export const addJoke = api(
    { expose: true, method: 'POST', path: '/jokes' },
    async (body: AddJokeRequest): Promise<AddJokeResponse> => {
        if (!body.joke || !body.category) {
            throw new Error('Missing required fields');
        }
        try {
            await db.exec`
                INSERT INTO jokes (joke, category)
                VALUES (${body.joke}, ${body.category})
            `;
            return { message: 'Joke added successfully' };
        } catch (error) {
            throw new Error('Failed to add joke');
        }
    }
); 