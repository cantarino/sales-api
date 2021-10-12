import app from "./app";

const main = async () => {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
  });
};

main().catch((err) => {
  console.log("error: ", err);
});
