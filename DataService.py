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

    def entryPoint(self, arousal, valence):
        self.arousalVector.append(arousal)
        self.valenceVector.append(valence)