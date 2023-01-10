from datetime import datetime
import sqlite3
import os
"""
    Clase DataService

    Será el punto de entrada para la información procedente
    del SDK, el calculo de medidas necesarias y su inyección
    en la BBDD
"""

class DataService():
    def __init__(self, user):
        self.arousalVector = []
        self.valenceVector = []

        self.initDB("database.db")
        self.regId = self.getRegId(user)

    def getRegId(self, user):
        cur = self.con.cursor()
        query = "SELECT u.id, rg.id FROM reg_dimensional rg, usuario u WHERE u.id = rg.id"
        id = cur.execute(query)
        if (id is None):
            self.cur.execute(f"INSERT INTO reg_dimensional(id) VALUES {user}")
            self.con.commit()
        return(user)

    """
        Endpoint entrada datos desde el handler del SDK
    """
    def entryPoint(self, arousal, valence):
        self.arousalVector.append(arousal)
        self.valenceVector.append(valence)

    """
        Inicialización / creación de la base de datos
    """
    def initDB(self, db):
        file = f"..\\DB\\{db}"
        """
            Si no existe el archivo, connect() lo crea
            No hace falta tratar las excepciones
        """
        self.con = sqlite3.connect(file)
        if os.stat(file).st_size == 0: self.createDb()
            
    def createDb(self):
        cur = self.con.cursor()
        commands = [
            "CREATE TABLE usuario(id, nombre, edad, sexo, idioma_pref, email, telefono, persona_contacto)",
            "CREATE TABLE reg_dimensional(id, avg_arousal, avg_valence)",
            "CREATE TABLE detail(id, arousal, valence, fecha, evento)",
            "CREATE TABLE events(event_id, accion, comentarios)"
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
        try:
            avg_arousal = sum(self.arousalVector) / len(self.arousalVector)
            avg_valence = sum(self.valenceVector) / len(self.valenceVector)

        except ZeroDivisionError:
            avg_arousal, avg_valence = 0

        date = datetime.now()
        print(avg_arousal, avg_valence, date)
        return
        insertDetail = f"INSERET INTO detail_id(arousal, valence, fecha) VALUES({avg_arousal}, {avg_valence}, {date})"
        insertRegDet = f"INSERT INTO reg_details()"