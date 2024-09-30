// Programa secuencial que suma números en un rango dado

const sumRange = (start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += i;
    }
    return sum;
};

// Obtener los números desde la línea de comandos
const start = parseInt(process.argv[2]);
const end = parseInt(process.argv[3]);

if (isNaN(start) || isNaN(end) || start > end) {
    console.log("Por favor ingrese un rango válido. Ejemplo: node sum_secuencial.js 1 100");
    process.exit(1);
}

console.log(`La suma de los números de ${start} a ${end} es: ${sumRange(start, end)}`);