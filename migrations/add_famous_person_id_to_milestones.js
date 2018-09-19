
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.string('description');
      table.date('date_archived');
      table.increments('primary_key');
      table.timestamps();
      table.integer('famous_person_id');
      table.foreign('famous_person_id_foreign').references('famous_people(id)');
    })
  ])

};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('milestones')
  ])

};
