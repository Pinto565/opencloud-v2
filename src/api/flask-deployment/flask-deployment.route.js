const { Router } = require("express")
const { flaskDeployment } = require("./flask-deployment.controller")

const router = Router()

router.route("/").post(flaskDeployment)

module.exports = router