import sqlite3
import os
from DB.commands import query
from DB.commands import insert
from DB.commands import createDataBase


class DataService:
    def __init__(self, user):
        self.user = user
        self.con = None
        self.cur = None
        self.initDB("databaseDev.db")


    def initDB(self, db):
        file = f"DB\\{db}"
        self.con = sqlite3.connect(file, check_same_thread=False)
        self.cur = self.con.cursor()

        if os.stat(file).st_size == 0:
            self.createDb()

        userId = self.cur.execute(query["searchUser"], (self.user,)).fetchone()
        print(userId)
        if userId is None:
            self.createUser("test", 30, "Male")

        regId = self.cur.execute(query["searchReg"], (self.user,)).fetchone() 
        if regId is None:
            self.cur.execute(insert["insertReg"], (self.user,))
            self.con.commit()

    def createDb(self):
        self.cur.executescript(createDataBase)

    def createUser(self, nombre, edad, sexo,
                   idioma=None, email=None, telefono=None, p_contacto=None):
        try:
            self.cur.execute(insert["insertUser"],
                             (nombre, edad, sexo, idioma, email, telefono, p_contacto))
            self.con.commit()
        except:
            pass

        return self.cur.lastrowid

    """
        Inserta una nueva entrada en la tabla de detail
    """

    def insertDetail(self, arousalAvg, valenceAvg, fecha, evento=None):
        self.cur.execute(insert["insertDetail"],
                         (arousalAvg, valenceAvg, fecha, evento))
        self.con.commit()

    # def updateRegDim(self, arousal, valence):
    #     query = f"""
    #         SELECT avg_arousal, avg_valence
    #         FROM reg_dimensional
    #         WHERE id = {self.user}
    #     """
    #     self.cur.execute(query)
    #     avgArousal, avgValence = self.cur.fetchall()[0]
    #     avgArousal = (avgArousal + arousal) / 2
    #     avgValence = (avgValence + valence) / 2
    #
    #     update = f"""
    #         UPDATE reg_dimensional
    #         SET avg_arousal = {avgArousal},
    #             avg_valence = {avgValence}
    #         WHERE
    #             id = {self.user}
    #     """
    #     self.cur.execute(update)
    #     self.con.commit()
