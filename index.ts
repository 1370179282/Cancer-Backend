import express from "express";
import cors from "cors";
import userRouter from "./router/user";
//import db from "./db/index";
import config from "./config";
import expressJWT from "express-jwt";
// import joi from "@hapi/joi";
import userinfoRouter from "./router/userinfo";
import modelRouter from "./router/model";
import { imageUploader } from "./upload/imageUpload/imageUpload";
import { modelUploader } from "./upload/modelUpload/modelUpload";
import fs from "fs";
import path from "path";
// import uploadRouter from "./router/upload";
// import koaBody from "koa-body";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

//@ts-ignore
app.use((req, res, next) => {
  //@ts-ignore
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

app.use(
  //@ts-ignore
  expressJWT({ secret: config.jwtSecretKey }).unless({
    path: [/^\/api\//, /^\/static\//, /^\/static1\//],
  })
);

// app.use("/static", express.static("upload/upload")); //静态资源目录
app.use("/static", express.static("db/models"));
app.use("/static1", express.static("upload/imageUpload"));

// app.use(koaBody({ multipart: true }));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/imageUpload", imageUploader, (req: any, res) => {
  res.send("http://127.0.0.1:3007/static1/buffer/" + req.myURL); //返回url给前端
});
app.post("/modelUpload", modelUploader, (req: any, res) => {
  console.log(req.myFilelist, "res.send");
  const newpath = Date.now();
  let i = 0;
  fs.mkdir(`./db/models/${newpath}`, (err) => {
    if (err) return console.error(err);
    //res.send(`http://127.0.0.1:3007/static/${newpath}`); //返回url给前端
    for (let item of req.myFilelist) {
      const sourceFile = path.join(__dirname + "/db/models", item);
      const destPath = path.join(
        __dirname + "/db/models",
        newpath.toString(),
        item
      );
      fs.rename(sourceFile, destPath, function (err) {
        if (err) throw err;
        i++;
        if (i === 3) {
          res.send(`http://127.0.0.1:3007/static/${newpath}`);
        }
      });
    }
  });
});

// app.use("/upload", uploadRouter);
app.use("/api", userRouter); //登陆注册模块
app.use("/my", userinfoRouter); //用户信息模块
app.use("/model", modelRouter); //模型模块

app.use((err, req, res, next) => {
  // 数据验证失败
  //if (err instanceof joi.ValidationError) return res.cc(err); // 未知错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败!");
  res.cc(err);
});

app.listen(3007, function () {
  console.log("api server running at http://127.0.0.1:3007");
  // db.query("SELECT * FROM ev_users WHERE password > 100", (err, res) => {
  //   if (err) return console.log(err.message);
  //   console.log(res);
  // });
});
