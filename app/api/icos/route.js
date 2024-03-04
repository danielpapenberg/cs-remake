import db from './../../db';

export async function GET(request) {
    const type = request.nextUrl.searchParams.get('type');
    const address = request.nextUrl.searchParams.get('address');
    let sqlQuery;
    let queryParams = [];

    switch (type) {
        case 'active':
            sqlQuery = 'SELECT * FROM icos WHERE is_deleted <> 1 AND is_active = 1 order by icos.ico_id desc';
            break;
        case 'user':
            sqlQuery = `
                SELECT 
                    icos.*
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
                    users.address = ?
                order by
                    icos.ico_id desc
            `;
            queryParams.push(address);
            break;
        default:
            sqlQuery = 'SELECT * FROM icos WHERE is_deleted <> 1 order by icos.ico_id desc';
    }

    try {
        const [rows] = await db.execute(sqlQuery, queryParams);
        return new Response(JSON.stringify(rows), {
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
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const formData = await request.formData();
        const name = formData.get('name');
        const website = formData.get('website');
        const telegram = formData.get('telegram');
        const twitter = formData.get('twitter');
        const tokenomics = formData.get('tokenomics');
        const image = formData.get('image');
        const wallet = formData.get('wallet');
        const wallet_chain = formData.get('wallet_chain');
        const wallet_currency = formData.get('wallet_currency');
        const short_description = formData.get('short_description');
        const description = formData.get('desc');
        const startdate = formData.get('startdate').replace('T', ' ');
        const enddate = formData.get('enddate').replace('T', ' ');
        const group_ids = formData.getAll('group_ids[]');

        const [existingRows] = await connection.execute('SELECT * FROM icos WHERE name = ?', [name]);
        if (existingRows.length > 0) {
            await connection.rollback();
            connection.release();
            return new Response('Ico already exists!', {
                status: 409
            });
        }

        const [icoResult] = await connection.execute(
            'INSERT INTO icos (name, website, telegram, twitter, tokenomics, image, startdate, enddate, wallet, wallet_chain, wallet_currency, short_description, description, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, website, telegram, twitter, tokenomics, image, startdate, enddate, wallet, wallet_chain, wallet_currency, short_description, description, false]
        );

        const ico_id = icoResult.insertId;

        await Promise.all(group_ids.map(group_id => {
            const minAlloc = formData.get(`minAlloc-${group_id}`) || 0;
            const maxAlloc = formData.get(`maxAlloc-${group_id}`) || 0;
            return connection.execute(
                'INSERT INTO ico_groups (ico_id, group_id, min_allocation, max_allocation) VALUES (?, ?, ?, ?)',
                [ico_id, group_id, minAlloc, maxAlloc]
            );
        }));

        await connection.commit();
        connection.release();
        return new Response('Form submitted successfully', {
            status: 200
        });
    } catch (error) {
        console.error(error);
        await connection.rollback();
        connection.release();
        return new Response('Error submitting form', {
            status: 500
        });
    }
}
