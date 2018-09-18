const pg = require("pg");
const settings = require("./settings"); //settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//Prints the query output as a pretty string
function prettify(result) {

  for (let row of result){

    console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);

  }
  return;
}



client.connect((err) => {
  if (err) {
    return console.error("Connection Error:", err);
  }
  let arg = process.argv[2];
  client.query(`SELECT * FROM famous_people WHERE first_name = '${arg}' OR last_name = '${arg}'`, (err, result) => {
    if (err) {
      return console.error("Error running query:", err);
    }
    console.log("Searching...\n");
    console.log(`Found ${result.rows.length} person(s) by the name '${arg}':\n`)
    prettify(result.rows);
    client.end();
  });
});