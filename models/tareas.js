import { Tarea } from "./tarea.js";

export class Tareas {
    _listado = {}
    constructor() {
        this._listado = {};
    }
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }
    crearTarea(desc = '') {
        ///  console.log('tarea tiluto a crear', desc);
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    cargarTareasFromArr(arr = []) {
        arr.forEach(value => {
            this._listado[value.id] = value;
        })
    }
    listadoCompleto() {
        const list = this.listadoArr;
        list.forEach((tarea, index) => {

            const aux = `${ index + 1}.`.green

            const estado = (tarea.completadaEn) ?
                'Completada'.green :
                'Pendiente'.red

            console.log(`${aux} ${ tarea.desc } ::: ${estado}.`)

        })
    }
    listarPendientesCompletadas(completadas = true) {
        const list = this.listadoArr;
        let aux = 0
        list.forEach((tarea) => {
            const estado = (tarea.completadaEn) ?
                tarea.completadaEn.green :
                'Pendiente'.red

            const estadoAux = (tarea.completadaEn) ?
                true :
                false;

            if (completadas === estadoAux) {
                aux = aux + 1;
                console.log(`${(aux.toString() + '.' ).green} ${ tarea.desc } ::: ${estado}.`)
            }

        })
    }

    toogleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadaEn) {
                tarea.completadaEn = new Date().toISOString();
            }

        })
        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                //  console.log('no incluida', tarea.id);
                this._listado[tarea.id].completadaEn = null;
            }

        })
    }
}