import db from '../../../../db';

export async function GET(request, { params }) {
    const icoId = params.id; // Ensure this matches the parameter name in your route definition

    if (!icoId) {
        return new Response(JSON.stringify({ error: 'No ICO ID provided' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const [groups] = await db.execute(
            'SELECT * FROM ico_groups WHERE ico_id = ?',
            [icoId]
        );

        if (groups.length === 0) {
            // It's possible for an ICO to have no groups, so adjust this based on your application's needs
            return new Response(JSON.stringify({ warning: 'No groups found for this ICO' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Respond with the array of group IDs
        return new Response(JSON.stringify(groups), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch groups for ICO' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
