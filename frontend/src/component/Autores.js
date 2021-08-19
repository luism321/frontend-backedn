import React from "react"
import Button from '@material-ui/core/Button';
import ApiresServi from './apirestServi';
import { useState } from 'react'

function Autores(props) {

    const [leerLibros, setLeerLibros] = useState([])

    const editarautores = (autor) => {
        props.editarautores(autor)
    }
    const eliminarAutor = (autor) => {
        ApiresServi.EliminarAutor(autor.codigo)
            .then(resp => props.Eliminar(resp))
    }

    const ListarLibros = (e) => {
        props.Ocultarf("1")
        console.log(leerLibros)
        fetch(`http://localhost:5000/leer/${e}`, {
            'methods': 'GET',
            headers: {
                'Content-Type': 'applications/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setLeerLibros(resp))
            .then(resp => console.log(resp))

            .catch(error => console.log(error))
    }

    const agregarlibro = (autor) => {
        props.agregarlibro(autor)
    }

    const Eliminar_peli = (e) => {

        fetch(`http://localhost:5000/Eliminar_libros/${e}`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setLeerLibros(resp)
                .then(resp => console.log(resp))
            )
            .catch(error => console.log(error))
    }
    const OcultarLibros=()=>{
        setLeerLibros([])
    }


    return (
        <div>
            {leerLibros.libros ?
                <div className="">
                    <div className="boton_agregar text-right"><img src="save_SVG.svg" onClick={OcultarLibros}/></div>
                    <div className="dash-cards mt-5">
                        {leerLibros.libros !== "" ? (
                            leerLibros.libros.map(libro => (
                                <div key={libro.codigo} className="card-single mb-5">
                                    <div className="boton_Eliminar"><img src="save_SVG.svg" onClick={() => Eliminar_peli(libro.codigo)} title="Eliminar" /></div>
                                    <div className="libros">
                                        <div className=" datos_f_peli">
                                            <div className="">
                                                <div className="Title_peli">
                                                    <p>{libro.nombre_libro}</p>
                                                </div>
                                                <div className="Title_fecha">
                                                    <p>{libro.fecha}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))
                            : (<div>
                            </div>)}
                    </div>
                </div>
                :
                <div>
                    <div className="col-md-12">
                        <div className="Panel_Autores">
                            {props.autores ? (
                                props.autores.map(autor => (
                                    <div key={autor.codigo} className="datos">
                                        <div className="libros">
                                            <div className="datos_f ">
                                                <div className="titulos">
                                                    <div className="Nombrs form-inline">
                                                        <div><label>Autor</label> </div>&nbsp;&nbsp;&nbsp;
                                                        <div className="title">{autor.nombres}&nbsp;
                                                            {autor.apellidos}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Botones">
                                                <div className="form-inline">
                                                <div className="mr-2"><Button variant="outlined" color="default"
                                                    onClick={() => editarautores(autor)}
                                                >Actualizar</Button></div>
                                                <Button variant="outlined" color="default"
                                                    onClick={() => ListarLibros(autor.codigo)}
                                                >Ver libros</Button>
                                               <div className="ml-2"> <Button variant="outlined"
                                                    color="secondary"
                                                    onClick={() => eliminarAutor(autor)}
                                                >Eliminar</Button></div>
                                                <div className="ml-2"><Button variant="outlined"
                                                    color="default"
                                                    onClick={() => eliminarAutor(autor)}
                                                >Reportes excel</Button></div>
                                                <div className="ml-2"><Button variant="outlined"
                                                    color="default"
                                                 onClick={() => agregarlibro(autor)} >Añadir libro</Button>
                                                </div>
                                                </div>
                                            </div>
                                           

                                        </div>
                                    </div>
                                )))
                                : (<di></di>)}</div>
                    </div>
                </div>}







        </div>
    );

}
export default Autores