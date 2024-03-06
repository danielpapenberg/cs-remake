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

    const type = request.nextUrl.searchParams.get('type');
    const address = request.nextUrl.searchParams.get('address');

    let sqlQuery;
    let queryParams = [];

    switch (type) {
        case 'user':
            sqlQuery = `
                SELECT 
                    icos.*,
                    ico_groups.min_allocation,
                    ico_groups.max_allocation
                FROM 
                    users JOIN ico_groups ON users.group_id = ico_groups.group_id
                    JOIN icos ON ico_groups.ico_id = icos.ico_id
                    JOIN \`groups\` ON ico_groups.group_id = groups.group_id
                WHERE 
                    icos.is_deleted <> 1 AND 
                    icos.is_active = 1 AND
                    groups.is_deleted <> 1 AND
                    users.is_deleted <> 1 AND
                    users.is_blocked <> 1 AND
                    users.address = ? AND
                    icos.ico_id = ?
            `;
            queryParams.push(address);
            queryParams.push(id);
            break;
        default:
            sqlQuery = 'SELECT * FROM icos WHERE ico_id = ?';
            queryParams.push(id);
    }

    try {
        const [existingRows] = await db.execute(sqlQuery, queryParams);
        if (existingRows.length === 0) {
            return new Response(JSON.stringify({ status: "Redirect" }), {
                status: 200,
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
        const id = params.id;
        if (!id) {
            return new Response('ICO ID is required', {
                status: 400
            });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const website = formData.get('website');
        const telegram = formData.get('telegram');
        const twitter = formData.get('twitter');
        const tokenomics = formData.get('tokenomics');
        const pitchdeck = formData.get('pitchdeck');
        const image = formData.get('image');
        const wallet = formData.get('wallet');
        const wallet_chain = formData.get('wallet_chain');
        const wallet_currency = formData.get('wallet_currency');
        const short_description = formData.get('short_description');
        const description = formData.get('desc');
        // Dates from datetime-local input, converted to MySQL's TIMESTAMP format
        const startdate = formData.get('startdate').replace('T', ' ');
        const enddate = formData.get('enddate').replace('T', ' ');

        const group_ids = formData.getAll('group_ids[]');

        const [ico] = await db.execute('SELECT * FROM `icos` WHERE ico_id = ?', [id]);
        if (ico.length === 0) {
            return new Response('ICO not found', {
                status: 404
            });
        }

        const updateQuery = `
            UPDATE icos
            SET 
                name = ?, 
                website = ?, 
                telegram = ?,
                twitter = ?,
                tokenomics = ?,
                pitchdeck = ?,
                image = ?, 
                wallet = ?, 
                wallet_chain = ?, 
                wallet_currency = ?, 
                short_description = ?, 
                description = ?, 
                startdate = ?, 
                enddate = ?
            WHERE ico_id = ?
        `;

        await db.execute(updateQuery, [
            name, 
            website, 
            telegram,
            twitter,
            tokenomics,
            pitchdeck,
            image, 
            wallet,
            wallet_chain,
            wallet_currency, 
            short_description, 
            description, 
            startdate, 
            enddate,
            id
        ]);

        // Remove existing associations in ico_groups
        await db.execute('DELETE FROM ico_groups WHERE ico_id = ?', [id]);

        // Handle group_ids and their corresponding alloc fields
        await Promise.all(group_ids.map(async (group_id) => {
            // Retrieve allocation fields for each group
            const minAlloc = formData.get(`minAlloc-${group_id}`) || 0;
            const maxAlloc = formData.get(`maxAlloc-${group_id}`) || 0;

            // Insert group_id along with minAlloc and maxAlloc into the ico_groups table
            await db.execute(
                'INSERT INTO ico_groups (ico_id, group_id, min_allocation, max_allocation) VALUES (?, ?, ?, ?)',
                [id, group_id, minAlloc, maxAlloc]
            );
        }));

        return new Response('ICO updated successfully', {
            status: 200
        });
    } catch (error) {
        console.error('Error updating ICO:', error);
        return new Response('Error updating ICO', {
            status: 500
        });
    }
}
