const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;

const app = express();

// const client = new Client({
//   user: 'postgres',
//   password: '2236438o',
//   host: 'localhost',
//   port: 5432,
//   database: 'postgres',
// });

const client = new Client ({
  user: 'ibunnuxklqoodi',
  password: '30a1e7070696cbde1dd256f286fb508785325d5c2e205e5a6d599b68f0560e6c',
  host: 'ec2-54-247-181-232.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'd6j8unhos0s7k2',
  ssl: true,
});

client.connect(err => (err || ''));

app.use(cors());


app.use(express.static('build'));

app.listen(port, () => {
  console.log('server is working');
});

app.get('/recipes', (req, res) => {
  const GET_RECIPES_QUERY = 'select * from recipe order by id_recipe desc';

  client.query(
    `${GET_RECIPES_QUERY}`,
    (err, results) => (err ? res.send(err) : res.json(results.rows)),
  );
});

app.get('/previousRecipes', (req, res) => {
  const GET_PREVIOUS_VERSIONS
    = `select recipe.id_recipe, prev_preparing, id, recipe.date from recipe join
    previous_recipe on recipe.id_recipe = previous_recipe.id_recipe order
    by previous_recipe.id desc`;

  client.query(
    `${GET_PREVIOUS_VERSIONS}`,
    (err, results) => (err ? res.send(err) : res.json(results.rows)),
  );
});

app.post('/add', bodyParser.text(), (req, res) => {
  const { title, preparing } = JSON.parse(req.body);
  const INSERT_RECIPE_QUERY
    = `insert into recipe (title, preparing)
    values ('${title}', '${preparing}')`;

  client.query(
    INSERT_RECIPE_QUERY,
    (err, results) => (
      err ? res.send(err) : res.send('Succesfully added recipe')
    ),
  );
});

app.patch('/edit', bodyParser.text(), (req, res) => {
  const { id, text, date, prevText } = JSON.parse(req.body);

  const PUSH_TO_HISTORY
    = `insert into previous_recipe (id_recipe, prev_preparing, date)
    values (${id}, '${prevText}', '${date}')`;
  const UPDATE_RECIPE_QUERY
    = `update recipe set preparing = '${text}' where id_recipe = ${id}`;

  client.query(
    `${PUSH_TO_HISTORY};${UPDATE_RECIPE_QUERY}`,
    (err, results) => (
      err ? res.send(err) : res.send('Succesfully updated recipe')
    ),
  );
});
