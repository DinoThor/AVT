import sqlite3
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

    def initDB(self, db):
        self.con = sqlite3.connect(f"..\\SQL\\{db}")

    def entryPoint(self, arousal, valence):
        self.arousalVector.append(arousal)
        self.valenceVector.append(valence)

    """
        Bucle principal de ejecución:
        -----------------------------
        Calculo del vector A/V medio en el lapso temporal
        indicado, inserción de datos en base de datos y 
        ejecución de las correspondientes acciones en caso
        de detectarse los "picos" anímicos
    """
    def run(self):
        pass