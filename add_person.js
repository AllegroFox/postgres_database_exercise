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

let args = process.argv.slice(2);

knex('famous_people').insert({
  first_name: args[0],
  last_name: args[1],
  birthdate: args[2]
}).asCallback(function(err, rows) {
  if (err) {
    console.error(err);
    return;
  };
console.log("Sucessfully Inserted: " + args);
 knex.destroy();
});
