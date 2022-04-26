import db from "../db/index";

export const getuserinfo = (req, res) => {
  const sql = `select id, username, classification,model_id from ev_users where id=?`;
  db.query(sql, req.user.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc("获取用户信息失败!");
    // 3. 将用户信息响应给客户端
    db.query(
      "select * from model where model_id = ?",
      results[0].model_id,
      (merr, mres) => {
        if (merr) return res.cc(merr);
        res.send({
          status: 0,
          message: "获取用户基本信息成功!",
          userdata: results[0],
          usermodel: mres,
        });
      }
    );
  });
};


//用户默认模型改变
export const changeDefuatModel = (req, res) => {
  db.query(
    "update ev_users set model_id=? where id = ? ",
    [req.body.model_id, req.user.id],
    (err, results) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        message: "修改默认模型成功!",
        data: "",
      });
    }
  );
};
