import db from './../../db';

export async function GET(request) {
    const address = request.nextUrl.searchParams.get('address');
    const sqlQuery = `
        SELECT 
            icos.*,
            user_ico_participations.*
        FROM 
            users 
            JOIN ico_groups ON users.group_id = ico_groups.group_id
            JOIN icos ON ico_groups.ico_id = icos.ico_id
            JOIN \`groups\` ON ico_groups.group_id = groups.group_id
            JOIN user_ico_participations ON user_ico_participations.user_id = users.user_id 
                AND icos.ico_id = user_ico_participations.ico_id
        WHERE 
            icos.is_deleted <> 1 AND 
            icos.is_active = 1 AND
            groups.is_deleted <> 1 AND
            users.is_deleted <> 1 AND
            users.is_blocked <> 1 AND
            users.address = ?
    `;

    try {
        const [rows] = await db.execute(sqlQuery, [address]);
        return new Response(JSON.stringify(rows), {
            status: 200, // Explicitly define success status for clarity
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500, // Use a variable or constant for standard HTTP status codes if preferred for maintainability
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
