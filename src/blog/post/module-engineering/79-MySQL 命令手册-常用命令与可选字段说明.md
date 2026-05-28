---
title: MySQL 命令手册（全量单文件版）
date: 2026/05/20
desc: 按单文件手册方式整理 MySQL 命令体系，覆盖 SQL 语句、客户端工具、权限、事务、排查与运维命令，并尽量给出可选字段说明。
tags: ['#全部', '#MySQL', '#工程化']
cover: https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇直接收成单文件版本，不再拆索引。你要的是尽量全量、能直接查、代码块优先，所以我统一按“命令描述 + 代码块 + 可选字段说明”的方式整理。</small>

# 一、先说范围

- 这篇覆盖两大类：
  - MySQL 客户端 / 运维工具命令
  - MySQL SQL 语句命令
- 重点命令会写完整语法和可选字段说明。
- 少数极冷门命令也尽量列出来，但不会把同义命令无意义重复很多遍。

## 先这么用

- 不要从头顺着背命令，先直接抄下面的场景模板。
- 模板先解决“怎么做”，后面的完整语法区再解决“字段是什么意思”。
- 真正使用时建议按这个顺序：
  - 先找场景模板
  - 能跑通后再往下翻完整语法
  - 需要改参数时再看字段说明
- 如果你不知道该改哪几个地方，先只替换这些占位符：
  - `my_db`：数据库名
  - `users`：表名
  - `id`：主键或唯一定位字段
  - `status`、`username`、`email`：你的业务字段

## 不会用时，先按这 4 步走

### 1. 先确认你在操作哪一个库、哪一张表

命令描述：不要一上来就写 `update` 或 `delete`，先确认库表和结构。

```sql
show databases;
use my_db;
show tables;
show create table users;
desc users;
show index from users;
```

### 2. 先用 `select` 把影响范围查出来

命令描述：凡是要改数据，先把将被影响的记录查出来，确认 where 条件没写错。

```sql
select *
from users
where status = 0
limit 20;
```

### 3. 再执行修改，危险操作优先放进事务

命令描述：先 `begin`，改完先查结果，对了再 `commit`，不对就 `rollback`。

```sql
begin;

update users
set status = 1
where id = 1;

select *
from users
where id = 1;

commit;
```

### 4. 最后做一次复查

命令描述：确认结构有没有改成功、索引有没有加上、数据是不是符合预期。

```sql
show create table users;
show index from users;
select * from users where id = 1;
```

## 最容易出错的 4 个原则

- 改数据前先 `select`，不要直接盲改。
- `update` / `delete` 默认都要带 `where`，没有把握就先开事务。
- 改表前先 `show create table`，不要只凭印象记字段名。
- 排查慢 SQL 时不要先猜，先看 `explain analyze` 和索引。

## 高频场景模板

### 1. 连接数据库

命令描述：连接本地或远程 MySQL，进入交互终端。

```bash
mysql -u root -p
mysql -h 127.0.0.1 -P 3306 -u root -p -D my_db
```

### 2. 创建库并进入

命令描述：新建数据库并切换到这个库。

```sql
create database if not exists my_db
  character set utf8mb4
  collate utf8mb4_general_ci;

use my_db;
```

### 3. 创建一张最常见的业务表

命令描述：创建带主键、默认值、时间字段的基础表。

```sql
create table if not exists users (
  id bigint primary key auto_increment comment '主键',
  username varchar(50) not null comment '用户名',
  email varchar(100) default null comment '邮箱',
  status tinyint not null default 1 comment '状态',
  created_at datetime not null default current_timestamp comment '创建时间',
  updated_at datetime not null default current_timestamp on update current_timestamp comment '更新时间'
) engine=innodb default charset=utf8mb4 comment='用户表';
```

### 4. 查前 10 条数据

命令描述：先确认表里有没有数据，再看字段是不是你想要的。

```sql
select * from users limit 10;
```

### 5. 按条件查询

命令描述：带筛选、排序、分页，是列表页最常见的写法。

```sql
select id, username, status, created_at
from users
where status = 1
order by created_at desc
limit 20 offset 0;
```

### 6. 插入一条数据

命令描述：插入最基础的一条记录。

```sql
insert into users (username, email, status)
values ('tom', 'tom@test.com', 1);
```

### 7. 批量插入

命令描述：一次插入多条，初始化数据经常这么写。

```sql
insert into users (username, email, status)
values
  ('tom', 'tom@test.com', 1),
  ('jerry', 'jerry@test.com', 1),
  ('amy', 'amy@test.com', 0);
```

### 8. 更新一条数据

命令描述：按主键更新，最稳妥。

```sql
update users
set status = 0, email = 'new@test.com'
where id = 1;
```

### 9. 删除一条数据

命令描述：删除前一定带 `where`。

```sql
delete from users
where id = 1;
```

### 10. 给表加字段

命令描述：线上最常见的改表动作之一。

```sql
alter table users
add column phone varchar(20) default null comment '手机号' after email;
```

