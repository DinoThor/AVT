import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = 'sessionOnGoing';
const SESSION_DATA = 'sessionInfo';

const ON_GOING = 'onGoing';
const NEW_SESSION = 'newSession';

/**
 * Verifica si, al abrir la aplicación, existe una sesión sin cerrar.
 * 
 * I.e, el usuario indicó que empezó una actividad la última vez que 
 * abrió la aplicación, y todavía falta el feedback de esta. 
 * @returns {boolean}
 */
export const isOnGoing = async () => {
  return await _retrieveData(SESSION_KEY) == ON_GOING;
}


/**
 * Devuelve el id de la sesión en curso.
 * @returns {Integer} id
 */
export const getSessionId = async () => {
  var data = await _retrieveData(SESSION_DATA);
  return parseInt(data);
}


/**
 * Guarda el id de la sesión en curso
 * @param {Integer} id
 */
export const setSessionId = async (id) => {
  _storeData(SESSION_DATA, id.toString());
}


export const setSessionOnGoing = async () => {
  _storeData(SESSION_KEY, ON_GOING);
  _storeData(SESSION_DATA, )
}

/**
 * Cierra la sesión que quedó pendiente
 */
export const closeSession = async () => {
  _storeData(SESSION_KEY, NEW_SESSION);
  _storeData(SESSION_DATA, '--')
}


const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      value,
    );
  } catch (error) {
    // Error saving data
  }
};


const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};