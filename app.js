const client = require('./database');
const express = require('express');

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//database connection
client.connect()


//searching
app.get("/searchQuery", (req, res) => {
    console.log(req.query);
    const category = req.query.q[0].toUpperCase() + req.query.q.slice(1);
    console.log(category);
    let searching = `select *from product where category = '${category}'`
    client.query(searching, (err, result) => {
        if (!err) {
            // console.log(result.rows);
        }
        res.send(result.rows)
    })
});

//sorting and filtering
app.get("/subCategory", (req, res) => {
    console.log(req.query);
    const subCategory = req.query.q[0].toUpperCase() + req.query.q.slice(1);
    console.log(subCategory);
    let sortfilt = `select sub_category,product_id,product_name from product where sub_category ='${subCategory}' order by category desc`
    client.query(sortfilt, (err, result) => {
        if (!err) {
            // console.log(result.rows);
        }
        res.json(result.rows)
    })
})

// // filtering
app.get("/filter", (req, res) => {
    console.log(req.query);
    const subCategory = req.query.q[0].toUpperCase() + req.query.q.slice(1);
    console.log(subCategory);
    let filter = `select sub_category,product_id,product_name from product where sub_category ='${subCategory}'`
    client.query(filter, (err, result) => {
        if (!err) {
        }
        res.json(result.rows)
    })
})


// all data
app.get("/allProducts", (req, res) => {
    let query = 'select *from product'
    client.query(query, (err, result) => {
        if (!err) {
            // console.log(result.rows);
        }
        res.json(result.rows)
    })
})


// // inserting data
// client.query(`INSERT INTO user_data (product_id,category,sub_category,product_name)
// VALUES ('FUR-BO-10001700','Furniture','Bookcases','Bush Somerset Collection Bookcase')`,(err,result)=>{
//     if(!err){
//         console.log(result.rows);
//     }
//     //database connection end
//     client.end()
// })

app.listen("5000", () => console.log("server listening on port 5000"))