### 11. 给表加索引

命令描述：给筛选或排序字段加索引。

```sql
create index idx_users_status_created_at
on users (status, created_at desc);
```

### 12. 事务里做两步写操作

命令描述：需要“要么都成功，要么都失败”时这么写。

```sql
start transaction;

update users
set status = 0
where id = 1;

insert into user_logs (user_id, action)
values (1, 'disable');

commit;
```

出错时改成：

```sql
rollback;
```

### 13. 查慢 SQL 或卡住的会话

命令描述：排查数据库卡顿时最先看的几条命令。

```sql
show full processlist;
show status like 'threads_connected';
show variables like 'max_connections';
```

### 14. 看一条查询有没有走索引

命令描述：查执行计划，先看 `key`、`rows`、`extra`。

```sql
explain analyze
select *
from users
where username = 'tom';
```

### 15. 杀掉一个卡住的查询

命令描述：只杀 SQL，不直接杀整个连接。

```sql
kill query 12345;
```

### 16. 导出数据库

命令描述：导出整个库，最常见的备份方式。

```bash
mysqldump -u root -p --single-transaction my_db > my_db.sql
```

### 17. 导入数据库

命令描述：把 SQL 文件导回到指定库。

```bash
mysql -u root -p my_db < my_db.sql
```

### 18. 创建业务账号并授权

命令描述：给应用创建单独账号，不直接用 root。

```sql
create user 'app_user'@'%' identified by '123456';

grant select, insert, update, delete
on my_db.*
to 'app_user'@'%';

show grants for 'app_user'@'%';
```

### 19. 先查结构再改表

命令描述：改表前先确认真实结构，别只看可视化工具。

```sql
show create table users;
show index from users;
desc users;
```

### 20. 清空测试表

命令描述：要清空整表且不需要保留原自增连续性时用。

```sql
truncate table users;
```

## 按任务直接抄的工作流

### 1. 我刚接手一张表，不知道怎么开始

命令描述：先看结构、索引、样例数据，这一套最适合“先认识表”。

```sql
use my_db;
show create table users;
desc users;
show index from users;
select * from users limit 10;
select count(*) from users;
```

你主要看：

- 主键是谁，通常是 `id`
- 哪些字段 `not null`
- 哪些字段有默认值
- 现有索引覆盖了哪些查询条件

### 2. 我想安全地改数据，不想一条 SQL 直接翻车

命令描述：这是改线上数据时最稳的一套写法，先查、再改、再验、最后提交。

```sql
begin;

select id, username, status
from users
where id in (1, 2)
for update;

update users
set status = 0
where id in (1, 2);

select id, username, status
from users
where id in (1, 2);

commit;
```

如果结果不对，直接执行：

```sql
rollback;
```

### 3. 我要删数据，但怕删多了

命令描述：先用同一个 `where` 查，再删，小批量优先带 `limit`。

```sql
select *
from users
where status = 0
order by id asc
limit 20;

delete from users
where status = 0
order by id asc
limit 20;
```

适合先清测试脏数据，不适合一把梭全表清理。

### 4. 我要给表加字段或加索引

命令描述：改表前先看旧结构，改完马上复查。

```sql
show create table users;

alter table users
add column phone varchar(20) default null comment '手机号' after email;

create index idx_users_status_created_at
on users (status, created_at desc);

show create table users;
show index from users;
```

你主要看：

- 字段位置是不是对的
- 默认值是不是你想要的
- 索引名有没有重复
- 复合索引字段顺序是不是符合查询条件

### 5. 我查一条 SQL 为什么慢

命令描述：不要上来就加索引，先看执行计划和会话。

```sql
show full processlist;

explain analyze
select id, username, created_at
from users
where status = 1
order by created_at desc
limit 20;

show index from users;
```

先重点看：

- `key`：有没有命中索引
- `rows`：扫描行数是不是很大
- `extra`：有没有 `using filesort`、`using temporary`

### 6. 我要导出、导入或者迁移

命令描述：导出前确认库名，导入前先确认目标库已经存在。

```bash
mysqldump -u root -p --single-transaction my_db > my_db.sql
mysql -u root -p -e "create database if not exists my_db character set utf8mb4 collate utf8mb4_general_ci;"
mysql -u root -p my_db < my_db.sql
```

### 7. 我要给应用单独开账号

命令描述：应用账号只给业务需要的权限，不要直接给 root。

```sql
create user 'app_user'@'%' identified by '123456';

grant select, insert, update, delete
on my_db.*
to 'app_user'@'%';

show grants for 'app_user'@'%';
```

## 危险命令安全版模板

### 1. `update` 安全版

命令描述：先查，再事务更新，再复查。

```sql
begin;

select *
from users
where id = 1
for update;

update users
set email = 'new@test.com'
where id = 1;

select *
from users
where id = 1;

commit;
```

### 2. `delete` 安全版

命令描述：先确认范围，删除尽量分批，别直接无条件删除。

