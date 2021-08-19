import React from 'react'
import { useState, useEffect } from 'react'
import Autores from './Autores'
import Form from './Form';
import 'jquery/src/jquery'; //for bootstrap.min.js
//bootstrap-theme file for bootstrap 3 only
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootswatch/dist/materia/bootstrap.min.css"

function Inicio() {

  const [autores, setautores] = useState([])
  const [editdarautores, seteditarautores] = useState(null)
  const [Añadirlibro, setañadirlibro] = useState(null)
  const [Ocultar, setOcultar] = useState("")
  
  const MostrarDatos=()=>{
    fetch('http://localhost:5000/Autores', {
      'methods': 'GET',
      headers: {
        'Content-Type': 'applications/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setautores(resp)
      )
      .catch(error => console.log(error))

  }
  useEffect(() => {
    MostrarDatos() 
  }, [])

  const actualizar = (autor) => {
    seteditarautores(autor)
    MostrarDatos() 
  }
 
  const openForm = () => {
    seteditarautores({ codigo: 0, nombres: '', apellidos: '' })
  }
  const VaciarForm = () => {
    seteditarautores(null)
  }

  const insertarAutor = (autor) => {
    MostrarDatos() 
  }
  const Elimi = (autor) => {
    MostrarDatos() 
  }
  const agregarlibro = (autor) => {
    setOcultar("1")
    seteditarautores({ id:autor.codigo, nombres: '', apellidos: '' })
  }
  const Ocultarf = (autor) => {
 
  }

  return (
    <div className="App">

      <div className="row mt-4">
      <div className="col-md-8">
            <Autores autores={autores.Autores} Eliminar={Elimi} editarautores={actualizar} Ocultarf={Ocultarf} agregarlibro={agregarlibro} />
            </div>
        <div className="col-md-4 text-center">
          {editdarautores ?
            <div className="boton_agregar"><img src="save_SVG.svg" title="Cerrar ventana" onClick={VaciarForm}/></div>
            : <div>
            <div className="boton_agregar"><img src="add_SVG.svg" onClick={openForm}/></div>
            <p>¿Desea añadiar un nuevo autor?</p>
            </div>
            }
          {Añadirlibro ?
          <Form autor={editdarautores}  insertarAutor={insertarAutor} agregarlibro={agregarlibro} actualizar={actualizar} libro={Añadirlibro} />
          : null}
          {editdarautores ?
            <Form autor={editdarautores}  insertarAutor={insertarAutor} agregarlibro={agregarlibro} actualizar={actualizar} libro={Añadirlibro} />
            : null}
        </div>

      </div>
    </div>
  );
}

export default Inicio;