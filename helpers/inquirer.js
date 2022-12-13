import inquirer from 'inquirer';

import colors from 'colors';

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [{ value: '1', name: `${'1.'.green } Crear tarea.` },
        { value: '2', name: `${'2.'.green } Listar tareas.` },
        { value: '3', name: `${'3.'.green } Listar tareas completadas.` },
        { value: '4', name: `${'4.'.green } Listar tareas pendientes.` },
        { value: '5', name: `${'5.'.green } Completar tarea(s).` },
        { value: '6', name: `${'6.'.green } Borrar tarea.` },
        { value: '0', name: `${'0.'.green } Salir.` },
    ]



}]

const litadoTareasCheck = async(tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const cont = ((index + 1) + '.').green;
        return {
            value: tarea.id,
            name: `${cont} ${tarea.desc}`,
            checked: (tarea.completadaEn) ? true : false
        }
    })


    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'selec',
        choices



    }]
    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

const litadoTaresBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const cont = ((index + 1) + '.').green;
        return {
            value: tarea.id,
            name: `${cont} ${tarea.desc}`
        }
    })
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const borrar = [{
        type: 'list',
        name: 'opcionBorrar',
        message: 'Borrar',
        choices



    }]
    const { opcionBorrar } = await inquirer.prompt(borrar);
    return opcionBorrar;
}

const inquirerMenu = async() => {
    console.clear()
    console.log('======================================'.green);
    console.log('=        Seleccione una opcion       ='.green);
    console.log('======================================'.green);
    //  inquirer
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const pausa = async() => {
    const { pausa } = await inquirer.prompt([{
        type: 'input',
        name: 'opcion',
        message: `Presiona ${'ENTER'.green } para continuar.`

    }]);
    return pausa;
}


export {
    inquirerMenu,
    pausa,
    leerInput,
    litadoTaresBorrar,
    confirmar,
    litadoTareasCheck
}