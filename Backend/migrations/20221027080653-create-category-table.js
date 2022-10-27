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
    'category',
    {
      columns: {
        id: {
          type: 'int',
          autoIncrement: true,
          unsigned: true,
          primaryKey: true,
          notNull: true,
        },
        category: { type: 'string', length: 255 },
      },
      ifNotExists: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log('\x1b[45m%s\x1b[0m', 'The category table has been created!');
    }
  );
};

exports.down = function (db) {
  return db.dropTable('category', (error) => {
    if (error) {
      console.error(error);
    }
    console.log('\x1b[41m%s\x1b[0m', 'The category table has been deleted!');
  });
};

exports._meta = {
  version: 1,
};
