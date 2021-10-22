export default {
  jwt: {
    secret: String(process.env.APP_SECRET),
    expiresIn: "30d",
  },
};
