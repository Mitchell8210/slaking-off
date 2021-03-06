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
  const securityAnswer = req.body.securityAnswer
  console.log(password)

  const sql = `
  INSERT INTO users (username, password, salt, security_answer) VALUES(?, ?, ?, ?)`

  db.query(
    sql,
    [username, password, salt, securityAnswer],
    (err, results, fields) => {
      if (err) {
        throw new Error(err)
      }

      res.json({
        message: "user created",
        results
      })
    }
  )
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

// UPDATE PASSWORD ROUTER
router.post("/updatePassword", (req, res, next) => {
  const salt = uuid()
  const username = req.body.username
  const password = sha512(req.body.password + salt)
  const securityAnswer = req.body.answer
  const sql = `
  UPDATE users set password = '${password}',
  salt = "${salt}"
  where security_answer = "${securityAnswer}" AND username = "${username}"
  `
  db.query(sql, (err, results, fields) => {
    if (results.changedRows > 0) {
      console.log("updated password")
      res.json({
        message: "updated password"
      })
    } else {
      res.json({
        message:
          "password not updated, please check that the username and security answer are valid"
      })
    }

    console.log(results)
  })
})

//create new channel Route
router.post("/newchannel", (req, res, next) => {
  const channel = req.body.channelName
  const creator = req.body.creatorName
  const description = req.body.description
  const sql = `
  INSERT INTO channels (channel_name, creator_name, description ) VALUES(?,?,?)
  `
  db.query(sql, [channel, creator, description], (err, results, fields) => {
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

// update the profile info of a user

router.post("/updateProfile", (req, res, next) => {
  const email = req.body.email
  const location = req.body.location
  const about = req.body.about
  const username = req.body.username
  const url = req.body.url
  const sql = `
  UPDATE users 
set 
email = ?,
location = ?,
about = ?,
url = ?
WHERE username = ?

  `

  db.query(
    sql,
    [email, location, about, url, username],
    (err, results, fields) => {
      console.log("updated profile")
      res.json(results)
    }
  )
})

// get the profile info of a user

router.get("/profile/:username", (req, res, next) => {
  const username = req.params.username
  console.log(username)
  const sql = `
  SELECT username, email, location, about, url
  FROM users
  WHERE username =?
  `
  db.query(sql, [username], (err, results, fields) => {
    res.json(results)
    console.log(results)
    console.log("got profile info")
  })
})
module.exports = router
