import { Client as pgClient } from 'pg';

const client = new pgClient({
    connectionString: process.env.PG_URL,
});

client.connect();

// Exporte le client PostgreSQL.
export default client;
