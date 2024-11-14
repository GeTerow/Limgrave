import nodemailer from "nodemailer";
import { RunningErrors } from "../errors/InterErrors";

if (!process.env.EMAIL_SERVICE ||
    !process.env.EMAIL_PORT ||
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS
) {
    throw new RunningErrors(nodemailer.createTransport, "ENV_EMAIL_VARIABLES_UNDEFINED");
}

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: parseInt(process.env.EMAIL_PORT || "465", 10),
    secure: process.env.EMAIL_PORT === "465", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
})

export default transporter;