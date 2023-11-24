const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nabrasa',
});

connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar:', error.stack);
        return;
    }
    console.log('Conectado com o ID ' + connection.threadId);
});

const inserirUsuario = (user, callback) => {
    const query = 'INSERT INTO produtos SET ?';
    connection.query(query, user, (error, results, fields) => {
        if (error) {
            console.error('Erro ao inserir usuário:', error);
            callback(error, null);
            return;
        }
        console.log('Usuário inserido com sucesso! ID:', results.insertId);
        callback(null, results.insertId);
    });
};

connection.end();

module.exports = { inserirUsuario };
