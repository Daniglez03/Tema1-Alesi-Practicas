

const { error } = require('console');
const fs = require('fs');
const { constants } = require('fs/promises');
const fsPromises = fs.promises;
const path = require('path');

/**
 * CALLBACKS Y SYNC:
 * 
 * fs.access  :   comprueba si un fichero sile o directorio existe y si el usuario puede acceder
 * fs.existsSync : comprueba si existe un directorio (síncrono)
 * fs.accessSync: Igual a access  (síncrona)
 * fs.stat  :  Obtener informacion acerca de un dir/file
 * stats.isDirectory : comprueba si es un dir
 * stats.isFile : Comprueba si es un file
 * stats.size : variable que indica el tamaño
 * fs.readdir : devuelve los ficheros de un dir
 */

console.clear();

/**
 * COMPROBAR SI EXISTE UN DIRECTORIO
 */
//Versión callback

//Si no retorna un errorel file existe y se tiene acceso
//   fs.constants.F_OK : Read/Write/Execute permission (default)
//   fs.constants.R_OK : Has read permission
//   fs.constants.W_OK : Has write permission
//   fs.constants.X_OK : Has execute permission
//   fs.constants.R_OK | fs.constants.W_OK : read/write

fs.access('./dir_callback', fs.constants.F_OK, (error) => {
    if (error) {
        console.log('fs.access El directorio dir_callback NO existe');
    }else {
        console.log('fs.access El directorio dir_callback Existe');
    }
})

// Version promesas
function canAccess() {
    fsPromises
        .access('./dir_promesas', fs.constants.F_OK)
        .then(true)
        .catch((error) => {
            if (error.code == "ENOENT") {
                return false
            }
            throw error;
        })
}

if (canAccess()) {
    console.log('canAccess El directorio dir_promesas Existe');
} else {
    console.log('canAccess El directorio dir_promesas NO existe');
}

// Versión síncrona
try {
    if (fs.existsSync('./dir_sync')) {
        console.log('canAccess El directorio dir_async Existe');
    } else {
        console.log('canAccess El directorio dir_async NO existe');
    }
} catch (error) {
    console.log(`Error : ${error}`);
}

try {
    fs.accessSync('etc/passwd', constants.R_OK | constants.W_OK)
    console.log('can read/write');
} catch (error) {
    console.error("no access!!");
}

/**
 * COMPROBAR SI ES DIRECTORIO O FICHERO
 */

fs.stat( path.join(__dirname, 'app.js'), (stats) => {
    console.log(
        'stat callback:',
        stats.isDirectory() ? 'Es un directorio' : 'No es un directorio'
    );
    console.log('stat callback', stats);
});

fs.promises
    .stat(path.join(__dirname, 'app.js'))
    .then((stats) => {
        'stat promesas:',
        stats.isDirectory() ? 'Es un fichero' : 'NO es un fichero'
    })
    .catch((error) => {
        console.log(error);
    })

// Versión síncrona
try {
    const stats = fs.statSync(path.join(__dirname, 'app.js'));
    console.log('Es un fichero ? : ' + stats.isFile());
} catch (error) {
    console.log(error.message);
}

/**
 * LISTAR FICHEROS DE UN DIRECTORIO
 */

const FOLDER = './';

//Versión callbacks
fs.readdir(FOLDER, (err, files) => {
    if ((err)) {
        console.log(err.message);
    } else {
        console.log('****************** CALLBACK *****************');
        console.log(files);

        files.forEach((file) => {
            console.table(file);
        })
        console.log("***************** FIN CALLBACK ***************");
    }
});

//Versión síncrona
try {
    const arrayOfFiles = fs.readdirSync(FOLDER)
    console.log('****************** CALLBACK 2 *****************');
    for (const file of arrayOfFiles) {
        console.table(file);
    }
    console.log("***************** FIN CALLBACK ***************");
} catch (error) {
    console.log(error.message);
}

fsPromises
    .readdir(FOLDER)
    .then(files => {
        console.log("*********** Promise *************");
        for (const file of files) {
            console.log(file);
        }
        console.log("********* End Promise ***********");
    })
    .catch((error) => {
        console.log(error.message);
    })

/**
 * 226 
 * 
 * 
 * 76
 * 195
 * 196
 * 179
 * 180
 */

/**
 * ┌────────────────────────────┐
├────────────────────────────┤
│              ┼             │
└──────────────┴─────────────┘
 */