```sql
begin;

select *
from users
where created_at < '2026-01-01 00:00:00'
limit 20;

delete from users
where created_at < '2026-01-01 00:00:00'
limit 20;

commit;
```

### 3. `alter table` 安全版

命令描述：改表前后都看一次结构，避免改完才发现字段类型不对。

```sql
show create table users;

alter table users
modify column username varchar(100) not null comment '用户名';

show create table users;
```

## 怎么从这篇里查

- 想直接干活：先看上面的“高频场景模板”。
- 如果还是不知道先做哪一步：继续看“按任务直接抄的工作流”。
- 想知道某个命令完整怎么写：继续往下翻详细语法区。
- 想知道参数是什么意思：看每个命令下面的“可选字段说明”。
- 想排查问题：优先看 `show`、`explain analyze`、`show full processlist`、`kill query` 这几段。

# 二、客户端连接与工具命令

## 1. `mysql`

命令描述：连接 MySQL 服务，进入交互终端，或直接执行 SQL。

```bash
mysql [options] [database]
```

常见用法：

```bash
mysql -u root -p
mysql -h 127.0.0.1 -P 3306 -u root -p -D my_db
mysql --login-path=prod -e "show databases;"
mysql -u root -p my_db < init.sql
```

可选字段说明：

| 字段                        | 作用                   |
| --------------------------- | ---------------------- |
| `-u`, `--user`              | 用户名                 |
| `-p`, `--password`          | 输入密码或直接带密码   |
| `-h`, `--host`              | 主机地址               |
| `-P`, `--port`              | 端口                   |
| `-S`, `--socket`            | Socket 路径            |
| `-D`, `--database`          | 默认数据库             |
| `-e`, `--execute`           | 执行 SQL 后退出        |
| `-N`, `--skip-column-names` | 不显示列名             |
| `-B`, `--batch`             | 批处理格式输出         |
| `-r`, `--raw`               | 原始输出               |
| `-A`, `--no-auto-rehash`    | 关闭自动补全，启动更快 |
| `--default-character-set`   | 指定字符集             |
| `--ssl-mode`                | SSL 模式               |
| `--login-path`              | 使用登录路径配置       |

## 2. `mysqldump`

命令描述：逻辑导出数据库、表、结构、数据、触发器、事件、存储过程。

```bash
mysqldump [options] db_name [tables]
```

常见用法：

```bash
mysqldump -u root -p my_db > my_db.sql
mysqldump -u root -p --no-data my_db > schema.sql
mysqldump -u root -p --no-create-info my_db > data.sql
mysqldump -u root -p --single-transaction --routines --events my_db > backup.sql
mysqldump -u root -p --databases db1 db2 > multi.sql
```

可选字段说明：

| 字段                   | 作用               |
| ---------------------- | ------------------ |
| `--databases`          | 导出多个数据库     |
| `--all-databases`      | 导出所有数据库     |
| `--tables`             | 明确指定表         |
| `--no-data`            | 只导结构           |
| `--no-create-info`     | 只导数据           |
| `--single-transaction` | 单事务导出         |
| `--routines`           | 导出存储过程和函数 |
| `--events`             | 导出事件           |
| `--triggers`           | 导出触发器         |
| `--where`              | 按条件导出数据     |
| `--result-file`        | 输出到指定文件     |
| `--master-data`        | 导出主库位点       |
| `--set-gtid-purged`    | GTID 导出策略      |

## 3. `mysqladmin`

命令描述：查看实例状态、连接、版本，或执行一些管理动作。

```bash
mysqladmin [options] command [command-arg]
```

常见用法：

```bash
mysqladmin -u root -p ping
mysqladmin -u root -p status
mysqladmin -u root -p processlist
mysqladmin -u root -p create demo_db
mysqladmin -u root -p drop demo_db
```

常见子命令：

| 子命令            | 作用             |
| ----------------- | ---------------- |
| `ping`            | 检查服务是否在线 |
| `version`         | 查看版本         |
| `status`          | 查看简要状态     |
| `processlist`     | 查看连接列表     |
| `create`          | 创建数据库       |
| `drop`            | 删除数据库       |
| `shutdown`        | 关闭实例         |
| `reload`          | 重载授权表       |
| `variables`       | 查看变量         |
| `extended-status` | 查看状态值       |

## 4. `mysqlimport`

命令描述：把文本文件批量导入某张表，底层对应 `load data`。

```bash
mysqlimport [options] db_name textfile1 [textfile2 ...]
```

常见用法：

```bash
mysqlimport -u root -p --local --ignore-lines=1 --fields-terminated-by=, my_db users.csv
```

可选字段说明：

