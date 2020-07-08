const express = require('express');
//crea servidor
const app = express();
const path = require('path');
//settings
app.set('port',3000);
app.set('views', path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile );

app.set('view engine','ejs');


//middelwares

//routes
app.use(require('./routes/index'));

//static files


//listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});