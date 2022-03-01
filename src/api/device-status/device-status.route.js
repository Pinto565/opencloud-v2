const { Router } = require("express")
const { deviceStatus } = require("./device-status.controller")

const router = Router()

router.route("/").get(deviceStatus)

module.exports = router