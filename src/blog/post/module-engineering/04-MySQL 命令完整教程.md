---
title: MySQL 命令完整教程
date: 2026/05/29
desc: 从连接 MySQL 开始，系统讲清楚数据库、数据表、增删改查、条件查询、排序分页、聚合统计、导入导出和常见维护命令，适合开发时直接理解和使用。
tags: ['#工程化', '#全部', '#MySQL', '#数据库']
cover: https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇文章主要解决一个问题：刚开始接触数据库时，MySQL 最常用的命令到底有哪些，以及它们分别是干什么的。</small>

# 一、先理解 MySQL 是做什么的

`MySQL` 是一种关系型数据库管理系统。

简单理解，它就是专门用来存数据、查数据、修改数据的一套系统。

在日常开发里，MySQL 经常用来保存这些内容：

- 用户信息
- 订单数据
- 文章内容
- 评论记录
- 权限和角色配置

如果把前端页面理解成“展示层”，那数据库更像“数据仓库”。

# 二、先理解几个最常见的概念

很多人学数据库时不是不会写命令，而是概念一开始容易混。

## 1. 数据库

数据库可以理解成一个大容器。

比如一个项目可能有一个数据库叫：

```sql
myinfo_site
```

## 2. 数据表

表是数据库里的具体数据结构。

比如同一个数据库里，可能有这些表：

- `users`
- `posts`
- `projects`

## 3. 行和列

表里的每一条数据通常是一行。  
每个字段，比如用户名、邮箱、创建时间，就是列。

## 4. SQL

你平时写的：

```sql
SELECT * FROM users;
```

这类命令属于 `SQL`，也就是和数据库交流的语言。

# 三、先连接到 MySQL

## 1. 使用命令行连接

```bash
mysql -u root -p
```

作用：

- `-u` 表示用户名
- `-p` 表示让你输入密码

执行后，系统会提示输入密码，输入正确后就能进入 MySQL 命令行。

## 2. 连接指定数据库

```bash
mysql -u root -p myinfo_site
```

作用：

- 登录后直接进入指定数据库

## 3. 指定主机和端口连接

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

作用：

- `-h` 指定数据库地址
- `-P` 指定端口

如果数据库不在本机，或者端口不是默认端口，这条命令就很常用。

# 四、数据库相关命令

## 1. 查看当前所有数据库

```sql
SHOW DATABASES;
```

作用：

- 查看 MySQL 服务器里有哪些数据库

## 2. 创建数据库

```sql
CREATE DATABASE myinfo_site;
```

如果希望指定字符集，常见写法是：

```sql
CREATE DATABASE myinfo_site CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

作用：

- 新建一个数据库
- 一般推荐直接用 `utf8mb4`

## 3. 切换数据库

```sql
USE myinfo_site;
```

作用：

- 告诉 MySQL，后续操作都在这个数据库里执行

## 4. 查看当前正在使用的数据库

```sql
SELECT DATABASE();
```

## 5. 删除数据库

```sql
DROP DATABASE myinfo_site;
```

注意：

- 这会直接删除整个数据库以及里面所有表
- 执行前一定确认数据是否需要备份

# 五、数据表相关命令

## 1. 查看当前数据库里的表

```sql
SHOW TABLES;
```

## 2. 创建数据表

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

这段命令的意思可以简单理解成：

- `id`：主键，自增
- `username`：用户名
- `email`：邮箱
- `created_at`：创建时间

## 3. 查看建表语句

```sql
SHOW CREATE TABLE users;
```

作用：

- 查看这个表当时是怎么创建出来的

## 4. 查看表结构

```sql
DESC users;
```

或者：

```sql
DESCRIBE users;
```

作用：

- 查看字段名、类型、是否可空、默认值等信息

## 5. 删除数据表

```sql
DROP TABLE users;
```

注意：

- 这会直接删表
- 表中的数据也会一起消失

## 6. 修改表名

```sql
RENAME TABLE users TO app_users;
```

## 7. 给表新增字段

```sql
ALTER TABLE users ADD age INT;
```

## 8. 修改字段类型

```sql
ALTER TABLE users MODIFY username VARCHAR(100);
```

## 9. 删除字段

```sql
ALTER TABLE users DROP age;
```

# 六、插入数据相关命令

## 1. 插入一条数据

```sql
INSERT INTO users (username, email) VALUES ('tom', 'tom@example.com');
```

作用：

- 向 `users` 表里新增一条记录

## 2. 一次插入多条数据

```sql
INSERT INTO users (username, email)
VALUES
  ('tom', 'tom@example.com'),
  ('jack', 'jack@example.com'),
  ('lucy', 'lucy@example.com');
