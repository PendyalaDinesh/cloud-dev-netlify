// netlify/functions/get-visitors.js
const { neon } = require('@neondatabase/serverless');

exports.handler = async (event) => {
  try {
    // Ensure the environment variable exists
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    // Initialize Neon client
    const sql = neon(process.env.DATABASE_URL);

    // Query all visitors
    const rows = await sql`SELECT * FROM visitors`;

    // Return successful response
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Optional: allows frontend requests from any domain
      },
      body: JSON.stringify(rows)
    };
  } catch (error) {
    console.error('Database error:', error);

    // Return error response
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Database query failed', details: error.message })
    };
  }
};