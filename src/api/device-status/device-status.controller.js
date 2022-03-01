const shell = require("shelljs");
const date = require("date-and-time");

const deviceStatus = async (req, res) => {
    try {
        const final_op = {
            device_status: [],
            updated_time: "",
        };

        const ping_schema = (ip_add, status) => {
            return {
                host: ip_add,
                status: status,
            }
        }

        const ping_function = (ip_addr) => {
            let ping = shell.exec(`ping -n 1 ${ip_addr}`, {
                silent: true,
            }).stdout;
            if (ping.includes("Request timed out")) {
                final_op.device_status.push(ping_schema(ip_addr, "Unavailable"));
            } else if (ping.includes("Destination host unreachable")) {
                final_op.device_status.push(ping_schema(ip_addr, "Offline"));
            } else if (ping.includes("100% packet loss")) {
                final_op.device_status.push(ping_schema(ip_addr, "Offline"));
            } else if (ping.includes("could not find host")) {
                final_op.device_status.push(ping_schema(ip_addr, "Unavailable"));
            } else {
                final_op.device_status.push(ping_schema(ip_addr, "Online"));
            }
        }

        const ping_devices = () => {
            const now = new Date();
            final_op.device_status = [];
            final_op.updated_time = date.format(now, "YYYY-MM-DD HH:mm:ss");
            const devices = (
                process.env.DEVICES ||
                "pintoinfant.tech server.pintoinfant.tech 192.168.1.105 10.8.0.1"
            ).split(" ");
            devices.forEach((device) => {
                ping_function(device);
            })
            return final_op
        }
        return res.json({ success: true, data: ping_devices() });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: err.toString()
        })
    }
}

module.exports = {
    deviceStatus
}