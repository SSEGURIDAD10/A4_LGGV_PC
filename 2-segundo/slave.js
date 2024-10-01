// Programa esclavo que suma los números en un rango dado...

const sumRange = (start, end) => {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += i;
    }
    return sum;
};

// Obtener el rango desde la línea de comandos
const start = parseInt(process.argv[2]);
const end = parseInt(process.argv[3]);

if (isNaN(start) || isNaN(end) || start > end) {
    console.log("Rango inválido.");
    process.exit(1);
}

// Imprimir la suma para que el proceso maestro lo recoja
console.log(sumRange(start, end));