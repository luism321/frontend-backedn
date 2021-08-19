import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import Autores from './component/Autores';
import Form from './component/Form';
import 'jquery/src/jquery'; //for bootstrap.min.js
//bootstrap-theme file for bootstrap 3 only
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "bootswatch/dist/materia/bootstrap.min.css"

function App() {

  const [autores, setautores] = useState([])
  const [editdarautores, seteditarautores] = useState(null)
  const [Añadirlibro, setañadirlibro] = useState(null)

  useEffect(() => {
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
      
  }, [])

  const editarautores = (autor) => {
    console.log(autor)
    seteditarautores(autor)
  }
 
  const openForm = () => {
    seteditarautores({ codigo: 0, nombres: '', apellidos: '' })
  }
  const VaciarForm = () => {
    seteditarautores(null)
  }

  const insertarAutor = (autor) => {
    console.log(autor)
  }
  const agregarlibro = (autor) => {
    console.log(autor)
    seteditarautores({ id:autor.codigo, nombres: '', apellidos: '' })
  }
  return (
    <div className="App">
      <div className="row">
        <div className="col-md-8">
          <div className="Panel_Autores">
            <Autores autores={autores.Autores} editarautores={editarautores} agregarlibro={agregarlibro} />
          </div>
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
          <Form autor={editdarautores} insertarAutor={insertarAutor} libro={Añadirlibro} />
          : null}
          {editdarautores ?
            <Form autor={editdarautores} insertarAutor={insertarAutor} libro={Añadirlibro} />
            : null}
        </div>

      </div>
    </div>
  );
}

export default App;
