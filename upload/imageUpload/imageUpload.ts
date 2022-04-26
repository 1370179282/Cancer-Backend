import path from "path";
import multer from "multer";

export const fileFilter = function (req, file, cb) {
  var acceptableMime = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
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
  destination: path.resolve(__dirname, "./buffer"),
  //设置 上传文件保存的文件名
  filename: function (req, file, cb) {
    // 获取后缀扩展
    let extName = file.originalname.slice(file.originalname.lastIndexOf(".")); //.jpg
    // 获取名称
    if (extName === ".tif") {
      extName = ".png";
    }
    let fileName = Date.now();
    console.log(fileName + extName); //12423543465.jpg
    req.myURL = fileName + extName;
    cb(null, fileName + extName);
  },
});

var limits = {
  fileSize: "200MB", //设置限制（可选）
};

export const imageUploader = multer({
  fileFilter,
  storage,
  limits,
}).array("file");
