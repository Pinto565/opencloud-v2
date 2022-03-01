const { Router } = require("express")
const deviceStatus = require("./device-status/device-status.route")
const flaskDeployment = require("./flask-deployment/flask-deployment.route")
const generateCertificate = require("./generate-certificate/generate-certificate.route")
const htmlDeployment = require("./html-deployment/html-deployment.route")

const router = Router()

router.use("/device-status", deviceStatus)
router.use("/flask-deployment", flaskDeployment)
router.use("/generate-certificate", generateCertificate)
router.use("/html-deployment", htmlDeployment)

module.exports = router