```

作用：

- 批量插入数据

# 七、查询数据相关命令

这是 MySQL 里最核心的一部分，也是开发里最常用的内容。

## 1. 查询表中所有数据

```sql
SELECT * FROM users;
```

作用：

- 查询 `users` 表中所有字段、所有记录

## 2. 查询指定字段

```sql
SELECT id, username, email FROM users;
```

作用：

- 只查你需要的列

实际开发里，通常不建议总是写 `SELECT *`，因为会查出不需要的字段。

## 3. 条件查询

```sql
SELECT * FROM users WHERE id = 1;
```

作用：

- 只查满足条件的数据

## 4. 多条件查询

```sql
SELECT * FROM users WHERE username = 'tom' AND email = 'tom@example.com';
```

## 5. 或条件查询

```sql
SELECT * FROM users WHERE username = 'tom' OR username = 'jack';
```

## 6. 模糊查询

```sql
SELECT * FROM users WHERE username LIKE '%tom%';
```

说明：

- `%` 表示任意多个字符

常见写法：

- `'%tom%'`：包含 `tom`
- `'tom%'`：以 `tom` 开头
- `'%tom'`：以 `tom` 结尾

## 7. 范围查询

```sql
SELECT * FROM users WHERE id BETWEEN 1 AND 10;
```

## 8. 查询某些固定值

```sql
SELECT * FROM users WHERE id IN (1, 3, 5);
```

## 9. 判断是否为空

```sql
SELECT * FROM users WHERE email IS NULL;
```

或者：

```sql
SELECT * FROM users WHERE email IS NOT NULL;
```

# 八、排序与分页相关命令

## 1. 升序排序

```sql
SELECT * FROM users ORDER BY id ASC;
```

## 2. 降序排序

```sql
SELECT * FROM users ORDER BY id DESC;
```

作用：

- `ASC`：升序
- `DESC`：降序

## 3. 限制返回条数

```sql
SELECT * FROM users LIMIT 10;
```

作用：

- 只取前 10 条记录

## 4. 分页查询

```sql
SELECT * FROM users LIMIT 0, 10;
```

作用：

- 从第 0 条开始，取 10 条

比如第二页通常可以写成：

```sql
SELECT * FROM users LIMIT 10, 10;
```

# 九、更新与删除相关命令

## 1. 更新数据

```sql
UPDATE users SET username = 'tom-new' WHERE id = 1;
```

作用：

- 把 `id = 1` 这条记录的用户名改掉

注意：

- 一定要带 `WHERE`
- 不带 `WHERE` 会把整张表都改掉

## 2. 删除某条数据

```sql
DELETE FROM users WHERE id = 1;
```

同样注意：

- 一定尽量加 `WHERE`
- 不带条件会删掉整张表所有记录

## 3. 清空表数据

```sql
TRUNCATE TABLE users;
```

作用：

- 清空整张表的数据
- 通常比逐条 `DELETE` 更直接

# 十、聚合统计相关命令

## 1. 统计总条数

```sql
SELECT COUNT(*) FROM users;
```

## 2. 求最大值

```sql
SELECT MAX(id) FROM users;
```

## 3. 求最小值

```sql
SELECT MIN(id) FROM users;
```

## 4. 求平均值

```sql
SELECT AVG(score) FROM students;
```

## 5. 求总和

```sql
SELECT SUM(amount) FROM orders;
```

这些命令常用于：

- 统计用户总数
- 统计订单金额
- 看某个字段的范围

# 十一、分组查询相关命令

## 1. 按字段分组

```sql
SELECT role, COUNT(*) FROM users GROUP BY role;
```

作用：

- 按 `role` 分组统计数量

## 2. 分组后筛选

```sql
SELECT role, COUNT(*) AS total
FROM users
GROUP BY role
HAVING total > 1;
```

说明：

- `WHERE` 是分组前筛选
- `HAVING` 是分组后筛选

# 十二、连接查询相关命令

如果数据库里有多张表，常常需要把它们关联起来查。

## 1. 内连接

```sql
SELECT users.username, orders.order_no
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

