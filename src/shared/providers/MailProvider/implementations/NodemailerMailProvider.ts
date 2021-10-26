import mailConfig from "@config/mail";
import nodemailer from "nodemailer";
import { IMailProvider } from "../models/IMailProvider";
import { ISendMail } from "../models/ISendMail";

export class NodemailerMailProvider implements IMailProvider {
  public async sendMail({ to, subject, html, from }: ISendMail): Promise<void> {
    const transporter = nodemailer.createTransport(mailConfig.mail);
    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Sales API Team",
        address: from?.email || "team@salesapi.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    });

    console.log(`Message sent ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
