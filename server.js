import Express from 'express'
import Path from 'path'
import {connect_SQL, insert_user, insert_activity, consul_activity} from './db.js'

console.log('Iniciando el servidor...');

const app = Express();
console.log('Express importado correctamente.');

    
const dir = Path.resolve()
const dir_front = "frontend/build"

app.use(Express.static(dir_front))
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Servidor funcionando correctamente en el puerto ${port}`);
    //connect_SQL()
})

app.get('/', function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
    console.log(dir + "/" + dir_front + "/index.html")
})

app.get("/home", function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/register_page", function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/login", function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/consult", function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.get("/record_activity", function(req, res){
    res.sendFile(dir + "/" + dir_front + "/index.html")
})

app.post("/register_user", function(req, res){
    let {name, lastName, idUser, email, password, confPassword} = req.body
    console.log(name, lastName, idUser, email, password, confPassword)
    connect_SQL()
    insert_user(name, lastName, idUser, email, password)
    res.redirect("/")
});

app.post("/login_user", function(req, res){
    let {idUser, password} = req.body
    console.log(idUser + " " + password)
    res.redirect("/")
});

app.post("/recordActivity", function(req, res){
    let {idUser, idAct, dateAct, timeAct, DescripAct} = req.body
    console.log(idUser, idAct, dateAct, timeAct, DescripAct)
    connect_SQL()
    insert_activity(idUser, idAct, dateAct, timeAct, DescripAct)
    res.redirect("/")
});

app.post("/consult_user", function(req, res){
    let {idUser} = req.body
    console.log(idUser)
    connect_SQL()
    consul_activity(idUser)
});
