import db from '../../../db';

// const bcrypt = require('bcrypt');

// async function hashPassword(password) {
//     const saltRounds = 10; // Adjust based on security requirement
//     return bcrypt.hash(password, saltRounds);
// }

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
        const [existingRows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        if (existingRows.length === 0) {
            return new Response(JSON.stringify({ error: 'ICO not found' }), {
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
            return new Response('User ID is required', {
                status: 400
            });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const address = formData.get('address');
        const group_id = formData.get('group_id');
        // const password = formData.get('password'); // Consider handling password updates carefully
        const telegram_handle = formData.get('telegram_handle');
        const twitter_handle = formData.get('twitter_handle');

        // const hashedPassword = password ? await hashPassword(password) : undefined;

        // Check if the user exists
        const [user] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        if (user.length === 0) {
            return new Response('User not found', {
                status: 404
            });
        }

        // Update the user's data in the database
        // If password is provided, update it, otherwise skip updating the password
        // await db.execute(
        //     `UPDATE users SET 
        //     name = ?, 
        //     email = ?, 
        //     ${password ? 'password = ?,' : ''}
        //     telegram_handle = ?, 
        //     twitter_handle = ?
        //     WHERE user_id = ?`,
        //     password ? [name, email, hashedPassword, telegram_handle, twitter_handle, id] : [name, email, telegram_handle, twitter_handle, id]
        // );

        await db.execute(
            `UPDATE users SET 
            name = ?, 
            email = ?, 
            address = ?,
            group_id = ?, 
            telegram_handle = ?, 
            twitter_handle = ?
            WHERE user_id = ?`,
            [name, email, address, group_id, telegram_handle, twitter_handle, id]
        );

        return new Response('User updated successfully', {
            status: 200
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return new Response('Error updating user', {
            status: 500
        });
    }
}