const express = require("express")
const api = require("./api/index")
const dotenv = require("dotenv")
dotenv.config()

const server = express()

server.get("/", (req, res) => {
    res.json({
        "status": "success",
        "message": "Opencloud-v2 API"
    })
})

server.use("/api", api)

let port = process.env.PORT || 9999
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})