import React from "react"


export default class ApiresServi{
    static Actualizar(id,autores){
            return fetch(`http://localhost:5000/Actualizar/${id}`, {
                'method': 'PUT',
                headers: {
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(autores)
            }) 
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
    }


    static InsertarAutores(autores){
        console.log(autores)
            return fetch('http://localhost:5000/Register', {
                'method': 'POST',
                headers: {
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(autores)
            }) 
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
    }
    static InsertarLibro(autores){
        console.log(autores)
            return fetch(`http://localhost:5000/Register_libros/${autores.id}`, {
                'method': 'POST',
                headers: {
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(autores)
            }) 
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
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