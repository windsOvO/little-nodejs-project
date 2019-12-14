//don't care about business（业务）
//only deal with data

//crud
var fs = require('fs');

var dbPath = './db.json';

//retrieve(检索，读取)
//callback parameter
//  1.err success == null failure == errObj
//  2.result success == array failure == undefined
//return []
exports.find = function(callback){
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if (err)
        {
            return callback(err);//callback(err, null)
        }
        callback(null, JSON.parse(data).students);
        //string->object->object.students
    });
};

/*
    @param  {number}    id
    @param  {function}  callback
 */
//转递函数结果，不用return， 用callback
//return只做结束的标志和结束的最后一步操作
exports.findById = function(id, callback){
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if (err)
        {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        var stu = students.find(function(item){
            return item.id === id;
        });
        callback(null, stu);
    });
};

//create
exports.save = function(student, callback){
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if (err)
        {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        //acquire/gain/obtain id automatically
        if (students.length === undefined || students.length === 0){
            //第一次存入
            students = [];
            student.id = 1;
        }
        else{
            student.id = students[students.length - 1].id + 1;
        }
        students.push(student);
        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function(err){
            if (err){
                return callback(err);
            }
            callback(null)
        });
    });
};

//update
exports.updateById = function(student, callback) {

    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        //pay attention to type
        student.id = parseInt(student.id);
        //EcmaScript 6: add find() function in array
        //traverse the array stop at the first item when condition is satisfying
        var stu = students.find(function (item) {
            return item.id === student.id; //return condition
        });
        //traverse attributes from student
        //stu = student is mistake, original item is not change
        //use pointer and quote to understand and use x.y plz
        // console.log(stu);
        for (var key in student) {
            stu[key] = student[key];
        }

        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null)
        });
    });
};

//delete
exports.deleteById = function(id, callback){
    //1.gain id which will be delete
    //2.according id to operate
    //3.send response data
    fs.readFile(dbPath, 'utf-8', function(err, data){
        if (err)
        {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        //acquire/gain/obtain id automatically

        //.findIndex() use to find the first index of the item you want
        var deleteIndex = students.findIndex(function(item){
            return item.id === parseInt(id);
        });
        //make array according to index delete some items
        students.splice(deleteIndex, 1);

        var fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null)
        });
    });
};