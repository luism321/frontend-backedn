  
from flask import Flask, jsonify, request
from config import config
import psycopg2
from flask_cors import CORS
import requests
import flask_excel as excel


app = Flask(__name__)
conexion = psycopg2.connect("host='localhost' user='postgres' password='labest21' dbname='api_libros'")
CORS(app)
excel.init_excel(app)

@app.route('/Autores', methods=['GET'])
def listar_cursos():
    try:
        cursor = conexion.cursor()
        sql = "SELECT codigo, nombres, apellidos FROM autores"
        cursor.execute(sql)
        datos = cursor.fetchall()
        cursos = []
        for fila in datos:
            curso = {'codigo': fila[0], 'nombres': fila[1], 'apellidos': fila[2]}
            cursos.append(curso)
        return jsonify({'Autores':cursos})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})


def leer_autores_bd(codigo):
    try:
        cursor = conexion.cursor()
        sql = "SELECT codigo, nombres, apellidos  FROM libros WHERE codigo = '{0}'".format(codigo)
        cursor.execute(sql)
        datos = cursor.fetchone()
        if datos != None:
            curso = {'codigo': datos[0], 'nombres': datos[1], 'apellidos': datos[2]}
            return curso
        else:
            return None
    except Exception as ex:
        raise ex


@app.route('/leer/<codigo>', methods=['GET'])
def leer_autores(codigo):
    try:
        cursor = conexion.cursor()
        cursor.execute("SELECT id,nombre_libro, fecha  FROM libros WHERE codigo = '{0}'".format(codigo))
        datos = cursor.fetchall()
        if datos==[]:
            return jsonify({'libros':""})
        libros = []
        for fila in datos:
            curso = {'codigo':fila[0],'nombre_libro': fila[1], 'fecha': fila[2]}
            libros.append(curso)
        return jsonify({'libros':libros})
        
    except Exception as ex:
        print(ex)
        raise ex

@app.route('/Register', methods=['POST'])
def registrar_curso():
    if request.method == 'POST':
        try:
            datos=request.get_json()
            print(datos)
            cursor = conexion.cursor()
            cursor.execute("INSERT INTO autores (codigo, nombres, apellidos) VALUES(%s, %s,%s)",(int(datos['codigo']),datos['nombres'],datos['apellidos']))
            conexion.commit()  # Confirma la acción de inserción.
            return jsonify({'mensaje': "Curso registrado."})
        except Exception as ex:
            print(ex)
            return jsonify({'mensaje': "Error"})


@app.route('/Register_libros/<id>', methods=['POST'])
def registrar_Libros(id):
    if request.method == 'POST':
        try:
            datos=request.get_json()
            print(datos)
            cursor = conexion.cursor()
            cursor.execute("INSERT INTO libros (codigo, nombre_libro, fecha) VALUES(%s, %s,%s)",(int(datos['id']),datos['nombre_libro'],datos['fecha']))
            conexion.commit()  # Confirma la acción de inserción.
            return jsonify({'mensaje': "Curso registrado."})
        except Exception as ex:
            print(ex)
            return jsonify({'mensaje': "Error"})


@app.route('/Actualizar/<codigo>',methods=['PUT'])
def Actualizar(codigo):
    if request.method == 'PUT':
        try:
            datos=request.get_json()
            print(datos)
            cursor = conexion.cursor()
            cursor.execute( """UPDATE autores SET nombres = '{name}', apellidos = '{apelli}'
            WHERE codigo = '{codigo}'""".format(name=datos['nombres'],apelli=datos['apellidos'] ,codigo=int(codigo)))
            conexion.commit()  # Confirma la acción de actualización.
            return jsonify({'mensaje': "Curso actualizado."})
        except Exception as ex:
            print(ex)
            return jsonify({'mensaje': "Error"})
    else:
        return 'Form submission failed'


@app.route('/Eliminar/<codigo>', methods=['DELETE'])
def eliminar_autor(codigo):
    try:
            cursor = conexion.cursor()
            cursor.execute("DELETE FROM autores WHERE codigo = '{codigo}'".format(codigo=int(codigo)))
            conexion.commit()  # Confirma la acción de eliminación.
            return jsonify({'mensaje': "Curso eliminado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/Eliminar_libros/<codigo>', methods=['DELETE'])
def eliminar_libros(codigo):
    try:
            cursor = conexion.cursor()
            cursor.execute("DELETE FROM libros WHERE id = '{codigo}'".format(codigo=int(codigo)))
            conexion.commit()  # Confirma la acción de eliminación.
            return jsonify({'mensaje': "Curso eliminado."})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': "Error"})


def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()