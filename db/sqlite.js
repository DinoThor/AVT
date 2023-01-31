const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const filepath = './database.db'

function connection() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        var db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) console.error(err.message);
        })
        createTables(db)
    }
    return db
}

function createTables(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS usuario (
            id integer PRIMARY KEY, 
            nombre text NOT NULL, 
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
        CREATE TABLE IF NOT EXISTS persona_contacto (
            id integer PRIMARY KEY,
            email text NOT NULL,
            telefono integer,
            nombre text NOT NULL,
            parentesco text
        );
    `)
}

module.exports = connection()
