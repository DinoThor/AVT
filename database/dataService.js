// import { openDatabase } from 'react-native-sqlite-storage';

// export const getDBConnection = async () => {
//   return openDatabase({
//     name: 'database.db',
//     location: 'default'
//   })
// }

// export const insertAV = async (db, session, values) => {
//   var date = new Date();
//   db.transaction(function (txn) {
//     txn.executeSql(
//       "INSERT INTO AV(id, arousal, valence, fecha) VALUES (?,?,?,?)",
//       [session, values["arousal"], values["valence"], date.toISOString()]
//     )
//   })
// }

// export const insertSesion = async (db, user, estadoAfectivo, contexto) => {

// }

// export const selectEstado = (db, estado) => {
//   db.transaction(function (txn) {
//     txn.executeSql(
//       "SELECT name FROM estadoAfectivo WHERE id_estado = ?",
//       [estado],
//       (tx, results) => {
//         results.rows.item(0)
//       }
//     )
//   })
// }

// export const update = async (db, table, item) => {

// }


