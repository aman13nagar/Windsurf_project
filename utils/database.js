// utils/database.js
const fs   = require("fs");
const path = require("path");                 // ← keep the real 'path' module

const DB_FILE = path.join(__dirname, "db.json");

function ensureDirExists(file) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadDB() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveToDB(data) {
  try {
    ensureDirExists(DB_FILE);
    const db = loadDB();
    db.push(data);
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    // 👀  Put a loud error in the console so you notice immediately
    console.error("❌ saveToDB failed:", err);
    throw err;           // re‑throw so your route’s catch still fires
  }
}

function searchByTag(tag) {
  return loadDB().filter(entry =>
    entry.skills?.some(skill =>
      skill.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

module.exports = {loadDB, saveToDB, searchByTag };

