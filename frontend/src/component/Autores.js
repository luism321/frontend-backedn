import react from 'react'
import Button from '@material-ui/core/Button';
import ApiresServi from './apirestServi';

function Autores(props) {
    const editarautores=(autor)=>{
        props.editarautores(autor)
    }

    const eliminarAutor=(autor)=>{
        ApiresServi.EliminarAutor(autor.codigo)
        .then(()=>props.eliminarAutor(autor))

    }
    return (
        <div>
            {props.autores ? (
                props.autores.map(autor => (
                    <div key={autor.codigo} className="libros">
                        <p>{autor.nombres}</p>
                        <p>{autor.apellidos}</p>
                        <div className="row">
                            <div className="col-md-1">
                                <Button variant="contained" color="default"
                                onClick={()=>editarautores(autor)}
                                >Actualizar</Button>
                            </div>
                            <div className="col">
                            <Button variant="contained"
                            color="secondary"
                            onClick={()=>eliminarAutor(autor)}
                            >Eliminar</Button></div>
                        </div>
                    </div>

                )))
                : (<di></di>)}

        </div>
    );

}
export default Autores