"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: process.env.PG_URL,
});
client.connect();
// Exporte le client PostgreSQL.
exports.default = client;
