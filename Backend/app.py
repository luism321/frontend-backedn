  
from flask import Flask, jsonify, request
from config import config
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
conexion = psycopg2.connect("host='localhost' user='postgres' password='labest21' dbname='api_libros'")
CORS(app)

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
        sql = "SELECT codigo, nombres, apellidos  FROM autores WHERE codigo = '{0}'".format(codigo)
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
        curso = leer_autores_bd(codigo)
        if curso != None:
            return jsonify({'curso': curso, 'mensaje': "Curso encontrado."})
        else:
            return jsonify({'mensaje': "Curso no encontrado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/Register', methods=['POST'])
def registrar_curso():
        try:
            codi=request.json['Codigo']
            name=request.json['nombres']
            apelli=request.json['apellidos']
            cursor = conexion.cursor()
            cursor.execute("INSERT INTO autores (codigo, nombres, apellidos) VALUES(%s, %s,%s)",(int(codi),name,apelli))
            conexion.commit()  # Confirma la acción de inserción.
            return jsonify({'mensaje': "Curso registrado."})
        except Exception as ex:
            return jsonify({'mensaje': "Error"})


@app.route('/Actualizar/<codigo>', methods=['PUT'])
def Actualizar(codigo):
        try:
            print(codigo)
            cursor = conexion.cursor()
            name=request.json['nombres']
            print(name)
            apellido=request.json['apellidos']
            cursor.execute( """UPDATE autores SET nombres = '{name}', apellidos = '{apelli}'
            WHERE codigo = '{codigo}'""".format(name=name,apelli=apellido ,codigo=int(codigo)))
            conexion.commit()  # Confirma la acción de actualización.
            return jsonify({'mensaje': "Curso actualizado."})
        except Exception as ex:
            return jsonify({'mensaje': "Error"})

@app.route('/Eliminar/<codigo>', methods=['DELETE'])
def eliminar_curso(codigo):
    try:
            cursor = conexion.cursor()
            cursor.execute("DELETE FROM autores WHERE codigo = '{codigo}'".format(codigo=int(codigo)))
            conexion.commit()  # Confirma la acción de eliminación.
            return jsonify({'mensaje': "Curso eliminado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})


def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()