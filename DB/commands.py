query = {
    "searchUser": "SELECT id FROM usuario WHERE id = ?",
    "searchReg": "SELECT u.id FROM usuario u, reg_dimensional rg WHERE u.id = rg.id AND u.id = ?"
}

insert = {
    "insertReg": "INSERT INTO reg_dimensional(id, avg_arousal, avg_valence) VALUES (?, ?, ?)",
    "insertUser": "INSERT INTO usuario (nombre, edad, sexo, idioma_pref, email, telefono, persona_contacto) VALUES ?, "
                  "?, ?, ?, ?, ?, ?)",
    "insertDetail": "INSERT INTO detail(id, arousal, valence, fecha, evento) VALUES(?, ?, ?, ?, ?)"
}

createDataBase = """
            BEGIN;
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
            COMMIT;
            """