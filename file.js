const fs = require("fs");

// // Sync.. call
// fs.writeFileSync("./test.txt", "Hey There");

// //Async
// fs.writeFile("./test.txt", "Hey There Async",(err) => {})

// const result = fs.readFileSync("./contacts.txt","utf-8");
// console.log(result);

// fs.readFile("./contacts.txt","utf-8",(err,result)=> {
// if (err){
//     console.log("Error",err)
// } else{
//     console.log(result);
// }
// })

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

fs.appendFileSync("./test.txt",'${Date.now()} Hey There\n');

console.log(Date.now())