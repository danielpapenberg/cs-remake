import db from '../../../../db';

export async function PUT(request, { params }) {
    const id = params.id;

    if (!id) {
        return new Response(JSON.stringify({ error: 'No ID provided' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        // Toggle the is_blocked status of the user
        await db.execute('UPDATE users SET is_blocked = NOT is_blocked WHERE user_id = ?', [id]);

        return new Response(JSON.stringify({ success: 'User block status toggled successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to toggle user block status' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
