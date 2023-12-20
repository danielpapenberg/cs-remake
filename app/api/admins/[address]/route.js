export async function GET(request, { params }) {
    if (!params || !params.address) {
        return new Response(JSON.stringify({ error: "Address parameter is missing" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // @TODO: store the addresses for admins somewhere ... MYSQL
    const addresses = '0xC408356F8C8fa0Ee64833c983C214Ea8A84E1c2d';
    const eligibleAddresses = addresses.split(',');

    const address = params.address;

    if (eligibleAddresses.includes(address)) {
        return new Response(JSON.stringify({ status: "Valid" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify({ status: "Not Valid" }), {
        status: 401, // 401 is more appropriate for unauthorized access
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
