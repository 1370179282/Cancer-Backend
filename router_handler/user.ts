import db from "../db/index";
// import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import config from "../config";

//注册模块
export const regUser = (req, res) => {
  const userinfo = req.body;
  console.log(userinfo, "userinfo");
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: "用户名或密码不能为空!" });
  }
  //校验
  db.query(
    "select * from ev_users where username= ?",
    [userinfo.username],
    (err, result) => {
      if (err) {
        return res.send({ status: 1, message: err.message });
      }
      if (result.length > 0) {
        return res.send({
          status: 1,
          message: "用户名被占用，请更换其他用户名!",
        });
      }
      //插入新用户
      db.query(
        "insert into ev_users set ?",
        { username: userinfo.username, password: userinfo.password },
        (err, result) => {
          if (err) return res.send({ status: 1, message: err.message });
          if (result.affectedRows !== 1) {
            return res.send({
              status: 1,
              message: "注册用户失败，请稍后再试!",
            });
          }
          res.send({ status: 0, message: "注册成功!" });
        }
      );
    }
  );
};

// 登录的处理函数
export const login = (req, res) => {
  const userinfo = req.body;
  const sql = `select * from ev_users where username=?`;
  db.query(sql, userinfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    console.log(results, "res");
    if (results.length !== 1) return res.cc("登录失败!");
    // TODO:判断用户输入的登录密码是否和数据库中的密码一致 })
    if (userinfo.password !== results[0].password) {
      return res.cc("登录密码错误!");
    }
    console.log(results);
    const user = { ...results[0], password: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h", // token 有效期为 10 个小时 })
    });
    res.send({
      status: 0,
      message: "登录成功!",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: "Bearer " + tokenStr,
    });
  });
};
