export default {
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT ?? "2525"),
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  },
};
