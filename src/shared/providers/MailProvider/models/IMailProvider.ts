import { ISendMail } from "./ISendMail";

export interface IMailProvider {
  sendMail({ to, subject, html, from }: ISendMail): Promise<void>;
}
