// 导入 mysql 模块
import mysql from "mysql";

// 创建数据库连接对象
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Zz223322@",
  database: "my_db_01",
});
// 向外共享 db 数据库连接对象
export default db;
