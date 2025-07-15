import mysql from "mysql2/promise"

const db = await mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"B2907@july",
   database:"registered_users",



   
});

 console.log("Mysql Connected Successfully");
 export default db;

// //await db.execute(`create database mysql_db`);
// console.log(await db.execute("show databases"));

// // await db.execute(`CREATE TABLE REGISTERED_USERS(
// //     id INT AUTO_INCREMENT PRIMARY KEY,
// //     name VARCHAR(100) NOT NULL,
// //     email VARCHAR(100) NOT NULL UNIQUE,
// //      password VARCHAR(100) NOT NULL UNIQUE);
// //     `)


//     const value=[

    
//         ["thapa","thapa@example.com"],
//         ["abc","abc@example.com"],
//         ["xyz","xyz@example.com"]
//     ];

//     await db.query(`INSERT INTO REGISTERED_USERS(name, email,password) VALUES ? `,[value]);

//     // const [row] = await db.execute(`SELECT * FROM REGISTERED_USERS`);
//     // console.log(row);

//     try{
//         const [row] = await db.execute(
//            " UPDATE REGISTERED_USERS SET username='VINOD THAPA' WHERE email = 'thapa@example.com'"
//         );
//         console.log("ALL USERS ", row)
//     } catch(error){
//         console.log(error);
//     }