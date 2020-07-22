const app = require("./server/server");
const port = process.env.port || 3000;

const { Connect } = app.database.database;

Connect.authenticate()
  .then(() => {
    console.log("Conexão estabelicida com PostgreSql");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });


app.get("/login", (req, res) => {
  res.status(200).render("login", { errs: [], user: {} });
});

app.get("/register", (req, res) => {
  res.status(200).render("register",{ errs: [], user: {} });
});

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}.`);
});
