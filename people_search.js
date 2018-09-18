const settings = require("./settings"); //settings.json

const knex = require("knex")({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
  }
});

//Prints the query output as a pretty string
function prettify(rows) {

  console.log(`Found ${rows.length} person(s) by the name '${arg}':\n`);
  for (let row of rows){

    console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);

  }
  return;
}


// makes the connection and runs the query
let arg = process.argv[2];

console.log("Searching...\n");

knex('famous_people').where({first_name: arg}).orWhere({last_name: arg}).asCallback(function(err, rows) {
  if (err) {
    console.error(err);
    return;
  }
  prettify(rows);
  knex.destroy();
});

