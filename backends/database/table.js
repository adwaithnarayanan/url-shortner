import sqlite from "sqlite3";
import { generateURl } from "../services/urlShortner.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const db = new sqlite.Database(
  "url.db",
  {
    verbose: true,
  },
  (err) => {
    if (err) console.error("**error", err);
  }
);

// Check if database exists
db.run(
  `SELECT 1 FROM sqlite_master WHERE type='database' AND name='url.db'`,
  (err) => {
    if (err) {
      // console.log("Database does not exist", err);
      db.run("CREATE DATABASE url");
    }
    //  else {
    //   console.log("Database exists");
    // }
  }
);

db.run(
  `SELECT 1 FROM sqlite_master WHERE type='table' AND name='urls'`,
  (err) => {
    if (err) {
      console.log("Table does not exist", err);
      const sql = `CREATE TABLE urls(id INTEGER PRIMARY KEY, encodedUrl UNIQUE, encodedLink UNIQUE , fullUrl , created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`;
      db.run(sql);
      // console.log("Table created successfully");
    } else {
      // console.log("Table exists")
    }
  }
);

// CREATE TABLES
// const createUserTable = `CREATE TABLE users(id INTEGER PRIMARY KEY, username UNIQUE, email UNIQUE, password, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`;
// db.run(createUserTable);

// const sql = `CREATE TABLE urls(id INTEGER PRIMARY KEY, encodedUrl UNIQUE, encodedLink UNIQUE , fullUrl , created_at DATETIME DEFAULT CURRENT_TIMESTAMP,userId, FOREIGN KEY (userId) REFERENCES users(id))`;
// db.run(sql);

async function createUser({ username, email, password }) {
  const usernameAvailable = await checkUserAvailable({ username });
  const emailAvailable = await checkEmailAvailable({ email });

  console.log(
    "isUsername available ",
    usernameAvailable,
    " ||  is email available ",
    emailAvailable
  );

  if (!usernameAvailable && !emailAvailable) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const query = `INSERT INTO users(username, email, password) VALUES(?,?,?)`;

    const value = await new Promise((resolve) => {
      db.run(query, [username, email, hashedPassword], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
    return value
      ? { status: 201, message: "Successfully created user", success: true }
      : {
          status: 207,
          message: "Unable to create user profile",
          success: false,
        };
  } else if (usernameAvailable) {
    return { status: 207, message: "username already exists", success: false };
  } else if (emailAvailable) {
    return { status: 207, message: "email already exists", success: false };
  }
}

async function loginUserProfile({ email, password }) {
  const query = `SELECT * FROM users WHERE email=?`;

  const userRow = await new Promise((resolve) => {
    db.get(query, [email], (err, row) => {
      if (err) return { status: 403, message: err };
      resolve(row);
    });
  });

  if (!userRow) {
    return { status: 207, message: "User not found", success: false };
  } else if (userRow && (await bcrypt.compare(password, userRow.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userRow.username,
          email: userRow.email,
          id: userRow.id,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "5min" }
    );

    return { status: 200, message: "Successfully logged in", accessToken };
  } else {
    return { status: 207, message: "Password doesn't match" };
  }
}

// Retrieve all rows from table
async function getAllUrls({ id }) {
  const query = `SELECT * FROM urls WHERE userId=?`;

  const value = await new Promise((resolve) => {
    db.all(query, [id], (err, rows) => {
      if (err) return { status: 403, message: err };

      if (rows.length < 1) {
        // return { status: 403, message: "No match" };
        resolve([]);
      }

      resolve(rows);
    });
  });

  // db.close();
  return { message: "success", status: 200, data: value };
}

// INSERT fullUrl and shortened url into db
async function insertIntoDB({ fullUrl, urlLength, userId }) {
  const shortenedUrl = generateURl({ urlLength });

  const isShortened = await isPresent({ shortenedUrl });
  const isFullUrl = await isFullUrlPresent({ fullUrl, userId });

  if (!isShortened && !isFullUrl) {
    const query = `INSERT INTO urls(encodedUrl, encodedLink, fullUrl, userId) VALUES(?,?,?,?)`;

    const value = await new Promise((resolve) => {
      db.run(
        query,
        [
          shortenedUrl,
          `http://localhost:8000/${shortenedUrl}`,
          fullUrl,
          userId,
        ],
        (err) => {
          if (err) {
            return { status: 403, success: false, error: err };
          } else {
            console.log("Successfully inserted into db", shortenedUrl, fullUrl);

            resolve(true);
          }
        }
      );
    });

    return (
      value && {
        status: 200,
        success: true,
        message: "Successfully added URL",
      }
    );
  } else if (isShortened) {
    generateURl(fullUrl);
  } else if (isFullUrl) {
    return { status: 201, message: "URL already exists", success: false };
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

async function editUrlFromDb({ id, newFullUrl, userId }) {
  const checkPresent = await isFullUrlPresent({ fullUrl: newFullUrl, userId });

  if (!checkPresent) {
    const query = `UPDATE urls SET fullUrl=? WHERE id=? AND userId=?`;

    const value = await new Promise((resolve) => {
      db.run(
        query,
        // [newShortenedUrl, `http://localhost:8000/${newShortenedUrl}`, id],
        [newFullUrl, id, userId],
        (err) => {
          if (err) {
            resolve({ status: 403, message: err, success: false });
          }
          resolve({
            status: 200,
            message: "Successfully updated URL",
            success: true,
          });
        }
      );
    });

    return value;
  }

  return { status: 202, success: false, error: "URL already exists" };
}

async function deleteFromDb({ id, userId }) {
  const query = `DELETE FROM urls WHERE id=? AND userId=?`;

  const value = await new Promise((resolve) => {
    db.run(query, [id, userId], (err) => {
      if (err) {
        return { status: 403, success: false, error: err };
      }
      resolve({
        status: 200,
        success: true,
        message: "Successfully deleted URL",
      });
    });
  });
  return value;
}

async function checkUserAvailable({ username }) {
  const query = `SELECT * FROM users WHERE username=?`;
  const value = await new Promise((resolve) => {
    db.get(query, [username], (err, row) => {
      if (err) {
        resolve({ success: false, error: err });
        return false;
      }

      resolve({ success: true, row: row });
    });
  });
  return value.row ? true : false;
}

async function checkEmailAvailable({ email }) {
  const query = `SELECT * FROM users WHERE email=?`;
  const value = await new Promise((resolve) => {
    db.get(query, [email], (err, row) => {
      if (err) {
        resolve({ success: false, error: err });
      }
      resolve({ success: true, row: row });
    });
  });

  return value.row ? true : false;
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

async function isFullUrlPresent({ fullUrl, userId }) {
  const query = `SELECT * FROM urls WHERE fullUrl=? AND userId=?`;

  const value = await new Promise((resolve) => {
    db.get(query, [fullUrl, userId], (err, row) => {
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

export {
  insertIntoDB,
  getAllUrls,
  getLink,
  deleteFromDb,
  editUrlFromDb,
  createUser,
  loginUserProfile,
};