| 字段                     | 作用             |
| ------------------------ | ---------------- |
| `--local`                | 从客户端本地导入 |
| `--fields-terminated-by` | 字段分隔符       |
| `--fields-enclosed-by`   | 字段包围符       |
| `--fields-escaped-by`    | 转义符           |
| `--lines-terminated-by`  | 行分隔符         |
| `--ignore-lines`         | 跳过前几行       |
| `--columns`              | 指定导入列       |
| `--delete`               | 导入前清空表     |
| `--replace`              | 冲突时替换       |
| `--ignore`               | 冲突时忽略       |

## 5. `mysqlshow`

命令描述：快速查看数据库、表、字段、索引信息。

```bash
mysqlshow [options] [db_name [table_name [column_name]]]
```

常见用法：

```bash
mysqlshow -u root -p
mysqlshow -u root -p my_db
mysqlshow -u root -p my_db users
```

## 6. `mysqlcheck`

命令描述：检查、修复、分析、优化表。

```bash
mysqlcheck [options] db_name [tables]
```

常见用法：

```bash
mysqlcheck -u root -p --check my_db users
mysqlcheck -u root -p --analyze my_db users
mysqlcheck -u root -p --optimize --all-databases
```

可选字段说明：

| 字段              | 作用     |
| ----------------- | -------- |
| `--check`         | 检查表   |
| `--repair`        | 修复表   |
| `--analyze`       | 分析表   |
| `--optimize`      | 优化表   |
| `--all-databases` | 所有库   |
| `--auto-repair`   | 自动修复 |

## 7. `mysqlbinlog`

命令描述：解析 binlog，用于排查、恢复、回放。

```bash
mysqlbinlog [options] log_file ...
```

常见用法：

```bash
mysqlbinlog binlog.000001
mysqlbinlog --start-position=120 --stop-position=500 binlog.000001
mysqlbinlog --start-datetime="2026-05-20 00:00:00" --stop-datetime="2026-05-20 12:00:00" binlog.000001
```

可选字段说明：

| 字段                        | 作用       |
| --------------------------- | ---------- |
| `--start-position`          | 从位置开始 |
| `--stop-position`           | 到位置结束 |
| `--start-datetime`          | 从时间开始 |
| `--stop-datetime`           | 到时间结束 |
| `--database`                | 只看某个库 |
| `--read-from-remote-server` | 从远程读取 |
| `--verbose`                 | 更详细输出 |

## 8. `mysqldumpslow`

命令描述：汇总慢查询日志。

```bash
mysqldumpslow [options] [log_file ...]
```

常见用法：

```bash
mysqldumpslow -s t -t 10 slow.log
```

可选字段说明：

| 字段 | 作用           |
| ---- | -------------- |
| `-s` | 排序方式       |
| `-t` | 返回前几条     |
| `-a` | 保留原始数字   |
| `-g` | 正则过滤 SQL   |
| `-l` | 不减锁等待时间 |

## 9. `mysqlslap`

命令描述：做简单压测。

```bash
mysqlslap [options]
```

常见用法：

```bash
mysqlslap -u root -p --concurrency=20 --iterations=5 --create-schema=my_db --query=test.sql
```

可选字段说明：

| 字段                  | 作用         |
| --------------------- | ------------ |
| `--concurrency`       | 并发数       |
| `--iterations`        | 轮数         |
| `--query`             | SQL 文件     |
| `--create-schema`     | 测试库       |
| `--number-of-queries` | 查询总数     |
| `--auto-generate-sql` | 自动生成 SQL |

## 10. `mysql_config_editor`

命令描述：保存登录路径，避免命令里反复写账号和主机。

```bash
mysql_config_editor set --login-path=prod --host=127.0.0.1 --user=root --password
mysql_config_editor print --all
```

## 11. `perror`

命令描述：查看错误码含义。

```bash
perror 1062
```

# 三、数据库级命令

## 1. `create database`

命令描述：创建数据库。

```sql
create database [if not exists] db_name
  [character set charset_name]
  [collate collation_name]
  [encryption {'y' | 'n'}];
```

可选字段说明：

| 字段            | 作用           |
| --------------- | -------------- |
| `if not exists` | 已存在时不报错 |
| `character set` | 指定字符集     |
| `collate`       | 指定排序规则   |
| `encryption`    | 是否开启加密   |

## 2. `alter database`

命令描述：修改数据库属性。

```sql
alter database db_name
  [character set charset_name]
  [collate collation_name]
  [encryption {'y' | 'n'}]
  [read only {default | 0 | 1}];
```

## 3. `drop database`

命令描述：删除数据库。

```sql
drop database [if exists] db_name;
```

## 4. `show create database`

命令描述：查看数据库建库语句。

```sql
show create database db_name;
```

## 5. `use`

命令描述：切换当前数据库。

```sql
use db_name;
```

## 6. `show databases`

命令描述：查看所有数据库。

```sql
show databases [like 'pattern' | where expr];
```

# 四、表结构命令

## 1. `create table`

命令描述：创建表。

```sql
create [temporary] table [if not exists] table_name (
  column_definition,
  [table_constraint],
  [index_definition]
) [table_option ...]
  [partition by partition_definition];
```

常见字段定义：

