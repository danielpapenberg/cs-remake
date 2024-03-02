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
        await db.execute('UPDATE icos SET is_active = NOT is_active WHERE ico_id = ?', [id]);

        return new Response(JSON.stringify({ success: 'Ico status updated successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to toggle ico status' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
