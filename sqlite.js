var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('databsae.db')

db.serialize(function() {
    db.run
})