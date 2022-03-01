const { Router } = require("express")
const { htmlDeployment } = require("./html-deployment.controller")

const router = Router()

router.route("/").post(htmlDeployment)

module.exports = router