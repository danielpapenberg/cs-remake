import db from '../../../../db';

export async function DELETE(request, { params }) {
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
        // Mark the group as deleted
        await db.execute('UPDATE groups SET is_deleted = 1 WHERE group_id = ?', [id]);

        return new Response(JSON.stringify({ success: 'Group deleted successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete group' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
