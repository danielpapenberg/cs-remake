import db from '../../db';

export async function GET(request) {
    try {
        const sqlQuery = `
            SELECT 
                *
            FROM
                user_ico_participations JOIN
                icos on user_ico_participations.ico_id = icos.ico_id
            WHERE 
                user_ico_participations.is_deleted <> 1`;
        const [existingRows] = await db.execute(sqlQuery);
        if (existingRows.length) {
            return new Response(JSON.stringify(existingRows), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            return new Response(JSON.stringify({ status: "Redirect" }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ status: "Redirect" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
