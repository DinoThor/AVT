from time import time, sleep

import sqlite3
import os
"""
    Clase DataService

    Será el punto de entrada para la información procedente
    del SDK, el calculo de medidas necesarias y su inyección
    en la BBDD
"""

class DataService():
    def __init__(self):
        self.arousalVector = []
        self.valenceVector = []

        self.initDB("database.db")

    

    def entryPoint(self, arousal, valence):
        self.arousalVector.append(arousal)
        self.valenceVector.append(valence)

    """
        Inicialización / creación de la base de datos
    """
    def initDB(self, db):
        file = f"..\\SQL\\{db}"
        self.con = sqlite3.connect(file)
        if (os.stat(file).st_size == 0): 
            self.createDb()
            
    def createDb(self):
        cur = self.con.cursor()
        commands = [
            "CREATE TABLE usuario(id, nombre, edad, sexo, idioma_pref, email, telefono, persona_contacto)",
            "CREATE TABLE reg_dimensional(id, avg_arousal, avg_valence, reg_detail)",
            "CREATE TABLE detail(reg_detail, arousal, valence, fecha, event)",
            "CREATE TABLE events(event_id, accion, comentarios)",
            "CREATE TABLE idiomas(idioma_id, idioma)"
        ]
        for c in commands: cur.execute(c)

    """
        Bucle principal de ejecución:
        -----------------------------
        Calculo del vector A/V medio en el lapso temporal
        indicado, inserción de datos en base de datos y 
        ejecución de las correspondientes acciones en caso
        de detectarse los "picos" anímicos
    """
    def calculate(self):
        print("CARLOS")