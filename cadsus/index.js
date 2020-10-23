const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const { v1: uuidv1 } = require("uuid");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create", async function (request, response) {
  const {
    name,
    cpf,
    rg,
    nome_social,
    dt_nasc,
    sexo,
    cor_raca,
    nacionalidade,
    municipio,
    telefone,
    email,
    pais,
    cep,
    estado,
    orientacao_sexual,
    identidad_de_genero,
    bairro,
    logradouro,
    numero,
    complemento,
    referencia,
    area,
    microarea,
    nome_da_mae,
    nome_do_pai,
    estado_civil,
    NIS_PIS_PASEP,
    ocupacao,
    escolaridade,
    tipo_sanguineo,
  } = request.body;

  let n_prontuario = uuidv1();

  const conn = await db.connect();
  const sql = `INSERT INTO pacientes(name, cpf, rg, nome_social, dt_nasc, sexo,
    cor_raca, nacionalidade, municipio, telefone, email, pais, cep, estado, orientacao_sexual,
    identidad_de_genero, bairro, logradouro, numero, complemento, referencia, area,
    microarea, nome_da_mae, nome_do_pai, estado_civil, NIS_PIS_PASEP, ocupacao,
    escolaridade, tipo_sanguineo, n_prontuario) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const values = [
    name,
    cpf,
    rg,
    nome_social,
    dt_nasc,
    sexo,
    cor_raca,
    nacionalidade,
    municipio,
    telefone,
    email,
    pais,
    cep,
    estado,
    orientacao_sexual,
    identidad_de_genero,
    bairro,
    logradouro,
    numero,
    complemento,
    referencia,
    area,
    microarea,
    nome_da_mae,
    nome_do_pai,
    estado_civil,
    NIS_PIS_PASEP,
    ocupacao,
    escolaridade,
    tipo_sanguineo,
    n_prontuario,
  ];
  try {
    let result = await conn.query(sql, values);

    response.status(200).send({ result, n_prontuario });
  } catch (err) {
    if (err.errno === 1062) {
      // duplicated key
      response.status(500).send("Duplicated key");
    }
    console.error("error", JSON.stringify(err));
    response.status(400).send(err);
  }
});

app.listen(5000, () => console.log("App running on localhost:5000"));
