const shell = require("shelljs");
const confAdder = require("../../helpers/confAdder");
const path = require("path")


const htmlDeployment = async (req, res) => {
    const gitUrl = req.body.gitUrl.trim()
    const device = req.body.device.trim()
    let port = req.body.port.trim()

    if (gitUrl != "" && device != "") {
        if (port != "") {
            port = port
        }
        else {
            port = "8022"
        }
        const filePath = path.join(__dirname, "..", "..", "helpers", "HtmlDeployment.js")
        let command = `cat ${filePath} | ssh ${device} -p ${port} node - ${gitUrl} 8080`
        let output = shell.exec(command)
        if (!output.stderr) {
            publicAddress = confAdder(device, 8080)
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

module.exports = { htmlDeployment }