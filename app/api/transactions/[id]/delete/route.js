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
        // Mark the transaction as deleted
        await db.execute('UPDATE user_ico_participations SET is_deleted = 1 WHERE participation_id = ?', [id]);

        return new Response(JSON.stringify({ success: 'Transaction deleted successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete transaction' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