```sql
column_name data_type
  [not null | null]
  [default default_value]
  [auto_increment]
  [unique [key]]
  [primary key]
  [comment 'comment']
  [references ref_table(ref_column)];
```

常见表选项：

```sql
engine=innodb
auto_increment=1000
default charset=utf8mb4
collate=utf8mb4_general_ci
comment='table comment'
row_format=dynamic
```

可选字段说明：

| 字段              | 作用           |
| ----------------- | -------------- |
| `temporary`       | 临时表         |
| `if not exists`   | 已存在不报错   |
| `engine`          | 存储引擎       |
| `auto_increment`  | 设置自增起始值 |
| `default charset` | 默认字符集     |
| `collate`         | 排序规则       |
| `comment`         | 表注释         |
| `row_format`      | 行格式         |

## 2. `create table ... like`

命令描述：复制已有表的结构。

```sql
create table new_table like old_table;
```

## 3. `create table ... as select`

命令描述：按查询结果建表。

```sql
create table new_table
as
select column_list
from old_table
where condition;
```

## 4. `alter table`

命令描述：修改表结构，最常用的改表命令。

```sql
alter table table_name
  alter_option [, alter_option] ...;
```

常见 `alter_option`：

```sql
add column column_name data_type [column_option]
modify column column_name data_type [column_option]
change column old_name new_name data_type [column_option]
drop column column_name
add primary key (column_list)
drop primary key
add index index_name (column_list)
add unique index_name (column_list)
add constraint fk_name foreign key (column) references ref_table(ref_column)
drop foreign key fk_name
rename to new_table
convert to character set utf8mb4
```

## 5. `rename table`

命令描述：重命名表。

```sql
rename table old_table to new_table
  [, old_table2 to new_table2] ...;
```

## 6. `drop table`

命令描述：删除表。

```sql
drop [temporary] table [if exists] table_name [, table_name2] ...
  [restrict | cascade];
```

## 7. `truncate table`

命令描述：快速清空整张表。

```sql
truncate [table] table_name;
```

## 8. `desc` / `describe`

命令描述：查看表结构。

```sql
desc table_name;
describe table_name;
```

## 9. `show columns`

命令描述：查看字段列表。

```sql
show [full] columns
from table_name
  [from db_name]
  [like 'pattern' | where expr];
```

## 10. `show create table`

命令描述：查看建表语句。

```sql
show create table table_name;
```

# 五、索引与约束命令

## 1. `create index`

命令描述：创建普通索引、唯一索引、全文索引、空间索引。

```sql
create [unique | fulltext | spatial] index index_name
  [index_type]
on table_name (key_part, ...)
  [index_option ...]
  [algorithm_option | lock_option];
```

`key_part` 常见写法：

```sql
column_name[(length)] [asc | desc]
```

## 2. `drop index`

命令描述：删除索引。

```sql
drop index index_name on table_name
  [algorithm_option | lock_option];
```

## 3. 主键命令

命令描述：通过 `alter table` 增删主键。

```sql
alter table table_name add primary key (column_list);
alter table table_name drop primary key;
```

## 4. 外键命令

命令描述：通过 `alter table` 增删外键。

```sql
alter table table_name
add constraint fk_name
foreign key (column_name)
references ref_table(ref_column)
  [on delete action]
  [on update action];

alter table table_name
drop foreign key fk_name;
```

可选字段说明：

| 字段        | 作用                 |
| ----------- | -------------------- |
| `on delete` | 删除父表记录时的行为 |
| `on update` | 更新父表记录时的行为 |
| `restrict`  | 限制                 |
| `cascade`   | 级联                 |
| `set null`  | 设为空               |
| `no action` | 不允许立即动作       |

## 5. `show index`

命令描述：查看索引信息。

```sql
show [extended] index
from table_name
  [from db_name]
  [where expr];
```

# 六、视图、触发器、事件、存储程序命令

## 1. `create view`

命令描述：创建视图。

```sql
create
  [or replace]
  [algorithm = {undefined | merge | temptable}]
  [definer = user]
  [sql security {definer | invoker}]
view view_name [(column_list)]
as select_statement
  [with [cascaded | local] check option];
```

## 2. `alter view`

命令描述：修改视图定义。

```sql
alter
  [algorithm = {undefined | merge | temptable}]
  [definer = user]
  [sql security {definer | invoker}]
view view_name [(column_list)]
as select_statement
  [with [cascaded | local] check option];
```

## 3. `drop view`

命令描述：删除视图。

```sql
drop view [if exists] view_name [, view_name2] ...
  [restrict | cascade];
```

## 4. `create trigger`

命令描述：创建触发器。

```sql
create
  [definer = user]
trigger trigger_name
  {before | after}
  {insert | update | delete}
on table_name
for each row
  [follows other_trigger | precedes other_trigger]
trigger_body;
```

## 5. `drop trigger`

命令描述：删除触发器。

```sql
drop trigger [if exists] [db_name.]trigger_name;
```

