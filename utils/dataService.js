import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

const DATABASE_NAME = "userDataBase.db";
enablePromise(true);


//*************************************
//************* QUERYS ****************
//*************************************
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


/**
 * Devuelve los estados afectivos guardados en la base de datos prepoblada
 * @returns {list}
 */
export async function getMood() {
  const db = await getDBConnection();
  const mood = [];

  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT * FROM estadoAfectivo',
      [],
      (tx, result) => {
        for (let i = 0; i < result.rows.length; i++) {
          mood.push(result.rows.item(i))
        }
      },
      (err) => console.log(err)
    );
  })
  return mood;
}


/**
 * Devuelve el Id de la última tabla insertada.
 * @returns {Integed} Id
 */
async function lastId() {
  const db = await getDBConnection();
  const id = [];
  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT last_insert_rowid()',
      [],
      (tx, result) => {
        for (let i = 0; i < result.rows.length; i++) {
          id.push(result.rows.item(i)["last_insert_rowid()"])
        }
      },
      (err) => console.log(err)
    );
  })
  return id;
}


/**
 * Devuelve una tupla con la información de todas 
 * las sesiones y sus registros AV correspondientes.
 * @return {List} Sesion/AV
 */
export async function backupData() {
  const db = await getDBConnection();
  const sesiones = []; const AV = [];

  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT * FROM sesion',
      [],
      (tx, results) => {
        for(let i = 0; i < results.rows.length; i++) {
          sesiones.push(results.rows.item(i));
        }
      },
      (err) => console.log(err)
    );

    txn.executeSql(
      'SELECT * FROM AV',
      [],
      (tx, results) => {
        for(let i = 0; i < results.rows.length; i++){
          AV.push(results.rows.item(i));
        }
      },
      (err) => console.log(err)
    );
  });

  return [sesiones, AV];
}


//*************************************
//************* INSERTS ***************
//*************************************
/**
 * Crea una sesión en base de datos por rellenar. 
 */
export async function createSesion() {
  const db = await getDBConnection();

  await db.transaction((txn) => {
    txn.executeSql(
      'INSERT INTO sesion (id_estado, id_contexto, id_estado_final) VALUES (?,?,?)',
      [0,0,0],
      (tx, result) => { },
      (err) => console.log(err)
    )
  })
  return lastId();
};


/**
 * Guarda en base de datos la muestra detectada
 * @param {SQLite connection} db 
 * @param {Integer} id 
 * @param {Val dic} values 
 */
export async function storeAV(db, id, values) {
  await db.transaction((txn) => {
    txn.executeSql(
      'INSERT INTO AV(id_sesion, arousal, valence, fecha) VALUES (?,?,?,?)',
      [id, values['arousal'], values['valence'], new Date().toISOString()],
      (tx, result) => { console.log(result) },
      (err) => console.log(err)
    )
  })
}


//*************************************
//************* UPDATES ***************
//*************************************
/**
 * Guarda en la entrada de sesión el contexto y estado afectivo
 * seleccionados (sin finalizar).
 * @param {Integer} mood 
 * @param {Integer} context 
 */
export async function updateSesion(id, mood, context) {
  const db = await getDBConnection();

  db.transaction((txn) => {
    txn.executeSql(
      'UPDATE sesion SET id_estado = ?, id_contexto = ?, finalizada = 0 WHERE id = ?',
      [mood, context, id],
      (tx, result) => {}, //{ console.log(result) },
      (err) => console.log(err)
    )
  })
};


/**
 * Actualiza la sesión con el feedback, y la cierra.
 * @param {Integer} id 
 * @param {Integer} finalMood 
 */
export async function feedbackSession(id, finalMood) {
  const db = await getDBConnection();

  db.transaction((txn) => {
    txn.executeSql(
      'UPDATE sesion SET id_estado_final = ?, finalizada = 1 WHERE id = ?',
      [finalMood, id],
      (tx, result) => {},
      (err) => console.log(err)
    )
  })
}

//*************************************
//*************** UTILS ***************
//*************************************


/**
 * Genera una nueva conexión a base de datos.
 * Si la aplicación se ejecuta por primera vez,
 * partirá de la base de datos ya prepoblada con
 * las tablas y valores necesarios
 * @returns db connection
 */
export async function getDBConnection() {
  return openDatabase({
    name: DATABASE_NAME,
    location: 'default',
    createFromLocation: '~www/' + DATABASE_NAME
  },
    (res) => { console.log(res)},
    (err) => console.log(err)
  );
}
