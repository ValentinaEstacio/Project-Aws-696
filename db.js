import mysql from 'mysql'

let connection = mysql.createConnection ({
    host: "database-1.cn0oicski2x8.us-east-1.rds.amazonaws.com",
    database: "db_activities_report",
    user: "valen",
    password: "Iestacio",
})

export function connect_SQL() {
    connection.connect(function(err){
        if(err){
            console.log(err)
        }
        else {
            console.log("Conexión a la base de datos")
        }
    })
}

export function insert_user(name, lastName, idUser, email, password) {
    // Utilizando placeholders para los valores y asegurando que estén escapados
    let instruction_sql = "INSERT INTO register_user (Name_user, Last_name, Id_user, Email, Password_user) VALUES (?, ?, ?, ?, ?)";
    // Array con los valores a insertar
    let values = [name, lastName, idUser, email, password];

    // Ejecutando la consulta SQL con los valores
    connection.query(instruction_sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Usuario agregado");
        }
    });
}

export function insert_activity(idUser, idAct, dateAct, timeAct, DescripAct) {
    let instruction_sql = "INSERT INTO record_activity (Id_user, Id_act, Date_act, Time_act, Descrip_act) VALUES (?, ?, ?, ?, ?)";
    let values = [idUser, idAct, dateAct, timeAct, DescripAct];

    connection.query(instruction_sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Actividad agregad");
        }
    });
}

export function consul_activity(idUser, callback) {
    // Consulta SQL con placeholder (?)
    let instruction_sql = "SELECT * FROM record_activity WHERE Id_user = ?";

    // Ejecuta la consulta SQL con el valor de idUser como parámetro
    connection.query(instruction_sql, [idUser], function(err, result) {
        if (err) {
            console.error("Error al consultar la base de datos: " + err.message);
            callback(err, null); // Llama al callback con el error
        } else {
            console.log("Actividades consultadas:");
            console.log(result); // Muestra los resultados de la consulta en la consola
            callback(null, result); // Llama al callback con los resultados
        }
    });
}