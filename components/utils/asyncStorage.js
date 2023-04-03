import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = 'session';
const FEEDBACK = 'feedback';


/**
 * Verifica si, al abrir la aplicación, existe una sesión sin cerrar.
 * 
 * I.e, el usuario indicó que empezó una actividad la última vez que 
 * abrió la aplicación, y todavía falta el feedback de esta. 
 * @returns {boolean}
 */
export const isOnGoing = async () => {
  return await _retrieveData(SESSION_KEY) != ' ';
}

/**
 * Devuelve true si hace falta preguntar el feedback
 * @returns 
 */
export const askFeedBack = async () => {
  return await _retrieveData(FEEDBACK) != 'true';
}

/**
 * Establece si queda pendiente el FeedBack
 * @param {Boolean} value 
 */
export const setFeedBack = async (value) => {
  _storeData(FEEDBACK, value.toString());
}


/**
 * Devuelve el id de la sesión en curso.
 * @returns {Integer} id
 */
export const getSessionId = async () => {
  var data = await _retrieveData(SESSION_KEY);
  return data == ' ' ? 0 : parseInt(data);
}


/**
 * Guarda el id de la sesión en curso
 * @param {Integer} id
 */
export const setSessionId = async (id) => {
  _storeData(SESSION_KEY, id.toString());
}


/**
 * Cierra la sesión que quedó pendiente
 */
export const CloseSession = async () => {
  _storeData(SESSION_KEY, ' ');
}



export const _storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(
      key,
      data,
    );
  } catch (error) {
    // Error saving data
  }
};


const _retrieveData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    // Error retrieving data
  }
};