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
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect(err => (err || ''));

app.use(cors());


app.use(express.static('build'));

app.listen(port, () => {
  console.log('server is working');
});

app.get('/products', (req, res) => {
  const GET_RECIPES_QUERY = 'select * from recipe order by id_recipe desc';
  const GET_PREVIOUS_VERSIONS
    = `select recipe.id_recipe, prev_preparing, id, date from recipe join
    previous_recipe on recipe.id_recipe = previous_recipe.id_recipe order
    by previous_recipe.id desc`;

  client.query(
    `${GET_RECIPES_QUERY};${GET_PREVIOUS_VERSIONS}`,
    (err, results) => (err ? res.send(err) : res.json({ data: results })),
  );
});

app.post('/products', bodyParser.text(), (req, res) => {
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
