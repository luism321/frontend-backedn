import React from 'react'


export default class ApiresServi{
    static Actualizar(id,autores){
        console.log(autores)
            return fetch(`http://localhost:5000/Actualizar/${id}`, {
                'method': 'PUT',
                headers: {
                  'Content-Type':'application/json'
                },
                autores:JSON.stringify(autores)
            }) 
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))
    }
    static InsertarAutores(autores){
        console.log(autores)
            return fetch('http://localhost:5000/Register', {
                'method': 'POST',
                headers: {
                  'Content-Type':'application/json'
                },
                autores:JSON.stringify(autores)
            }) 
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))
    }
    static EliminarAutor(id){
        console.log(id)
            return fetch(`http://localhost:5000/Eliminar/${id}`, {
                'method': 'DELETE',
                headers: {
                  'Content-Type':'application/json'
                },
            }) 
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))
    }

}