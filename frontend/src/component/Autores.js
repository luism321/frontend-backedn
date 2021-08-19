import React from "react"
import Button from '@material-ui/core/Button';
import ApiresServi from './apirestServi';
import { useState } from 'react'

function Autores(props) {

    const [leerLibros, setLeerLibros] = useState([])

    const editarautores = (autor) => {
        props.editarautores(autor)
    }

    const agregarlibro= (autor) => {
        props.agregarlibro(autor)
    }


    const eliminarAutor = (autor) => {
        ApiresServi.EliminarAutor(autor.codigo)
            .then(() => console.log(autor))

    }

    const ListarLibros = (e) => {
        console.log(leerLibros)
        fetch(`http://localhost:5000/leer/${e}`, {
            'methods': 'GET',
            headers: {
                'Content-Type': 'applications/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setLeerLibros(resp)
            .then(resp => console.log(resp))
            )
            .catch(error => console.log(error))
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


    return (
        <div>
            {leerLibros.libros ?
                <div>
                    {leerLibros.libros ? (
                        leerLibros.libros.map(libro => (
                            <div>
                            <div key={libro.codigo} className="datos_peli">
                            <div className="boton_Eliminar"><img src="save_SVG.svg" onClick={()=>Eliminar_peli(libro.codigo)} title="Eliminar"/></div>
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
                            </div>
                        )))
                        : (<di></di>)}
                </div>

                :
                <div>
                    {props.autores ? (
                        props.autores.map(autor => (
                            <div key={autor.codigo} className="datos">
                                <div className="libros">
                                    <div className="datos_f">
                                        <div className="titulos">
                                            <div className="Nombrs">
                                                <label>Autor</label>
                                                <p>{autor.nombres}&nbsp;&nbsp;&nbsp;
                                                {autor.apellidos}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="Botones text-center">
                                            <Button variant="outlined" color="default"
                                                onClick={() => editarautores(autor)}
                                            >Actualizar</Button>
                                            <Button variant="outlined" color="default"
                                                onClick={() => ListarLibros(autor.codigo)}
                                            >Ver libros</Button>
                                            <Button variant="outlined"
                                                color="secondary"
                                                onClick={() => eliminarAutor(autor)}
                                            >Eliminar</Button>
                                            <Button variant="outlined"
                                                color="default"
                                                onClick={() => agregarlibro(autor)}
                                            >Añadir libro</Button>
                                            <Button variant="outlined"
                                                color="default"
                                                onClick={() => eliminarAutor(autor)}
                                            >Reportes excel</Button>
                                        </div>
                                    
                                </div>
                            </div>
                        )))
                        : (<di></di>)}</div>}






        </div>
    );

}
export default Autores