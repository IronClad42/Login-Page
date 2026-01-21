var express = require("express");
var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pass#123",
    database:"NodeJs"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;