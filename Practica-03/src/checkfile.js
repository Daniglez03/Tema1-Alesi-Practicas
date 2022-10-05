const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const filepath = args[0]

const ficheroSize = () => {
    fs.stat(path.basename(filepath), (err, value) => {
        if (err) {
            console.log(err);
        }else {
            let kb = value.size/1024
            return kb.toFixed(1)
        }
    });
}
const readWrite = () => {
    fs.access(path.basename(filepath),fs.constants.R_OK | fs.constants.W_OK, (error) => {
        if (error) {
            return console.log('lectura/escritura      No');
        }else {
            return console.log('lectura/escritura      Sí');
        }
    })
}

if (args.length > 0) {
fs.access(args[0], fs.constants.F_OK, (error) => {
    if (error) {
        console.log(`
            ********************************
            * Fichero/Directorio NO existe *
            ********************************`);
    }else {
        console.log(`
        ┌────────────────────────────────────────────────────┐
        │           Características del archivo              │
        ├─────────────────────────┬──────────────────────────┤
        │ Nombre del Archivo      │${path.basename(filepath)}│
        ├─────────────────────────┼──────────────────────────┤
        │ Extención del Archivo   │${path.extname(filepath)} │
        ├─────────────────────────┼──────────────────────────┤
        │ Directorio del Archivo  │                          │
        ├─────────────────────────┼──────────────────────────┤
        │ Tamaño del Archivo      │ ${ficheroSize()}         │
        ├─────────────────────────┼──────────────────────────┤
        │ Lectura/Escritura       │ ${readWrite()}           │
        └─────────────────────────┴──────────────────────────┘
        `);
    }
})
}else {
    console.log(`
            **************************************
            * Parámetros incorrectos             *
            *  Uso: checkfile carpeta_o_fichero  *
            **************************************`);
}