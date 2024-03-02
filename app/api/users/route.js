import db from '../../db';

// const bcrypt = require('bcrypt');

// async function hashPassword(password) {
//     const saltRounds = 10; // Adjust based on security requirement
//     return bcrypt.hash(password, saltRounds);
// }

export async function GET(request) {
    try {
        const address = request.nextUrl.searchParams.get('address');
        
        if (address) {
            const sqlQuery = `SELECT * FROM users WHERE users.is_deleted=0 AND users.is_blocked=0 AND address='${address}'`;
            const [existingRows] = await db.execute(sqlQuery);
            if (existingRows.length) {
                return new Response(JSON.stringify({ status: "Valid", data: existingRows[0] }), {
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
        } else {
            const sqlQuery = 'SELECT users.*, groups.name as group_name FROM users LEFT JOIN `groups` on users.group_id=groups.group_id WHERE users.is_deleted=0 AND users.is_blocked=0';
            const [existingRows] = await db.execute(sqlQuery);

            if (existingRows.length) {
                return new Response(JSON.stringify(existingRows), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        return new Response(JSON.stringify({ status: "Redirect" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
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

export async function POST(request) {
    try {
        const formData = await request.formData();

        const name = formData.get('name')
        const email = formData.get('email')
        const address = formData.get('address')
        const group_id = formData.get('group_id') || null;
        // const password = formData.get('password')
        const is_admin = false
        const is_blocked = false
        const is_deleted = false
        const telegram_handle = formData.get('telegram_handle')
        const twitter_handle = formData.get('twitter_handle')

        // const hashedPassword = await hashPassword(password);

        // Check if the entry already exists
        if (email) {
            const [existingRows] = await db.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );


            if (existingRows.length > 0) {
                return new Response('User/E-Mail already exists!', {
                    status: 409
                });
            }
        }

        const [existingRows2] = await db.execute(
            'SELECT * FROM users WHERE address = ?',
            [address]
        );

        if (existingRows2.length > 0) {
            return new Response('Address already exists!', {
                status: 410
            });
        }

        // Insert data into the database
        await db.execute(
            `INSERT INTO users 
            (name, email, address, group_id, is_admin, is_blocked, is_deleted, telegram_handle, twitter_handle) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, email, address, group_id, is_admin, is_blocked, is_deleted, telegram_handle, twitter_handle]
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
