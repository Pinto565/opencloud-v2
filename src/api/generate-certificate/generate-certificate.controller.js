const shell = require("shelljs");
const fs = require("fs");
const nodemailer = require("nodemailer")

const ipaddress = require("../../data/ipAddress.json");

const send_mail = (imei, receiver) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "infantvalan02@gmail.com",
            pass: "",
        },
    });

    var mailOptions = {
        from: "Opencloud",
        to: receiver,
        subject: "OpenCloud VPN Certificate",
        text: "Hey.. This is your VPN cerfiticate",
        attachments: [
            {
                filename: `${imei}.ovpn`,
                path: `/root/${imei}.ovpn`
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

}

const generateCertificate = async (req, res) => {
    let { imei, email } = req.body;
    if ((imei || email) != ("" || null || undefined)) {
        let command = shell.exec(`sudo bash vpn.sh ${imei}`)
        if (command.code === 0) {
            let new_ip = `10.8.0.${parseInt(ipaddress[ipaddress.length - 1].split(".")[3]) + 1}`
            ipaddress.push(new_ip);
            fs.writeFileSync("../../data/ipAddress.json", JSON.stringify(ipaddress), (err) => {
                if (err) throw err;
            });
            shell.exec(`echo \"ifconfig-push ${new_ip} 255.255.255.0\" > /etc/openvpn/ccd/${imei}`)
            shell.exec(`openssl x509 -subject -noout -in /etc/openvpn/easy-rsa/pki/issued/${imei}.crt`)
            send_mail(imei, email)
            res.json({
                data: "Certificate has been sent to your mail"
            })
        } else {
            res.json({
                message: "Something went wrong",
                data: command.stderr.toString()
            })
        }
    } else {
        res.json({
            data: "params missing"
        })
    }
}

module.exports = { generateCertificate }