作用：

- 查出两张表里能对应上的数据

## 2. 左连接

```sql
SELECT users.username, orders.order_no
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

作用：

- 即使用户没有订单，也把用户查出来

开发里 `LEFT JOIN` 用得非常多。

# 十三、用户与权限相关命令

这部分在本地开发可能不常改，但服务器上经常会碰到。

## 1. 创建用户

```sql
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'your_password';
```

## 2. 给用户授权

```sql
GRANT ALL PRIVILEGES ON myinfo_site.* TO 'app_user'@'localhost';
```

## 3. 刷新权限

```sql
FLUSH PRIVILEGES;
```

## 4. 查看用户权限

```sql
SHOW GRANTS FOR 'app_user'@'localhost';
```

# 十四、导入导出相关命令

## 1. 导出数据库

```bash
mysqldump -u root -p myinfo_site > myinfo_site.sql
```

作用：

- 把数据库导出成一个 SQL 文件

## 2. 导入数据库

```bash
mysql -u root -p myinfo_site < myinfo_site.sql
```

作用：

- 把 SQL 文件导入到数据库里

这两条命令在迁移项目、备份数据时非常常见。

# 十五、常见排查命令

## 1. 查看当前 MySQL 版本

```sql
SELECT VERSION();
```

## 2. 查看当前时间

```sql
SELECT NOW();
```

## 3. 查看当前登录用户

```sql
SELECT USER();
```

## 4. 查看字符集

```sql
SHOW VARIABLES LIKE 'character_set_%';
```

## 5. 查看存储引擎

```sql
SHOW ENGINES;
```

# 十六、开发里特别常用的一套完整流程

如果你只是本地开发，一个最常见流程通常是这样：

## 1. 连接数据库

```bash
mysql -u root -p
```

## 2. 查看有哪些数据库

```sql
SHOW DATABASES;
```

## 3. 选择要操作的数据库

```sql
USE myinfo_site;
```

## 4. 看有哪些表

```sql
SHOW TABLES;
```

## 5. 查看表结构

```sql
DESC users;
```

## 6. 查询数据

```sql
SELECT * FROM users LIMIT 10;
```

## 7. 插入或修改数据

```sql
INSERT INTO users (username, email) VALUES ('tom', 'tom@example.com');
UPDATE users SET username = 'jack' WHERE id = 1;
```

做到这里，已经够应付大多数基础开发场景了。

# 十七、最容易出问题的地方

## 1. 忘记切换数据库

比如你执行了建表或查询命令，但根本没先执行：

```sql
USE myinfo_site;
```

这样很容易操作错地方。

## 2. `UPDATE` 或 `DELETE` 忘记加 `WHERE`

这是最常见的风险之一。

错误示例：

```sql
UPDATE users SET username = 'tom';
DELETE FROM users;
```

这类命令可能会把整张表都改掉或删掉。

## 3. 字符集没处理好

如果数据库、表、连接字符集不统一，中文就可能乱码。  
所以新项目通常建议直接统一用：

- `utf8mb4`

# 十八、最后怎么记最省事

如果你现在只想先记住最常用的一组命令，优先记这些：

```sql
SHOW DATABASES;
USE myinfo_site;
SHOW TABLES;
DESC users;
SELECT * FROM users;
INSERT INTO users (username, email) VALUES ('tom', 'tom@example.com');
UPDATE users SET username = 'jack' WHERE id = 1;
DELETE FROM users WHERE id = 1;
SELECT * FROM users ORDER BY id DESC LIMIT 10;
```

这几条已经覆盖：

- 选库
- 看表
- 看结构
- 查数据
- 新增
- 修改
- 删除
- 排序分页

# 十九、一句话总结

如果把 MySQL 命令压缩成一句话来理解，那就是：

- 先连接数据库
- 再选数据库和数据表
- 然后用 `SELECT`、`INSERT`、`UPDATE`、`DELETE` 完成日常数据操作
- 再配合排序、分页、统计和导入导出命令完成更完整的开发工作

先把这些最常用命令理解清楚，后面再学索引、事务、优化和设计表结构，就会顺很多。
