import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

const DATABASE_NAME = "userDataBase.db";
enablePromise(true);

/**
 * Genera una nueva conexión a base de datos.
 * Si la aplicación se ejecuta por primera vez,
 * partirá de la base de datos ya prepoblada con
 * las táblas y valores necesarios
 * @returns db connection
 */
export async function getDBConnection() {
  return openDatabase({
    name: DATABASE_NAME,
    location: 'default',
    createFromLocation: '~www/' + DATABASE_NAME
  },
    () => { },
    (err) => console.log(err));
}


/**
 * Devuelve los contextos guardados en la base de datos prepoblada
 * @returns List with saved context
 */
export async function getContext() {
  const db = await getDBConnection();
  const context = [];
  
  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT * from contexto',
      [],
      (tx, result) => {
        for (let i = 0; i < result.rows.length; i++) {
          context.push(result.rows.item(i))
        }
      },
      (err) => console.log(err)
    );
  })
  return context;
};



export const insertAV = async (db, session, values) => {
  var date = new Date();
  db.transaction(function (txn) {
    txn.executeSql(
      "INSERT INTO AV(id, arousal, valence, fecha) VALUES (?,?,?,?)",
      [session, values["arousal"], values["valence"], date.toISOString()]
    )
  })
}

export const insertSesion = async (db, user, estadoAfectivo, contexto) => {

}

export const selectEstado = (db, estado) => {
  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM estadoAfectivo WHERE id_estado = ?",
      [estado],
      (tx, results) => {
        results.rows.item(0)
      }
    )
  })
}

export const update = async (db, table, item) => {

}


