import nodemailer from "nodemailer";
import ENV_CONFIG from "./env.config";

// transporter
export const transporter = nodemailer.createTransport({
    host : ENV_CONFIG.SMTP_HOST,
    service : ENV_CONFIG.SMTP_SERVICE,
    port : ENV_CONFIG.SMTP_PORT,
    secure : Number(ENV_CONFIG.SMTP_PORT) === 465,
    auth : {
        user : ENV_CONFIG.SMTP_MAIL_FROM,
        pass : ENV_CONFIG.SMTP_PASSWORD,
    },
});

export const verifySMTP = async () => {
    try {
        await transporter.verify();
        console.log("Server is ready to send email");
    } catch (error){
        console.log(error);
    }
}