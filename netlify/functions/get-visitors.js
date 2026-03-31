// Import the Neon serverless driver — a lightweight PostgreSQL client
const { neon } = require('@neondatabase/serverless');

exports.handler = async (event) => {
    // Read the connection string from the environment variable (never hardcode this)
    const sql = neon(process.env.DATABASE_URL);

    // Run a SQL query using Neon's tagged template literal syntax
    const rows = await sql`SELECT * FROM visitors`;

    // Return a standard HTTP response — statusCode + JSON body
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rows)
    };
};