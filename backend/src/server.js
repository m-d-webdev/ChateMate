import app from "./app.js"
import Http from 'http'
import { log } from "console"
import ConnectToDb from './config/db.js'
// --------------
ConnectToDb()
const Server = new Http.createServer(app)
Server.listen(process.env.PORT, () => {
    console.log("--------------------------------------------");
    console.log("✅ ----- Server running on port", process.env.PORT);
    console.log("--------------------------------------------");
    log()
})


