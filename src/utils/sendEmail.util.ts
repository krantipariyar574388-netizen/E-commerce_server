import { transporter } from "../config/nodemailer.config";
import ENV_CONFIG from "../config/env.config";

interface IMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments: any[];
}

export const sendEmail = async (options: IMailOptions) => {
  try {
    const mailOptions : any = {
      to: options.to,
      html: options.html,
      subject: options.subject,
      from: `"${ENV_CONFIG.SENDER_NAME}" <${ENV_CONFIG.SMTP_MAIL}>`,
    };

    if(options.cc) {
        mailOptions["cc"] = options.cc;
    }

    if(options.bcc) {
        mailOptions["bcc"] = options.bcc;
    }

    if(options.attachments) {
        mailOptions["attachments"] = options.attachments;
    }

    await transporter.sendMail(mailOptions);

    console.log("email sent");
  } catch (error) {
    console.log(error);
  }
};
