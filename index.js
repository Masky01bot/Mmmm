const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new instance of the client
const client = new Client();

// Function to generate session ID (you can implement your own logic here)
const generateSessionID = () => {
    // Generate a unique session ID using your preferred method (e.g., UUID)
    return 'abc123'; // Replace with your generated session ID
};

// Event fired when the client is ready to receive messages
client.on('ready', () => {
    console.log('Client is ready!');
});

// Event fired when the client has generated a QR code
client.on('qr', qr => {
    // Display QR code in the terminal
    qrcode.generate(qr, { small: true });
});

// Event fired when a message is received
client.on('message', async msg => {
    // Check if the message is from the user and contains the request for session ID
    if (msg.fromMe && msg.body.toLowerCase().includes('session id')) {
        // Generate session ID
        const sessionId = generateSessionID();

        // Send session ID to the user
        await client.sendMessage(msg.from, `Your session ID is: ${sessionId}`);
    }
});

// Initialize the client
client.initialize();