## 6. `show triggers`

命令描述：查看触发器。

```sql
show triggers
  [from db_name]
  [like 'pattern' | where expr];
```

## 7. `create event`

命令描述：创建定时事件。

```sql
create
  [definer = user]
event [if not exists] event_name
on schedule
  {at timestamp [+ interval expr unit]
   | every expr unit
     [starts timestamp [+ interval expr unit]]
     [ends timestamp [+ interval expr unit]]}
  [on completion [not] preserve]
  [enable | disable | disable on replica]
  [comment 'comment']
do event_body;
```

## 8. `alter event`

命令描述：修改事件。

```sql
alter
  [definer = user]
event event_name
  [on schedule ...]
  [on completion [not] preserve]
  [rename to new_event_name]
  [enable | disable | disable on replica]
  [comment 'comment']
  [do event_body];
```

## 9. `drop event`

命令描述：删除事件。

```sql
drop event [if exists] [db_name.]event_name;
```

## 10. `create procedure`

命令描述：创建存储过程。

```sql
create
  [definer = user]
procedure proc_name ([proc_parameter, ...])
  [characteristic ...]
routine_body;
```

`proc_parameter`：

```sql
[in | out | inout] param_name data_type
```

## 11. `alter procedure`

命令描述：修改存储过程属性。

```sql
alter procedure proc_name [characteristic ...];
```

## 12. `drop procedure`

命令描述：删除存储过程。

```sql
drop procedure [if exists] proc_name;
```

## 13. `create function`

命令描述：创建存储函数。

```sql
create
  [definer = user]
function func_name ([func_parameter, ...])
returns data_type
  [characteristic ...]
routine_body;
```

## 14. `alter function`

命令描述：修改存储函数属性。

```sql
alter function func_name [characteristic ...];
```

## 15. `drop function`

命令描述：删除存储函数。

```sql
drop function [if exists] func_name;
```

## 16. `call`

命令描述：执行存储过程。

```sql
call proc_name([parameter, ...]);
```

## 17. `show create procedure` / `show create function`

命令描述：查看存储程序定义。

```sql
show create procedure proc_name;
show create function func_name;
```

# 七、数据操作命令

## 1. `select`

命令描述：查询数据，是最核心的 SQL 命令。

```sql
select
  [all | distinct | distinctrow]
  select_expr [, select_expr ...]
from table_references
  [where where_condition]
  [group by group_expr [, group_expr ...]]
  [having having_condition]
  [window window_name as (window_spec)]
  [order by order_expr [asc | desc], ...]
  [limit {[offset,] row_count | row_count offset offset}]
  [into outfile 'file_name' export_option]
  [for update | for share];
```

可选字段说明：

| 字段           | 作用           |
| -------------- | -------------- |
| `all`          | 默认，保留重复 |
| `distinct`     | 去重           |
| `where`        | 行过滤         |
| `group by`     | 分组           |
| `having`       | 分组后过滤     |
| `window`       | 窗口定义       |
| `order by`     | 排序           |
| `limit`        | 限制条数       |
| `offset`       | 偏移量         |
| `into outfile` | 导出结果       |
| `for update`   | 加排他锁       |
| `for share`    | 加共享锁       |

## 2. `table`

命令描述：快速查整张表。

```sql
table table_name [order by column_name] [limit row_count];
```

## 3. `insert`

命令描述：插入数据。

```sql
insert [low_priority | delayed | high_priority] [ignore]
into table_name
  [(column_list)]
values (value_list), ...
  [as alias]
  [on duplicate key update assignment_list];
```

其他写法：

```sql
insert into table_name set column1 = value1, column2 = value2;

insert into table_name (column_list)
select ...
from other_table;
```

## 4. `replace`

命令描述：主键或唯一键冲突时，删旧再插新。

```sql
replace [low_priority | delayed]
into table_name
  [(column_list)]
values (value_list), ...;
```

## 5. `update`

命令描述：更新数据。

```sql
update [low_priority] [ignore] table_reference
set assignment_list
  [where where_condition]
  [order by order_expr]
  [limit row_count];
```

## 6. `delete`

命令描述：删除数据。

```sql
delete [low_priority] [quick] [ignore]
from table_name
  [where where_condition]
  [order by order_expr]
  [limit row_count];
```

多表删除：

```sql
delete t1, t2
from t1
join t2 on ...
where ...;
```

## 7. `load data`

命令描述：从文本文件批量导入数据。

```sql
load data [low_priority | concurrent] [local] infile 'file_name'
  [replace | ignore]
into table table_name
  [character set charset_name]
  [fields field_option]
  [lines line_option]
  [ignore number {lines | rows}]
  [(column_list)]
  [set assignment_list];
```

## 8. `values` / `value`

命令描述：生成行值表达式，常配合 SQL 表达式或特殊查询使用。

```sql
values row(1, 'tom'), row(2, 'jerry');
```

## 9. `with`

