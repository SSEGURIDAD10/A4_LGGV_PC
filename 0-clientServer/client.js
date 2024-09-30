const net = require('net');

// Conexión al servidor
const client = net.createConnection({ port: 8080, host: '127.0.0.1' }, () => {
    console.log('Conectado al servidor');
});

client.on('data', (data) => {
    console.log(`Mensaje del servidor: ${data.toString()}`);
    client.end();
});

process.stdin.on('data', (data) => {
    client.write(data.toString());
});