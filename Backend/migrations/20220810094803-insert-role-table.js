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

const defaultData = [];

exports.up = function (db) {
  defaultData.push(db.insert('role', ['id', 'role'], ['0', 'admin']));
  defaultData.push(db.insert('role', ['id', 'role'], ['1', 'customer']));
  return Promise.all(defaultData);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
