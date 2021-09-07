const express = require('express')
var bodyParser = require('body-parser')

const mantenimientos = require('./backend/Controllers/Categorias/CategoriaContoller')
const comentarios = require('./backend/Controllers/Comentarios/ComentariosController');

var app = express();

app.use(bodyParser.json({
    type: "application/json"
}));

app.use('/mantenimiento', mantenimientos)
app.use('/comentarios', comentarios)

app.use(express.static(__dirname + '/fronted'));

app.get('/', (req, res) => {
    res.redirect('/index.html')
});

app.listen(3000);