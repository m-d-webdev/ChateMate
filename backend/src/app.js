import { log } from 'console'
import bodyParser from "body-parser"
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { configDotenv } from 'dotenv'

import guestRoutes from './Routes/guestRoutes.js'
import AuthRoutes from './Routes/requireAuth.js'
// -------------

configDotenv()
const app = express()

// --------------

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRIT,
    resave: false,
    saveUninitialized: true
}))



// ----------


app.get('/', (req, res) => {
    return res.send("Hi brother")
})

app.use(guestRoutes)
app.use(AuthRoutes)




export default app

