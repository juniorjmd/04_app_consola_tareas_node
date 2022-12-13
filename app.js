import colors from 'colors';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, litadoTaresBorrar, confirmar, litadoTareasCheck } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
//const { pausa } = require('./helpers/mensajes');
//const { mostrarMenu } = require('./helpers/mensajes');

const main = async() => {
    const tareas = new Tareas;
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArr(tareasDB);
    }
    let opt = '';
    do {
        //opt = await mostrarMenu();
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion : ');
                tareas.crearTarea(desc);
                break;
            case '2':
                // console.log(tareas._listado);
                tareas.listadoCompleto()
                break;
            case '3':
                // console.log(tareas._listado);
                tareas.listarPendientesCompletadas(true)
                break;
            case '4':
                // console.log(tareas._listado);
                tareas.listarPendientesCompletadas(false)
                break;
            case '5':
                const ids = await litadoTareasCheck(tareas.listadoArr);
                console.log(ids);
                tareas.toogleCompletadas(ids);
                break;
            case '6':
                const id = await litadoTaresBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Esta seguro que desea borrar?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
                break;


        }
        guardarDB(JSON.stringify(tareas.listadoArr));
        // const tarea = new Tarea('Comprar comida');
        // console.log(tareas.listadoArr);
        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main();