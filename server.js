const express = require('express')
const dbConn = require('../medical_record/config')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Example app listening at 3000')
})

//login
app.post('/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        dbConn.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, results) {
            if (results.length > 0) {
                response.send({ data: results, message: 'data found', status: 200 })
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

//get data pasien
app.post('/pasien', function (request, response) {
    const iduser = request.body.iduser;
    dbConn.query('SELECT * FROM `pasien` INNER JOIN `user` ON pasien.iduser = ?', [iduser], function (error, results) {
        if (results.length > 0) {
            response.send({ data: results, message: 'your data' })
        } else {
            response.send('id not found');
        }
        response.end();
    });
});

//get data rekam medis pasien
app.post('/rekammedis', function (request, response) {
    const nip = request.body.nip;
    dbConn.query('SELECT a.*, b.*, c.*, d.* FROM rekam_medis a LEFT JOIN pasien b ON a.nip = b.nip INNER JOIN dokter c ON a.nid = c.nid INNER JOIN faskes d ON a.id_faskes = d.idfaskes WHERE a.nip = ?', [nip], function (error, results) {
        if (results.length > 0) {
            response.send({ data: results, message: 'your data', status:  200 })
        } else {
            response.send('id not found');
        }
        response.end();
    });
});

//get resep obat pasien
app.post('/resepobat', function (request, response) {
    const idrekammedis = request.body.idrekammedis;
    dbConn.query('SELECT  a.jumlah, a.keterangan, b.idrekammedis, c.nama_obat FROM resep_obat a LEFT JOIN rekam_medis b ON a.idrekammedis = b.idrekammedis LEFT JOIN obat c ON a.idobat = c.idobat WHERE a.idrekammedis = ?', [idrekammedis], function (error, results) {
        if (results.length > 0) {
            response.send({ data: results, message: 'your data' })
        } else {
            response.send('id not found');
        }
        response.end();
    });
});
