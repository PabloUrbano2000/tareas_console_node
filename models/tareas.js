/*
* _listado:
*       {uuid-434343-3434: {id: 'xxxxxx' ,... }}

*/

import Tarea from "./tarea.js";

import "colors";

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }
  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
    return tarea;
  }

  listadoCompleto() {
    console.log("\n");
    this.listadoArr.forEach((tarea, index = 0) => {
      console.log(
        `${(index + 1)?.toString()?.green}. ${tarea?.desc} :: ${
          tarea?.completadoEn ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log("\n");
    let contador = 1;
    this.listadoArr.forEach((tarea) => {
      if (completadas && tarea.completadoEn) {
        console.log(
          `${contador?.toString()?.green}. ${tarea?.desc} :: ${
            tarea?.completadoEn.green
          }`
        );
        contador++;
      } else if (!completadas && !tarea.completadoEn) {
        console.log(
          `${contador?.toString()?.green}. ${tarea?.desc} :: ${"Pendiente".red}`
        );
        contador++;
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export default Tareas;
