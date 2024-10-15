import sqlite from "sqlite3";
import { generateURl } from "../controllers/urlShortner.js";

const db = new sqlite.Database("url.db", { verbose: true });

// Check if database exists
db.run(
  `SELECT 1 FROM sqlite_master WHERE type='database' AND name='url.db'`,
  (err) => {
    if (err) {
      console.log("Database does not exist");
    } else {
      console.log("Database exists");
    }
  }
);

db.run(
  `SELECT 1 FROM sqlite_master WHERE type='table' AND name='urls'`,
  (err) => {
    if (err) {
      console.log("Table does not exist");
      const sql = `CREATE TABLE urls(id INTEGER PRIMARY KEY, encodedUrl UNIQUE , fullUrl , created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`;
      db.run(sql);
      console.log("Table created successfully");
    } else {
      console.log("Table exists");
    }
  }
);

// const sql = `CREATE TABLE urls(id INTEGER PRIMARY KEY, encodedUrl UNIQUE , fullUrl , created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`;
// db.run(sql);

// Retrieve all rows from table
async function getAllUrls({ res }) {
  const query = `SELECT * FROM urls`;

  const value = await new Promise((resolve) => {
    db.all(query, [], (err, rows) => {
      if (err) return { status: 403, message: err };

      if (rows.length < 1) {
        return { status: 403, message: "No match" };
      }

      resolve(rows);
    });
  });

  // db.close();
  return { message: "success", status: 200, data: value };
}

// INSERT fullUrl and shortened url into db
async function insertIntoDB({ res, fullUrl }) {
  const shortenedUrl = generateURl();

  const isShortened = await isPresent({ shortenedUrl });
  const isFullUrl = await isFullUrlPresent({ fullUrl });

  if (!isShortened && !isFullUrl) {
    const query = `INSERT INTO urls(encodedUrl, fullUrl) VALUES(?,?)`;

    const value = await new Promise((resolve) => {
      db.run(query, [shortenedUrl, fullUrl], (err) => {
        if (err) {
          return { status: 403, success: false, error: err };
        } else {
          console.log("Successfully inserted into db", shortenedUrl, fullUrl);
          resolve(true);
        }
      });
    });

    return (
      value && {
        status: 200,
        success: true,
        message: "Successfully inserted into db",
      }
    );
  } else if (isShortened) {
    generateURl(fullUrl);
  } else if (isFullUrl) {
    return { status: 403, message: "URL already exists", success: false };
  }
}

// GET url to redirect to another page
async function getLink({ encodedUrl }) {
  const query = `SELECT fullUrl FROM urls WHERE encodedUrl=?`;

  const value = await new Promise((resolve) => {
    db.get(query, [encodedUrl], (err, row) => {
      if (err) return { status: 403, message: err };

      if (!row) return { status: 404, message: "NOT found" };

      resolve(row);
    });
  });

  return { message: "success", status: 200, data: value.fullUrl };
}

async function editUrlFromDb({ id, newShortenedUrl }) {
  const checkPresent = await isPresent({ shortenedUrl: newShortenedUrl });

  if (!checkPresent) {
    const query = `UPDATE urls SET encodedUrl=? WHERE id=?`;

    const value = await new Promise((resolve) => {
      db.run(query, [newShortenedUrl, id], (err) => {
        if (err) {
          resolve({ status: 403, message: err, success: false });
        }
        resolve({
          status: 200,
          message: "Successfully updated URL",
          success: true,
        });
      });
    });

    // return { status: 200, success: true, error: "Edited url successfully" };

    return value;
  }

  return { status: 403, success: false, error: "URL already exists" };
}

async function deleteFromDb({ id }) {
  const query = `DELETE FROM urls WHERE id=?`;

  await new Promise((resolve) => {
    db.run(query, [id], (err) => {
      if (err) {
        return { status: 403, success: false, error: err };
      }
      resolve("success");
      return { status: 200, success: true, message: "Successfully deleted" };
    });
  });
}

// check whether the shortened url is present in db
async function isPresent({ shortenedUrl }) {
  const query = `SELECT * FROM urls WHERE encodedUrl=?`;

  const value = await new Promise((resolve) => {
    db.get(query, [shortenedUrl], (err, row) => {
      resolve(row);
      if (err) {
        console.log("Error ", err);
        return false;
      } else if (row) {
        console.log("Item found");
        return true;
      } else {
        console.log("Item not found");
      }
    });
  });
  return value ? true : false;
}

async function isFullUrlPresent({ fullUrl }) {
  const query = `SELECT * FROM urls WHERE fullUrl=?`;

  const value = await new Promise((resolve) => {
    db.get(query, [fullUrl], (err, row) => {
      resolve(row);
      if (err) {
        console.log("Error ", err);
        return false;
      } else if (row) {
        console.log("fullUrl found");
        return true;
      } else {
        console.log("full url not found");
      }
    });
  });
  return value ? true : false;
}

export { insertIntoDB, getAllUrls, getLink, deleteFromDb, editUrlFromDb };
