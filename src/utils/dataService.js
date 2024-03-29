import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

const DATABASE_NAME = "default.db";
const ID_USUARIO = 1;

enablePromise(true);


//*************************************
//************* QUERYS ****************
//*************************************
/**
 * Devuelve los contextos guardados en la base de datos prepoblada
 * @returns {List} (id_contexto, name)
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
 * @returns {List} (id_mood, name, icon)
 */
export async function getMood() {
  const db = await getDBConnection();
  const mood = [];

  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT * FROM mood',
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
 * Devuelve la última sesión insertada
 * @returns {Object} Sesion
 */
export async function lastSession() {
  const db = await getDBConnection();
  const sesion = [];
  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT * FROM sesion ORDER BY id_sesion DESC LIMIT 1',
      [],
      (tx, result) => {
        for (let i = 0; i < result.rows.length; i++) {
          sesion.push(result.rows.item(i))
        }
      },
      (err) => console.log(err)
    );
  })
  return sesion[0];
}


/**
 * Devuelve el nombre del usuario registrado (único)
 * @returns {String} usuario
 */
export async function getUserName() {
  const db = await getDBConnection();
  const users = []

  await db.transaction((txn) => {
    txn.executeSql(
      'SELECT nombre FROM usuario',
      [],
      (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
          users.push(results.rows.item(i));
        }
      },
      (err) => console.log(err)
    )
  })
  return users[0];
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
      'INSERT INTO sesion (id_contexto, mood_inicial, mood_final, id_usuario) VALUES (?,?,?,?)',
      [0, 0, 0, ID_USUARIO],
      (tx, result) => { },
      (err) => console.log(err)
    )
  })
  return lastId();
};

/**
 * Crea un nuevo usuario en base de datos
 * @param {String} name 
 * @param {String} gender 
 * @param {Integer} age 
 * @param {Integer} phone 
 */
export async function createUser(name, age, phone, gender) {
  const db = await getDBConnection();

  await db.transaction((txn) => {
    txn.executeSql(
      'INSERT INTO usuario(id_usuario, nombre, genero, edad, telefono) VALUES (?,?,?,?,?)',
      [ID_USUARIO, name, gender, age, phone],
      (tx, result) => { console.log(result) },
      (err) => console.log(err)
    )
  })
}


/**
 * Guarda en base de datos la muestra detectada
 * @param {SQLite connection} db 
 * @param {Integer} id 
 * @param {Val dic} values 
 */
export async function storeAV(db, id, values) {
  await db.transaction((txn) => {
    txn.executeSql(
      'INSERT INTO AV(sesion, arousal, valence, fecha) VALUES (?,?,?,?)',
      [id, values['arousal'], values['valence'], new Date().toISOString()],
      (tx, result) => { },
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
      'UPDATE sesion SET id_contexto = ?, mood_inicial = ? WHERE id_sesion = ?',
      [context, mood, id],
      (tx, result) => { },
      (err) => console.log(err)
    )
  })
};


/**
 * Actualiza la sesión con el feedback, y la cierra.
 * @param {Integer} id 
 * @param {Integer} finalMood 
 */
export async function closeSession(id, finalMood) {
  const db = await getDBConnection();

  db.transaction((txn) => {
    txn.executeSql(
      'UPDATE sesion SET mood_final = ? WHERE id_sesion = ?',
      [finalMood, id],
      (tx, result) => { },
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
    () => { },
    (err) => console.log(err)
  );
}
