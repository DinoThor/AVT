from   datetime import datetime
import sqlite3
import os

class DataService():
    def __init__(self, user):
        self.user          = user
        #self.credentials   TODO??: Cifrar base de datos mediante contraseña 
        self.con = None #Connection
        self.cur = None #Cursor
        self.initDB("database.db")
        self.checkRegId(user)

    """
        Inicialización/creación de la base de datos
        Si no existe el archivo, connect() lo crea.
        No hace falta tratar las excepciones
    """
    def initDB(self, db):
        file = f"DB\\{db}"
        self.con = sqlite3.connect(file)
        self.cur = self.con.cursor()

        if os.stat(file).st_size == 0: self.createDb()  

    """
        Comprueba si existe una entrada con el id del usuario
        en la tabla de registros dimensionales.
        En caso contrario, la crea automáticamente
    """
    def checkRegId(self, user):
        id = self.cur.execute("""SELECT u.id FROM usuario u, reg_dimensional rg WHERE u.id = rg.id""")
        if (id is None):
            self.cur.execute(f"INSERT INTO reg_dimensional(id) VALUES {user}")
            self.con.commit()

    """
        Crea las tablas necesarias en la base de datos.
        Este método se llamará solo cuando se cree de cero
        una nueva base de datos
    """
    def createDb(self):
        self.cur.executescript("""
            BEGIN
            CREATE TABLE usuario(id, nombre, edad, sexo, idioma_pref, email, telefono, persona_contacto)
            CREATE TABLE reg_dimensional(id, avg_arousal, avg_valence)
            CREATE TABLE detail(id, arousal, valence, fecha, evento)
            CREATE TABLE event(event_id, accion, comentarios)
            COMMIT
        """)

    """
        Inserta una nueva entrada en la tabla de detail
    """
    def insertDetail(self, arousalAvg, valenceAvg, fecha, evento=None):
        if evento is None:
            insert = f"INSERT INTO details(id, arousal, valence, fecha) VALUES({self.user}, {arousalAvg}, {valenceAvg}, {fecha})"
        else:
            insert = f"INSERT INTO details(id, arousal, valence, fecha, evento) VALUES({self.user}, {arousalAvg}, {valenceAvg}, {fecha}, {evento})"
        self.cur.execute(insert)