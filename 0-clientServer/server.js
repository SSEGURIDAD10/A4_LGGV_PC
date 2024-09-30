const { spawn } = require('child_process');
const net = require('net');

// Función para iniciar un proceso cliente
function startClient() {
    const clientProcess = spawn('node', ['client.js']);

    // Comunicación con el proceso cliente
    clientProcess.stdout.on('data', (data) => {
        console.log(`Cliente: ${data.toString()}`);
    });

    // Enviar un mensaje al cliente
    clientProcess.stdin.write('Hola Mundo\n');
}

const server = net.createServer((socket) => {
    console.log('Cliente conectado');
    socket.on('data', (data) => {
        console.log(`Mensaje del cliente: ${data.toString()}`);
        socket.write('Mensaje recibido en el servidor');
    });
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Servidor escuchando en el puerto 8080');
    // Iniciar cliente después de que el servidor esté listo
    startClient();
});