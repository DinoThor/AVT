const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')

var config = require('../config/config.json')
var estadoList = require('./staticValues/estado.json')

function connection(filepath) {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        var db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) console.error(err.message);
        })
        createTables(db);
    }
    return db;
}


function insertDetail(db, user, values, estado = estadoList['estado'][0], event = null) {
    db.run(`INSERT INTO detail(id, arousal, valence, fecha, estado, evento)
            VALUES($user, $arousal, $valence, $fecha, $estado, $evento)`, {
        $user: user,
        $arousal: values['a'],
        $valence: values['v'],
        $fecha: new Date().toISOString(),
        $estado: estado,
        $evento: event
    },
        e => {
            if (e) return console.error(e.message)
        });
}


function updateAnalisis(db, user) {
    db.run(`UPDATE TABLE analisis
            SET avg_arousal = (SELECT avg(arousal) FROM detail WHERE id = $user)
                avg_valence = (SELECT avg(valence) FROM detail WHERE id = $user)
            WHERE
                id = $user`, { $user: user },
        e => {
            if (e) return console.error(e.message)
        })
}


function createUser(db, values) {
    let id
    db.run(`INSERT INTO usuario
            (nombre, edad, sexo, idioma_pref, email, telefono, persona_contacto)
            VALUES ($nombre, $edad, $sexo, $idioma, $email, $tel, $cont)`, {
        $nombre: values['floatingUser'],
        $edad: values['floatingAge'],
        $sexo: values['floatingGender'],
        $idioma: null,
        $email: values['floatingEmail'],
        $tel: values['floatingNumber'],
        $cont: null
    },
        e => {
            if (e) return console.error(e.message)
            else id = this.lastID
        })
    db.run(`INSERT INTO analisis
            (id) VALUES ($id)`, {
        $id: id
    },
        e => {
            if (e) return console.error(e.message)
        }
    )
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
            config text
        );
        CREATE TABLE IF NOT EXISTS analisis (
            id integer PRIMARY KEY, 
            avg_arousal float, 
            avg_valence float,
            varianza float,
            dispersion float
        );
        CREATE TABLE IF NOT EXISTS detail (
            id integer NOT NULL, 
            arousal float NOT NULL, 
            valence float NOT NULL, 
            fecha datetime NOT NULL, 
            estado text NOT NULL,
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

module.exports = { connection, insertDetail, updateAnalisis, createUser }
