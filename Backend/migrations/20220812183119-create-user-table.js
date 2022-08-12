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
    'user',
    {
      columns: {
        id: {
          type: 'int',
          autoIncrement: true,
          primaryKey: true,
          notNull: true,
        },
        username: { type: 'string', length: 255 },
        email: { type: 'string', length: 255 },
        password: { type: 'string', length: 255 },
        role: {
          type: 'int',
          unsigned: true,
          notNull: true,
          foreignKey: {
            name: 'role',
            table: 'role',
            rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT',
            },
            mapping: 'id',
          },
        },
      },
      ifNotExists: true,
    },
    (error) => {
      if (error) {
        console.error(error);
      }
      console.log('\x1b[45m%s\x1b[0m', 'The user table has been created!');
    }
  );
};

exports.down = function (db) {
  return db.dropTable('user', (error) => {
    if (error) {
      console.error(error);
    }
    console.log('\x1b[45m%s\x1b[0m', 'The user table has been deleted!');
  });
};

exports._meta = {
  version: 1,
};
