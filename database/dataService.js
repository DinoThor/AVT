import { openDatabase } from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
  return openDatabase({
    name: 'UserDataBase.db',
    location: 'default'
  })
}

export const insert = async (db, table, item) => {
  db.transaction
}

export const select = (db, table, query) => {

}

export const update = async (db, table, item) => {

}


