const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../../cosmobrains.db');

let _db = null;

async function getDb() {
  if (_db) return _db;

  const SQL = await initSqlJs();

  // Se já existe arquivo salvo, carrega. Senão cria novo.
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    _db = new SQL.Database(fileBuffer);
  } else {
    _db = new SQL.Database();
  }

  // Criar tabelas se não existirem
  _db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nome      TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      email     TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      senha     TEXT    NOT NULL,
      nomeCrianca    TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      pontos         INTEGER NOT NULL DEFAULT 0,
      quizzesFeitos  INTEGER NOT NULL DEFAULT 0,
      criadoEm      TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  _save();
  return _db;
}

// Persiste o banco em disco após cada escrita
function _save() {
  if (!_db) return;
  const data = _db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// Helpers para facilitar uso

function run(db, sql, params = []) {
  db.run(sql, params);
  _save();
}

function get(db, sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

function all(db, sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// Para testes: reseta o banco em memória sem tocar em disco
function _resetForTest(SQL) {
  _db = new SQL.Database();
  _db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nome      TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      email     TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      senha     TEXT    NOT NULL,
      nomeCrianca    TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      pontos         INTEGER NOT NULL DEFAULT 0,
      quizzesFeitos  INTEGER NOT NULL DEFAULT 0,
      criadoEm      TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

module.exports = { getDb, run, get, all, _resetForTest };
