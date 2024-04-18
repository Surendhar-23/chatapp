let express = require("express");
let path = require("path");
let app = express();
let router = express.Router();
let bodyParser = require("body-parser");
let { loginpage, loginauth } = require("./controllers/loginController");
const { signuppage, signupauth } = require("./controllers/signupController");
const { chatPage, chatcontroller } = require("./controllers/chatController");
const initializeSocket = require("./utils/socket");
const cors = require("cors");

const http = require("http");
const { ObjectId } = require("./utils/db");

app.use(cors());

const server = http.createServer(app);
initializeSocket(server);

app.use(bodyParser.urlencoded());
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

router.get("/login", loginpage);
router.get("/signup", signuppage);
router.get("/chat", chatPage);

router.post("/login", loginauth);
router.post("/signup", signupauth);
router.post("/chat", chatcontroller);

router.get("/api/data", (req, res) => {
  let data = {
    name: "surendhar",
    dob: "23/03/24",
  };
  res.json(data);
});

app.use(router);

server.listen(3000, () => {
  console.log("Server is successfully running");
});
