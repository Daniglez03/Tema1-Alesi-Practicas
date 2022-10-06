const fs = require('fs');
const { join } = require('path');
const path = require('path');

const args = process.argv.slice(2);
const filepath = args[0]

if (args.length > 0) {
    fs.access(args[0], fs.constants.F_OK, (error) => {
        if (error) {
            console.log(`
            ********************************
            * Fichero/Directorio NO existe *
            ********************************`);
        } else {
            fs.stat(filepath, (err, value) => {
                if (value.isDirectory()) {
                    fs.readdir(filepath, (err, files) => {
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log(`
                    ┌──────────────────────────────────────────────────────────────┐
                    │           El valor introducido es un directorio              │
                    └──────────────────────────────────────────────────────────────┘
                    ┌──────────────────────────────────────────────────────────────┐
                    │ ${files.join('\n')}                    │
                    │                                                              │
                    └──────────────────────────────────────────────────────────────┘
                    `);
                        }
                    });
                } else {
                    if (err) {
                        console.log(err);
                    } else {
                        let kb = value.size / 1024
                        value = kb.toFixed(1)+" KB"
                    }
                    fs.access(filepath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
                        let spaces = " "
                        let SpacesNameArchivo = ""
                        let SpacesExtArchivo = ""
                        let SpacesDirArchivo = ""
                        let SpacesSizeArchivo = ""
                        for (let i = 0; i < 26 - path.basename(filepath).length ; i++) {
                            SpacesNameArchivo += spaces
                        }
                        for (let i = 0; i < 26 - path.extname(filepath).length ; i++) {
                            SpacesExtArchivo += spaces
                        }
                        for (let i = 0; i < 26 - path.parse(filepath).dir.length ; i++) {
                            SpacesDirArchivo += spaces
                        }
                        for (let i = 0; i < 26 - value.length ; i++) {
                            SpacesSizeArchivo += spaces
                        }
                        console.log(`
            ┌────────────────────────────────────────────────────┐
            │           Características del archivo              │
            ├─────────────────────────┬──────────────────────────┤
            │ Nombre del Archivo      │${path.basename(filepath) + SpacesNameArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Extención del Archivo   │${path.extname(filepath) + SpacesExtArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Directorio del Archivo  │${path.parse(filepath).dir + SpacesDirArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Tamaño del Archivo      │${value+SpacesSizeArchivo}│
            ├─────────────────────────┼──────────────────────────┤
            │ Lectura/Escritura       │${!error ? 'Sí' : 'No'}                        │
            └─────────────────────────┴──────────────────────────┘
                            `);
                            //26 espacios por container
                    })
                }
            });
        }
    })
} else {
    console.log(`
            **************************************
            * Parámetros incorrectos             *
            *  Uso: checkfile carpeta_o_fichero  *
            **************************************`);
}