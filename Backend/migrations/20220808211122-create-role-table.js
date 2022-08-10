'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable(
    'role',
    {
      columns: {
        id: {
          type: 'int',
          unsigned: true,
          primaryKey: true,
          notNull: true,
        },
        role: { type: 'string', length: 10 },
      },
      ifNotExists: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log('\x1b[45m%s\x1b[0m', 'The role table has been created!');
    }
  );
};

exports.down = function (db) {
  return db.dropTable('role', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('\x1b[41m%s\x1b[0m', 'The role table has been deleted!');
  });
};

exports._meta = {
  version: 1,
};
