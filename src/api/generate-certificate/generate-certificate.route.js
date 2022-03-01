const { Router } = require("express")
const { generateCertificate } = require("./generate-certificate.controller")

const router = Router()

router.route("/").post(generateCertificate)

module.exports = router