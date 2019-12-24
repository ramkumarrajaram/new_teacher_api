# teacher-api

``` 
//on local
git clone https://github.com/ramkumarrajaram/teacherapi
cd teacher-api
npm install
npm start
```

# Dependencies


# Database Migration

Initialize sequelize using the following command. 
This will create the config script, migrations and models directory

```
sequelize init 
```

```
sequelize-cli dependency is added for database migraton 
Use the following command for creation of database tables using sequelize cli

sequelize model:create --name Teacher --attributes email:string
sequelize model:create --name Student --attributes email:string,issuspended:boolean
sequelize model:create --name TeacherStudents --attributes teacherId:integer,studentId:integer
```

Once the tables, models are created run the following command for DB migration

```
sequelize db:migrate 
```