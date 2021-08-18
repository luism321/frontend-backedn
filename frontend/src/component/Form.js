import React from 'react'
import { Input,FormLabel} from '@material-ui/core'
import { useState } from 'react'
import ApiresServi from './apirestServi'

function Form(props) {

    const[nombres,setNombres]=useState(props.autor.nombres)
    const[apellidos,setApellidos]=useState(props.autor.apellidos)
    const[codigo,setcodigo]=useState(props.autor.codigo)
const Actualizar=()=>{
    ApiresServi.Actualizar(props.autor.codigo,{nombres,apellidos})
    .then(resp=>console.log(resp))
    .catch(error=>console.log(error))
}
const InsertarAutor=()=>{
    ApiresServi.InsertarAutores({codigo,nombres,apellidos})
    .then(resp=>console.log(resp))
    .catch(error=>console.log(error))

}
    return (
        <div>
            {props.autor?(
                <div className="mb-3">
                    <FormLabel htmlFor="title" >Nombre</FormLabel>
                    <Input 
                    type="text" 
                    placeholder="Escriba el nombre del autor" 
                    className="form-control" 
                    value={nombres}
                    onChange={(e)=>setNombres(e.target.value)}
                    />
                    <FormLabel htmlFor="title" >codigo</FormLabel>
                    <Input 
                    type="text" 
                    placeholder="Escriba el nombre del autor" 
                    className="form-control" 
                    value={codigo}
                    onChange={(e)=>setcodigo(e.target.value)}
                    />
                    <FormLabel htmlFor="title" >Apellidos</FormLabel>
                    <Input placeholder="Escriba el Apellido del autor"
                    value={apellidos}
                    type="text"
                    className="form-control"
                    onChange={(e)=>setApellidos(e.target.value)}
                    />
                    {props.autor.codigo?
                    <button variant="contained" color="primary" 
                    onClick={Actualizar}
                    >Actualizar</button>
                    :<button variant="contained" color="primary" 
                    onClick={InsertarAutor}
                    >Insertar</button>}
                </div>

            ):null}
            
        </div>
    )
}

export default Form
