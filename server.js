const express = require("express");
const dotenv = require("dotenv");
const router = require("./router/index");
const database = require("./helpers/database/connectDatabase");
const cors = require("cors")


dotenv.config({ path: "./config/config.env"});

const app = express();
const port = process.env.PORT;
app.use(express.static("public"));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use("/api",router)
app.listen(port, () => {
    
    console.log(`Server is running on port ${port}`);

});