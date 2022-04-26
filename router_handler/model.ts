import db from "../db/index";
//增

//查
export const getAllmodels = function (req, respone) {
  db.query("select * from model", {}, (err, res) => {
    if (err) return respone.cc(err);
    respone.send({
      status: 0,
      message: "获取模型信息成功!",
      data: res,
    });
  });
};

//上传模型的处理逻辑
export const addModel = function (req, respone) {
  const body = req.body;
  db.query(
    "insert into model set ?",
    {
      model_detial: body.model_detial,
      model_type: body.model_type,
      model_path: body.model_path,
      model_name: body.model_name,
    },
    (err, res) => {
      if (err) return respone.cc(err);
      respone.send({
        status: 0,
        message: "上传模型信息成功!",
        data: "",
      });
    }
  );
};
