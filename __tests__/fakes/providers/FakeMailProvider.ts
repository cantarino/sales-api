import { IMailProvider } from "../../../src/shared/providers/MailProvider/models/IMailProvider";
import { ISendMail } from "../../../src/shared/providers/MailProvider/models/ISendMail";

export class FakeMailProvider implements IMailProvider {
  async sendMail({ to, subject, html, from }: ISendMail): Promise<void> {}
}
