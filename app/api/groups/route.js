import db from '../../db';

export async function GET() {
    try {
        const [existingRows] = await db.execute('SELECT * FROM `groups` where is_deleted=0');
        return new Response(JSON.stringify(existingRows), {
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

export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name')

        // Check if the entry already exists
        const [existingRows] = await db.execute(
            'SELECT * FROM `groups` WHERE name = ?',
            [name]
        );

        if (existingRows.length > 0) {
            return new Response('Group already exists!', {
                status: 409
            });
        }

        // Insert data into the database
        await db.execute(
            'INSERT INTO `groups` (name) VALUES (?)',
            [name]
        );

        return new Response('Form submitted successfully', {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return new Response('Error submitting form', {
            status: 500
        });
    }
}