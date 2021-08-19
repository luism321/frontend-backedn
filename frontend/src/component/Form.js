import React from 'react'
import { Input, FormLabel } from '@material-ui/core'
import { useState } from 'react'
import ApiresServi from './apirestServi'
import moment from 'moment';

moment.locale('es');


function Form(props) {
console.log(props.libro)
    const [nombres, setNombres] = useState(props.autor.nombres)
    const [apellidos, setApellidos] = useState(props.autor.apellidos)
    const [nombre_libro, setnombre_libro] = useState("")
    const [fecha, setfecha] = useState(moment().format("DD/MM/YYYY"))
    const [codigo, setcodigo] = useState(props.autor.codigo)
    const [id, setid] = useState(props.autor.id)

    const Actualizar = () => {
        ApiresServi.Actualizar(props.autor.codigo, { nombres, apellidos })
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    }

    const insertarAutor = () => {
        ApiresServi.InsertarAutores({ codigo, nombres, apellidos })
            .then(resp => console.log(resp))
            .catch(error => console.log(error))

    }
    const insertarlibro = () => {
        ApiresServi.InsertarLibro({ id, nombre_libro, fecha })
            .then(resp => console.log(resp))
            .catch(error => console.log(error))

    }
    return (
        <div>
            {props.autor.id?
            <div className="Formulario_Actualizar">
            <h4>Agregar libro</h4>
            <div className="Formulario_input">
                     <div className="Codigolibro">
                        <FormLabel htmlFor="title" >codigo</FormLabel>
                        <Input
                            type="text"
                            placeholder="Escriba el nombre del autor"
                            className="form-control"
                            value={id}
                            onChange={(e) => setid(e.target.value)}
                        /></div>
                <FormLabel htmlFor="title" >Libro</FormLabel>
                <Input
                    type="text"
                    placeholder="Nombre del libro"
                    className="form-control"
                    value={nombre_libro}
                    onChange={(e) => setnombre_libro(e.target.value)}
                />
                     <button className="mt-3
                        btn btn-success "
                        Style="width:100%"
                        onClick={insertarlibro}
                    >Insertar</button>
            </div>
        </div>
            :
            <div>
            {props.autor ? (
                <div className={props.autor.codigo ?"Formulario_Actualizar":"Formulario"}>
                    {props.autor.codigo ?
                        <div><h4>Actualizar</h4></div>
                        : <div><h4>Agregar nuevo</h4></div>}
                    <div className="Formulario_input">
                        {props.autor.codigo ?
                            ""
                            : <div>
                                <FormLabel htmlFor="title" >codigo</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Escriba el nombre del autor"
                                    className="form-control"
                                    value={codigo}
                                    onChange={(e) => setcodigo(e.target.value)}
                                /></div>}
                        <FormLabel htmlFor="title" >Nombre</FormLabel>
                        <Input
                            type="text"
                            placeholder="Escriba el nombre del autor"
                            className="form-control"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                        />
                        <FormLabel htmlFor="title" >Apellido</FormLabel>
                        <Input placeholder="Escriba el apellido del autor"
                            value={apellidos}
                            type="text"
                            className="form-control"
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                        {props.autor.codigo ?
                            <button className="mt-3
                    btn btn-warning "
                                Style="width:100%"
                                onClick={Actualizar}
                            >Actualizar</button>
                            : <button className="mt-3
                    btn btn-success "
                                Style="width:100%"
                                onClick={insertarAutor}
                            >Insertar</button>}
                    </div>
                </div>
            ) : null}
            ""
            </div>}

        </div>

    )
}

export default Form
