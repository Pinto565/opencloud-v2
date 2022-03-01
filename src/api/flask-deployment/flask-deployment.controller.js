const shell = require("shelljs");
const ConfigAdder = require("../../helpers/ConfigAdder");
const path = require("path")

const flaskDeployment = async (req, res) => {
    const gitUrl = req.body.gitUrl.trim()
    const device = req.body.device.trim()
    let port = req.body.port.trim()

    if (gitUrl != "" && device != "") {
        port ? (port = port) : (port = "8022")
        // let port = port()
        const filePath = path.join(__dirname, "..", "..", "helpers", "FlaskDeployment.js")
        let command = `cat ${filePath} | ssh ${device} -p ${port} node - ${gitUrl} 8080`
        let output = shell.exec(command)
        if (!output.stderr) {
            publicAddress = ConfigAdder(device, 8080)
            shell.exec("systemctl restart haproxy")
            res.json({
                "siteAddress": publicAddress,
                "status": "deployed succesfully",
            })
        }
        else {
            res.json({
                "status": "Failed"
            })
        }

    }
    else {
        res.json({
            "status": "Some parameter missing"
        })
    }
}

module.exports = { flaskDeployment }