const express = require("express")
const aiRoutes = require('./routes/ai.routes')
const cors =  require('cors')
const app = express()

app.get("/", (req, res)=>{
    res.send("Hello World, Chando")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({ origin: "*" }));  // Allow all origins for testing


app.use('/ai', aiRoutes);

module.exports = app