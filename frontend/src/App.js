import React from 'react'
import './App.css';
import { useState, useEffect } from 'react'
import Autores from './component/Autores';
import Form from './component/Form';

function App() {

  const [autores, setautores] = useState([])
  const [editdarautores, seteditarautores] = useState(null)
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

  const editarautores=(autor)=>{
    console.log(autor)
    seteditarautores(autor)
  }
  const openForm=()=>{
    seteditarautores({codigo:0,nombres:'',apellidos:''})
  }
  return (
    <div className="App">
      <div><button onClick={openForm} className="btn btn-success">InsertarAutor</button></div>
    <Autores autores={autores.Autores} editarautores={editarautores}/>
    {editdarautores?
    <Form autor={editdarautores} />
    :null}
   </div>
  );
}

export default App;
