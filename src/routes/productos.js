const express = require('express');
const router = express.Router();
// routes
const mysqlConnection = require('../database');
const { reset } = require('nodemon');
const { query } = require('express');
//listado de todos los productos
router.get('/product' , (req,res) =>{
    mysqlConnection.query('SELECT * FROM productos',(err,rows,fields) => {
        if(!err)
        {
           res.json(rows); 
        } else{
            console.log(err);
            
        }



    });

});
//productos por id

router.get('/product/:id', (req,res) =>{
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM productos WHERE cod_producto=?',[id],(err,rows,fields) => {
        if(!err)
        {
           res.json(rows[0]); 
        } else{
            console.log(err);
            
        }
 
    });
    //console.log(id);


});


// añadir productos

router.post('/product', (req,res) => {
    const {cod_producto,nom_producto,valor_uni,tipo_producto_cod_tipo_prod} = req.body;
const query= `
            CALL productoAddOrEdit(?,?,?,?)`;
mysqlConnection.query(query,[cod_producto,nom_producto,valor_uni,tipo_producto_cod_tipo_prod], (err,rows,field)=> {
        if (!err){
             res.json({Status: 'Producto creado'})  
             console.log ('id: ' + rows.insertId); 
        } else{
            console.log (err);
        }

});
});
//actualizar producto
router.put('/product/:id', (req,res) => {
        const {nom_producto,valor_uni,tipo_producto_cod_tipo_prod} = req.body;
        const {id} = req.params;
        const query =`CALL productoAddOrEdit(?,?,?,?)`;
        mysqlConnection.query(query,[id,nom_producto,valor_uni,tipo_producto_cod_tipo_prod], (err,rows,field) => {
            if (!err){
                    res.json ({Status: 'Producto Actualizado'});
                    console.log('Rows affected:', `CHANGED ${rows.changeRows} rows(S)`);

            }    else{
                console.log(err);
            }

        })
      
});
//borrar producto
router.delete('/product/:id', (req,res) => {
    const {id} = req.params;

    mysqlConnection.query('delete from productos where cod_producto=?',[id], (err,rows,fields) => {
        if (!err){
            res.json ({status: "Producto eliminado"})
        } else {

            console.log(err);
            res.json ({Status:"error "})
           
        }

    });

});


module.exports = router;

