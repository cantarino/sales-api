import { IMailContact } from "./IMailContact";

export interface ISendMail {
  to: IMailContact;
  subject: string;
  html: string;
  from?: IMailContact;
}