命令描述：公共表达式查询。

```sql
with cte_name as (
  select ...
)
select ...
from cte_name;
```

递归写法：

```sql
with recursive cte_name as (
  ...
)
select ...
```

# 八、事务和锁命令

## 1. `start transaction`

命令描述：开启事务。

```sql
start transaction
  [with consistent snapshot]
  [read write | read only];
```

## 2. `begin`

命令描述：开启事务简写。

```sql
begin;
```

## 3. `commit`

命令描述：提交事务。

```sql
commit [work] [and [no] chain] [[no] release];
```

## 4. `rollback`

命令描述：回滚事务。

```sql
rollback [work] [and [no] chain] [[no] release];
rollback [work] to [savepoint] savepoint_name;
```

## 5. `savepoint`

命令描述：创建保存点。

```sql
savepoint savepoint_name;
```

## 6. `release savepoint`

命令描述：删除保存点。

```sql
release savepoint savepoint_name;
```

## 7. `set transaction`

命令描述：设置事务隔离级别或只读状态。

```sql
set [global | session] transaction
  isolation level
    {repeatable read | read committed | read uncommitted | serializable};

set [global | session] transaction read only;
set [global | session] transaction read write;
```

## 8. `lock tables`

命令描述：锁表。

```sql
lock tables
  table_name [read | read local | write]
  [, table_name2 [read | write]] ...;
```

## 9. `unlock tables`

命令描述：解锁表。

```sql
unlock tables;
```

## 10. `xa` 系列命令

命令描述：分布式事务命令。

```sql
xa start xid;
xa end xid;
xa prepare xid;
xa commit xid;
xa rollback xid;
xa recover;
```

# 九、用户、权限和角色命令

## 1. `create user`

命令描述：创建用户。

```sql
create user [if not exists]
  user_specification [, user_specification] ...
  [default role role [, role] ...]
  [require tls_option ...]
  [with resource_option ...]
  [password_option | lock_option] ...;
```

## 2. `alter user`

命令描述：修改用户属性、密码、锁定状态。

```sql
alter user [if exists]
  user_specification [, user_specification] ...
  [require tls_option ...]
  [with resource_option ...]
  [password_option | lock_option] ...;
```

## 3. `drop user`

命令描述：删除用户。

```sql
drop user [if exists] user [, user] ...;
```

## 4. `rename user`

命令描述：重命名用户。

```sql
rename user old_user to new_user
  [, old_user2 to new_user2] ...;
```

## 5. `set password`

命令描述：设置密码。

```sql
set password [for user] = password_option;
```

## 6. `grant`

命令描述：授予权限。

```sql
grant privilege_list
on privilege_level
to user_or_role [, user_or_role] ...
  [with grant option];
```

## 7. `revoke`

命令描述：回收权限。

```sql
revoke privilege_list
on privilege_level
from user_or_role [, user_or_role] ...;
```

## 8. `create role`

命令描述：创建角色。

```sql
create role [if not exists] role [, role] ...;
```

## 9. `drop role`

命令描述：删除角色。

```sql
drop role [if exists] role [, role] ...;
```

## 10. `set role`

命令描述：设置当前会话角色。

```sql
set role
  {default | none | all | all except role_list | role_list};
```

## 11. `show grants`

命令描述：查看用户或角色的授权。

```sql
show grants [for user_or_role [using role_list]];
```

# 十、变量、会话与 show 命令

## 1. `set`

命令描述：设置系统变量、会话变量、用户变量。

```sql
set variable_assignment [, variable_assignment] ...;
```

常见写法：

```sql
set autocommit = 0;
set session sql_mode = 'strict_trans_tables';
set global max_connections = 300;
set @name = 'tom';
```

## 2. `show variables`

命令描述：查看系统变量。

```sql
show [global | session] variables
  [like 'pattern' | where expr];
```

## 3. `show status`

命令描述：查看状态值。

```sql
show [global | session] status
  [like 'pattern' | where expr];
```

## 4. `show tables`

命令描述：查看表列表。

```sql
show [full] tables
  [from db_name]
  [like 'pattern' | where expr];
```

## 5. `show table status`

命令描述：查看表状态。

```sql
show table status
  [from db_name]
  [like 'pattern' | where expr];
```

## 6. `show processlist`

命令描述：查看当前连接和语句。

```sql
show [full] processlist;
```

## 7. `show warnings`

命令描述：查看警告。

```sql
show warnings [limit [offset,] row_count];
```

## 8. `show errors`

命令描述：查看错误。

```sql
show errors [limit [offset,] row_count];
```

## 9. `show engines`

命令描述：查看存储引擎。

```sql
show engines;
```

## 10. `show engine`

命令描述：查看某个引擎状态。

```sql
show engine engine_name status;
show engine engine_name mutex;
```

## 11. `show replica status`

命令描述：查看从库状态。

```sql
show replica status;
```

## 12. `show master status` / `show binary log status`

命令描述：查看主库位点和 binlog 状态。

