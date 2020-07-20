const express = require('express');
//crea servidor
const app = express();
//const path = require('path');
//settings
app.set('port',process.env.PORT || 3000);
//app.set('views', path.join(__dirname,'views'));
//app.engine('html',require('ejs').renderFile );

//app.set('view engine','ejs');


//middelwares
app.use(express.json());
//routes
app.use(require('./routes/clientes'));
app.use(require('./routes/productos'));
//static files
//app.use(express.static(path.join(__dirname,'public')));

//listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
