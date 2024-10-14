import sqlite from "sqlite3";
import { generateURl } from "../controllers/urlShortner.js";

const db = new sqlite.Database("url.db", { verbose: true });

// Check if database exists
db.run(
  `SELECT 1 FROM sqlite_master WHERE type='database' AND name='url.db`,
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

async function getAllUrls({ res }) {
  const query = `SELECT * FROM urls`;
  console.log(1234);
  //   try {
  //     db.all(query, [], (err, rows) => {
  //       if (err) return res.json({ status: 403, success: false, error: err });

  //       if (rows.length < 1) {
  //         return res.json({ status: 403, success: false, error: "No match" });
  //       }

  //       //   return res.json({ status: 200, data: rows, success: true });
  //       console.log("rows ", rows);
  //       //   return rows;
  //     });
  //   } catch (err) {
  //     return res.json({ status: 403, success: false, error: err });
  //   }

  try {
    // console.log("rowsssss");
    db.all(query, [], (err, rows) => {
      if (err) return { status: 403, message: err };

      if (rows.length < 1) {
        return { status: 403, message: "No match" };
      }

      console.log("rows ", rows);
      return { status: 200, message: rows };
      //   return rows;
    });
  } catch (err) {
    return { status: 403, message: err };
  }

  return { message: "hey", status: 200 };

  /* 


  db.all(query, [], (err, rows) => {
    console.log("rows ", rows);

    if (err) return { status: 403, success: false, error: err };

    if (rows.length < 1) {
      return { status: 403, success: false, error: "No match" };
    }

    return { status: 200, message: "hey" };

    // return { rows };
  });

*/
}

function insertIntoDB({ res, fullUrl }) {
  const shortenedUrl = generateURl();

  if (!isPresent({ shortenedUrl })) {
    const query = `INSERT INTO urls(encodedUrl, fullUrl) VALUES(?,?)`;
    db.run(query, [shortenedUrl, fullUrl], (err) => {
      if (err) {
        return res.json({ status: 403, success: false, error: err });
      }
      console.log("Successfully inserted ", shortenedUrl, fullUrl);
    });
  } else {
    generateURl(fullUrl);
  }
}

function isPresent({ shortenedUrl }) {
  db.get(
    `SELECT * FROM urls WHERE encodedUrl=?`,
    [shortenedUrl],
    (err, row) => {
      if (err) {
        console.error("### ", err);
        return false;
      } else if (row) {
        console.log(`Item found`);
        return true;
      } else {
        console.log("item not found");
        return false;
      }
    }
  );
}

export { insertIntoDB, getAllUrls };
