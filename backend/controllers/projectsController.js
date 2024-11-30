
const db = require("../database/db")

const getProjects = (req , res)=>{
    const sql = "SELECT * FROM portfolio";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

module.exports = {getProjects}