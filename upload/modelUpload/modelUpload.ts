import path from "path";
import multer from "multer";

export const fileFilter = function (req, file, cb) {
  var acceptableMime = ["application/macbinary", "application/json"];
  // 限制类型
  // null是固定写法
  if (acceptableMime.indexOf(file.mimetype) !== -1) {
    cb(null, true); // 通过上传
  } else {
    cb(null, true); // 禁止上传
  }
};

var storage = multer.diskStorage({
  //设置 上传图片服务器位置
  destination: path.resolve(__dirname, "../../db/models"),
  //设置 上传文件保存的文件名
  filename: function (req: any, file, cb) {
    if (req.myFilelist) {
      req.myFilelist.push(file.originalname);
    } else {
      req.myFilelist = [file.originalname];
    }
    cb(null, file.originalname);
  },
});

var limits: any = {
  fileSize: "200MB", //设置限制（可选）
};

export const modelUploader = multer({
  fileFilter,
  storage,
  limits,
}).any();
