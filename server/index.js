require('dotenv').config()
const connection = require('./db')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const express = require('express')
const app = express()
const cors = require('cors')
const { patch } = require('./routes/auth')
const port = process.env.PORT || 8080
const path = require('path');
const userListRoutes = require("./routes/getUsersByToken")
const tokenVerification = require('./middleware/tokenVerification')
app.use(express.static(path.join(__dirname, 'build')))

connection()

app.use(express.json())
app.use(cors())


// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.use(tokenVerification)
app.use("/api/userlist", userListRoutes)


app.listen(port, () => console.log(`PORT: ${port}`))
