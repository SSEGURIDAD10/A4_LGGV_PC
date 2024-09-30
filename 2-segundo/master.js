const { spawn } = require('child_process');

// Función para dividir el rango entre los procesos esclavos
const dividirRango = (start, end, numWorkers) => {
    const step = Math.floor((end - start + 1) / numWorkers);
    let ranges = [];
    
    for (let i = 0; i < numWorkers; i++) {
        let rangeStart = start + i * step;
        let rangeEnd = (i === numWorkers - 1) ? end : rangeStart + step - 1;
        ranges.push([rangeStart, rangeEnd]);
    }

    return ranges;
};

// Obtener el rango y número de esclavos desde la línea de comandos
const start = parseInt(process.argv[2]);
const end = parseInt(process.argv[3]);
const numWorkers = parseInt(process.argv[4]);

if (isNaN(start) || isNaN(end) || start > end || isNaN(numWorkers)) {
    console.log("Uso: node master.js <inicio> <fin> <num_esclavos>");
    process.exit(1);
}

const ranges = dividirRango(start, end, numWorkers);
let totalSum = 0;
let completed = 0;

// Ejecutar esclavos
ranges.forEach((range, index) => {
    const worker = spawn('node', ['slave.js', range[0], range[1]]);

    worker.stdout.on('data', (data) => {
        console.log(`Esclavo ${index + 1} sumó de ${range[0]} a ${range[1]}: ${data}`);
        totalSum += parseInt(data);
    });

    worker.on('close', () => {
        completed++;
        if (completed === numWorkers) {
            console.log(`La suma total de ${start} a ${end} es: ${totalSum}`);
        }
    });
});