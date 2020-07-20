const express = require('express');
const router = express.Router();
// routes
const mysqlConnection = require('../database');
const { reset } = require('nodemon');
const { query } = require('express');
//listado de todos los clientes
router.get('/' , (req,res) =>{
    mysqlConnection.query('SELECT * FROM cliente',(err,rows,fields) => {
        if(!err)
        {
           res.json(rows); 
        } else{
            console.log(err);
            
        }



    });

});
//clientes por id

router.get('/:id', (req,res) =>{
    const {id}=req.params;
    mysqlConnection.query('SELECT * FROM cliente WHERE cod_cliente=?',[id],(err,rows,fields) => {
        if(!err)
        {
           res.json(rows[0]); 
        } else{
            console.log(err);
            
        }
 
    });
    //console.log(id);


});


// añadir clientes

router.post('/', (req,res) => {
    const {cod_cliente,ci_cliente,nombre,direccion,telefono,email} = req.body;
const query= `
            CALL clienteAddOrEdit(?,?,?,?,?,?)`;
mysqlConnection.query(query,[cod_cliente,ci_cliente,nombre,direccion,telefono,email], (err,rows,field)=> {
        if (!err){
             res.json({Status: 'Usuario creado'})  
             console.log ('id: ' + rows.insertId); 
        } else{
            console.log (err);
        }

});
});
//actualizar clientes
router.put('/:id', (req,res) => {
        const {ci_cliente,nombre,direccion,telefono,email} = req.body;
        const {id} = req.params;
        const query =`CALL clienteAddOrEdit(?,?,?,?,?,?)`;
        mysqlConnection.query(query,[id,ci_cliente,nombre,direccion,telefono,email], (err,rows,field) => {
            if (!err){
                    res.json ({Status: 'Cliente Actualizado'});
                    console.log('Rows affected:', `CHANGED ${rows.changeRows} rows(S)`);

            }    else{
                console.log(err);
            }

        })
      
});
//borrar clientes
router.delete('/:id', (req,res) => {
    const {id} = req.params;

    mysqlConnection.query('delete from cliente where cod_cliente=?',[id], (err,rows,fields) => {
        if (!err){
            res.json ({status: "cliente eliminado"})
        } else {

            console.log(err);
            res.json ({Status:"error "})
           
        }

    });

});


module.exports = router;