```sql
show master status;
show binary log status;
```

# 十一、执行计划、维护和管理命令

## 1. `explain`

命令描述：查看执行计划。

```sql
explain [format = {traditional | json | tree}]
select ...;
```

## 2. `explain analyze`

命令描述：执行并分析 SQL。

```sql
explain analyze select ...;
```

## 3. `analyze table`

命令描述：更新统计信息。

```sql
analyze [no_write_to_binlog | local]
table table_name [, table_name2] ...;
```

## 4. `optimize table`

命令描述：优化表。

```sql
optimize [no_write_to_binlog | local]
table table_name [, table_name2] ...;
```

## 5. `check table`

命令描述：检查表。

```sql
check table table_name [, table_name2] ...
  [for upgrade]
  [quick]
  [fast]
  [medium]
  [extended]
  [changed];
```

## 6. `repair table`

命令描述：修复表。

```sql
repair [no_write_to_binlog | local]
table table_name [, table_name2] ...
  [quick] [extended] [use_frm];
```

## 7. `checksum table`

命令描述：计算表校验值。

```sql
checksum table table_name [, table_name2] ... [quick | extended];
```

## 8. `flush`

命令描述：刷新权限、日志、表缓存等。

```sql
flush [no_write_to_binlog | local]
  flush_option [, flush_option] ...;
```

常见 `flush_option`：

```sql
privileges
status
hosts
logs
tables
binary logs
relay logs
```

## 9. `reset`

命令描述：重置部分状态。

```sql
reset master;
reset persist;
reset replica [all];
```

## 10. `kill`

命令描述：终止连接或语句。

```sql
kill [connection | query] processlist_id;
```

## 11. `purge binary logs`

命令描述：清理 binlog。

```sql
purge binary logs to 'binlog.000010';
purge binary logs before '2026-05-20 00:00:00';
```

# 十二、预处理、流程控制和程序命令

## 1. `prepare`

命令描述：预编译 SQL。

```sql
prepare stmt_name from preparable_stmt;
```

## 2. `execute`

命令描述：执行预编译语句。

```sql
execute stmt_name [using @var_name [, @var_name] ...];
```

## 3. `deallocate prepare`

命令描述：释放预编译语句。

```sql
deallocate prepare stmt_name;
```

## 4. `do`

命令描述：执行表达式但不返回结果集。

```sql
do expr [, expr] ...;
```

## 5. `signal`

命令描述：手动抛错。

```sql
signal sqlstate '45000'
  set message_text = 'custom error';
```

## 6. `resignal`

命令描述：重新抛出错误。

```sql
resignal;
```

## 7. `handler`

命令描述：低层游标式读取表数据。

```sql
handler table_name open [as alias];
handler table_name read index_name {= | >= | <= | > | <} (value_list) [where where_condition] [limit row_count];
handler table_name read {first | next | prev | last} [where where_condition] [limit row_count];
handler table_name close;
```

# 十三、复制和实例级命令

## 1. `change replication source to`

命令描述：修改复制源配置。

```sql
change replication source to
  source_host = '127.0.0.1',
  source_port = 3306,
  source_user = 'repl',
  source_password = 'password',
  source_log_file = 'binlog.000001',
  source_log_pos = 4;
```

## 2. `start replica`

命令描述：启动复制。

```sql
start replica;
start replica sql_thread;
start replica io_thread;
```

## 3. `stop replica`

命令描述：停止复制。

```sql
stop replica;
stop replica sql_thread;
stop replica io_thread;
```

## 4. `reset replica`

命令描述：重置复制状态。

```sql
reset replica;
reset replica all;
```

# 十四、补一个最常用命令清单

命令描述：如果你只是临时查命令，先从下面这组开始。

```sql
show databases;
use my_db;
show tables;
show create table users;
desc users;

select * from users limit 10;
insert into users (username) values ('tom');
update users set status = 1 where id = 1;
delete from users where id = 1;

start transaction;
commit;
rollback;

create user 'app'@'%' identified by '123456';
grant select, insert, update on my_db.* to 'app'@'%';
show grants for 'app'@'%';

show full processlist;
explain analyze select * from users where username = 'tom';
kill query 12345;
```

命令描述：终端工具最常用的一组。

```bash
mysql -u root -p -D my_db
mysqldump -u root -p --single-transaction my_db > my_db.sql
mysql -u root -p my_db < my_db.sql
mysqladmin -u root -p ping
mysqlcheck -u root -p --analyze my_db users
mysqlbinlog binlog.000001
mysqldumpslow -s t -t 10 slow.log
```

# 十五、最后说明

- 你要的是全部放在一篇里，所以这里已经改成单文件。
- 现在这篇不再只是“常用命令”，而是按命令体系尽量铺全。
- 如果你后面还要继续更像官方手册的方向，下一层就不是“命令”了，而是：
  - MySQL 数据类型
  - MySQL 函数
  - MySQL 系统库和信息架构
