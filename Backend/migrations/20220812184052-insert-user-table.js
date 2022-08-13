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

const defaultUser = [];

exports.up = function (db) {
  defaultUser.push(
    db.insert(
      'user',
      ['username', 'email', 'password', 'role'],
      ['admin', 'admin@admin.com', 'admin', '0']
    )
  );
  return Promise.all(defaultUser);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
