// server.js
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const { extractStructuredData } = require("./utils/extractAI");
const {loadDB, saveToDB, searchByTag } = require("./utils/database");
const path=require("path")

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

// Upload and extract
app.post("/api/upload", upload.single("resume"), async (req, res) => {
  console.log("Upload endpoint hit");
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const pdfText    = await pdfParse(fileBuffer);
    const finalName = `${Date.now()}-${req.file.originalname}`;
    const finalPath = path.join(__dirname, 'uploads', finalName);
    fs.renameSync(req.file.path, finalPath);
    const extracted  = await extractStructuredData(pdfText.text);
    extracted.pdfUrl = `http://localhost:${5000}/uploads/${finalName}`;
    console.log("Before save:", extracted);

    // Separate try‑catch so you know exactly where it explodes
    try {
      saveToDB(extracted);
    } catch (dbErr) {
      console.error("DB write failed:", dbErr);
      return res.status(500).json({ error: "Could not save to database." });
    }

    console.log("After save:", extracted);
    res.json(extracted);
  } catch (err) {
    console.error("Upload handler failed:", err);
    res.status(500).json({ error: "Failed to extract data from resume." });
  }
});


// Search by tag
app.get("/api/search", async (req, res) => {
  const tag = req.query.tag;
  const results = await searchByTag(tag);
  res.json(results);
});

app.get("/api/all", (req, res) => res.json(loadDB()));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
