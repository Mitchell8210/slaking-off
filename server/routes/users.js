const router = require("express").Router()
const uuid = require("uuid/v4")
const sha512 = require("js-sha512")
const db = require("../db")
const config = require("config")
const jwt = require("jsonwebtoken")

// register Route
router.post("/register", (req, res, next) => {
  const salt = uuid()
  const username = req.body.username
  const password = sha512(req.body.password + salt)
  console.log(password)

  const sql = `
  INSERT INTO users (username, password, salt) VALUES(?, ?, ?)`

  db.query(sql, [username, password, salt], (err, results, fields) => {
    if (err) {
      throw new Error(err)
    }

    res.json({
      message: "user created",
      results
    })
  })
})
// login Route
router.post("/login", (req, res, next) => {
  const username = req.body.username
  let password = req.body.password
  db.query(
    "SELECT salt FROM users WHERE username = ?",
    [username],
    (err, results, fields) => {
      if (results.length > 0) {
        password = sha512(password + results[0].salt)
        const sql = `
        SELECT count(1) as count FROM users WHERE username =? AND password =?
        `

        db.query(sql, [username, password], (err, results, fields) => {
          if (results[0].count > 0) {
            const token = jwt.sign({ username }, config.get("secret"))

            res.json({
              message: "Authenticated",
              token
            })
          } else {
            res.status(401).json({
              message: "Username or Password are incorrect"
            })
          }
        })
      } else {
        res.status(401).json({
          message: "User doesn't exist"
        })
      }
    }
  )
})

//create new channel Route
router.post("/newchannel", (req, res, next) => {
  const channel = req.body.channelName
  const sql = `
  INSERT INTO channels (channel_name) VALUES(?)
  `
  db.query(sql, [channel], (err, results, fields) => {
    console.log("created new channel")
    res.json({
      message: "channel created"
    })
  })
})

//get list of available channels
router.get("/channels", (req, res, next) => {
  const sql = `
  SELECT channel_name, id FROM channels
  `

  db.query(sql, (err, results, fields) => {
    console.log("got available channels")
    res.json(results)
  })
})
module.exports = router
