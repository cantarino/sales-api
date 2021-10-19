import mailConfig from "@config/mail";
import nodemailer from "nodemailer";

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  subject: string;
  html: string;
  from?: IMailContact;
}

export async function sendMail({ to, subject, html, from }: ISendMail) {
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
