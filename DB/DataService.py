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

    """
        Inicialización/creación de la base de datos
        Si no existe el archivo, connect() lo crea.
        No hace falta tratar las excepciones
    """
    def initDB(self, db):
        file     = f"DB\\{db}"
        self.con = sqlite3.connect(file, check_same_thread = False)
        self.cur = self.con.cursor()

        if os.stat(file).st_size == 0: self.createDb()  
        self.checkRegId()

    """
        Comprueba si existe una entrada con el id del usuario
        en la tabla de registros dimensionales.
        En caso contrario, la crea automáticamente
    """
    def checkRegId(self):
        exe = self.cur.execute(f"""
            SELECT u.id 
            FROM usuario u, reg_dimensional rg 
            WHERE u.id = rg.id AND u.id = {self.user}
        """)
        id = exe.fetchone()
        if (id is None):
            self.cur.execute(f"INSERT INTO reg_dimensional(id, avg_arousal, avg_valence) VALUES ({self.user}, 0, 0)")
            self.con.commit()

    """
        Crea las tablas necesarias en la base de datos.
        Este método se llamará solo cuando se cree de cero
        una nueva base de datos
    """
    def createDb(self):
        self.cur.executescript(
        """
            BEGIN;
            CREATE TABLE IF NOT EXISTS usuario (
                id integer PRIMARY KEY, 
                nombre text NOT NULL AUTO_INCREMENT, 
                edad integer NOT NULL, 
                sexo text NOT NULL, 
                idioma_pref text, 
                email text, 
                telefono integer, 
                persona_contacto integer
            );
            CREATE TABLE IF NOT EXISTS reg_dimensional (
                id integer PRIMARY KEY, 
                avg_arousal float NOT NULL, 
                avg_valence float NOT NULL
            );
            CREATE TABLE IF NOT EXISTS detail (
                id integer NOT NULL, 
                arousal float NOT NULL, 
                valence float NOT NULL, 
                fecha datetime NOT NULL, 
                evento integer
            );
            CREATE TABLE IF NOT EXISTS event (
                event_id integet PRIMARY KEY, 
                accion integer NOT NULL, 
                comentarios text NOT NULL
            );
            COMMIT;
        """)


    """
        Crea la entrada del usuario
    """
    def createUser(self, nombre, edad, sexo, 
                    idioma = None, email = None, telefono = None, p_contacto = None):
        insert = f"""
            INSERT INTO usuario
            (nombre, edad, sexo, idioma_pref, email, telefono, persona_contacto)
            VALUES
            ({nombre}, {edad}, {sexo}, {idioma}, {email}, {telefono}, {p_contacto})
        """
        try:
            self.cur.execute(insert)
            self.con.commit()
        except:
            pass

        return self.cur.lastrowid

    """
        Inserta una nueva entrada en la tabla de detail
    """
    def insertDetail(self, arousalAvg, valenceAvg, fecha, evento=None):
        if evento is None:
            insert = f"""
            INSERT INTO detail(id, arousal, valence, fecha) 
            VALUES({self.user}, {arousalAvg}, {valenceAvg}, '{fecha}')
        """
        else:
            insert = f"""
            INSERT INTO detail(id, arousal, valence, fecha, evento) 
            VALUES({self.user}, {arousalAvg}, {valenceAvg}, {fecha}, {evento})
        """
        
        self.cur.execute(insert)
        self.con.commit()

    """
        Actualiza la media del registro dimensional
    """
    def updateRegDim(self, arousal, valence):
        query = f"""
            SELECT avg_arousal, avg_valence 
            FROM reg_dimensional 
            WHERE id = {self.user}
        """
        self.cur.execute(query)
        avgArousal, avgValence = self.cur.fetchall()[0]
        avgArousal = (avgArousal + arousal) / 2
        avgValence = (avgValence + valence) / 2
        
        update = f"""
            UPDATE reg_dimensional
            SET avg_arousal = {avgArousal},
                avg_valence = {avgValence}
            WHERE
                id = {self.user}
        """
        self.cur.execute(update)
        self.con.commit()