import {
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  pausa,
  confirmar,
  mostrarListadoChecklist,
} from "./helpers/inquirer.js";

import "colors";
import Tareas from "./models/tareas.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

const main = async () => {
  console.clear();
  let opt = "";

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    // Establecer
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprimir menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // crear opcion
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;
      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
