import db from '../../../../db';

export async function POST(request, {params}) {
    const user_id = params.id;
    const ico_id = request.nextUrl.searchParams.get('icoId');

    if (!user_id || !ico_id) {
        return new Response(JSON.stringify({ error: 'No User ID or ICO ID provided' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const sqlQuery = `
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
                users.user_id = ? AND
                icos.ico_id = ?`;

        const [ico] = await db.execute(sqlQuery, [user_id, ico_id]);
        
        if (ico.length === 0) {
            return new Response(JSON.stringify({ error: 'ICO not available' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const formData = await request.formData();
        const txhash = formData.get('txhash');
        const amount = formData.get('amount');
        const receiving_address = formData.get('receiving_address');
        const from_address = '';
        const to_address = ico[0].wallet;
        const participation_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const ico_name = ico[0].name;

        const amountFloat = parseFloat(amount);
        const minAllocationFloat = parseFloat(ico[0].min_allocation);
        const maxAllocationFloat = parseFloat(ico[0].max_allocation);

         // Check if the amount is within the min and max allocation
         if (amountFloat < minAllocationFloat || amountFloat > maxAllocationFloat) {
            return new Response(JSON.stringify({ error: 'Amount is not within the allowed allocation range' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const [existingRows] = await db.execute(
            'SELECT * FROM user_ico_participations WHERE user_id = ? AND ico_id = ?',
            [user_id, ico_id]
        );

        if (existingRows.length > 0) {
            // Update existing record
            await db.execute(
                `UPDATE user_ico_participations 
                SET ico_name = ?, amount = ?, txhash = ?, from_address = ?, to_address = ?, receiving_address = ?, participation_date = ?
                WHERE user_id = ? AND ico_id = ?`,
                [ico_name, amountFloat, txhash, from_address, to_address, receiving_address, participation_date, user_id, ico_id]
            );
        } else {
            // Insert new record
            await db.execute(
                `INSERT INTO user_ico_participations 
                (user_id, ico_id, ico_name, amount, txhash, from_address, to_address, receiving_address, participation_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [user_id, ico_id, ico_name, amountFloat, txhash, from_address, to_address, receiving_address, participation_date]
            );
        }

        return new Response(JSON.stringify({ message: 'Form submitted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error submitting form' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
