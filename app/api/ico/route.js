import db from './../../db';
const path = require('path');
const fs = require('fs');

export async function GET() {
    try {
        const [existingRows] = await db.execute('SELECT * FROM icos');
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

        // Assuming 'image' contains the URL of the uploaded image
        const name = formData.get('name')
        const image = formData.get('image')
        const shortdesc = formData.get('shortdesc')
        const description = formData.get('desc')

        // Check if the entry already exists
        const [existingRows] = await db.execute(
            'SELECT * FROM icos WHERE name = ?',
            [name]
        );

        if (existingRows.length > 0) {
            return new Response('Ico already exists!', {
                status: 409
            });
        }

        // Insert data into the database
        const [rows, fields] = await db.execute(
            'INSERT INTO icos (name, image_url, shortdesc, description) VALUES (?, ?, ?, ?)',
            [name, image.name, shortdesc, description]
        );

        // Assuming 'image' is a Blob or similar object
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the directory and the file path
        const dirPath = 'public/images/icos';
        const filePath = path.join(dirPath, image.name);

        // Ensure the directory exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write the file
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                // Handle the error according to your application's needs
            } else {
                console.log(`File saved at ${filePath}`);
            }
        });

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