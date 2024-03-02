import db from '../../../db';

export async function GET(request, { params }) {
    const id = params.id;

    if (!id) {
        return new Response(JSON.stringify({ error: 'No ID provided' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const [existingRows] = await db.execute('SELECT * FROM `groups` WHERE group_id = ?', [id]);
        if (existingRows.length === 0) {
            return new Response(JSON.stringify({ error: 'Group not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return new Response(JSON.stringify(existingRows[0]), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function PUT(request, { params }) {
    try {
        const id = params.id
        if (!id) {
            return new Response('Group ID is required', {
                status: 400
            });
        }

        const formData = await request.formData();
        const name = formData.get('name');

        const [group] = await db.execute('SELECT * FROM `groups` WHERE group_id = ?', [id]);
        if (group.length === 0) {
            return new Response('Group not found', {
                status: 404
            });
        }

        await db.execute('UPDATE `groups` SET name = ? WHERE group_id = ?', [name, id]);

        return new Response('Group updated successfully', {
            status: 200
        });
    } catch (error) {
        console.error('Error updating group:', error);
        return new Response('Error updating group', {
            status: 500
        });
    }
}
