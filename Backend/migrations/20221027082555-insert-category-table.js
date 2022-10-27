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

const defaultCategory = [];

exports.up = function (db) {
  defaultCategory.push(db.insert('category', ['category'], ['Real-Estate']));
  defaultCategory.push(db.insert('category', ['category'], ['Vehicle']));
  defaultCategory.push(db.insert('category', ['category'], ['Home']));
  defaultCategory.push(db.insert('category', ['category'], ['Tools']));
  defaultCategory.push(db.insert('category', ['category'], ['Fashion']));

  return Promise.all(defaultCategory);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
