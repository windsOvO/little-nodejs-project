var express = require('express');
var Student = require('./student');

var router = express.Router();

//use router to replace app
//app is replaced with router
router.get('/students', function(req, res){
    Student.find(function(err, students){
       if(err)
           return res.status(500).send('Server error.');
       res.render('index.html', {
           students: students
       });
    });
});

router.get('/students/new', function(req, res){
    res.render('new.html');
});

router.post('/students/new', function(req, res){
    //1.read string from .json
    //2.change string to object
    //3.add object to array
    //4.overwrite .json file
    // console.log(req.body);
    Student.save(req.body, function(err){
       if (err){
           return res.status(500).end('Server error.');
       }
       res.redirect('/students');
    });
});

router.get('/students/edit', function(req, res){
    //1.add the link to index.html
    //2.gain the id which will be edit
    //3.render page
    // console.log(req.query.id);
    Student.findById(parseInt(req.query.id), function(err, student){
        if (err)
            return res.status(500).send('Server error');
        res.render('edit.html', {
            student: student
        })
    });
});

router.post('/students/edit', function(req, res){
    //1.gain data from form/menu
    //2.update
    //3.send response
    Student.updateById(req.body, function(err){
        if (err)
            return res.status(500).send('Server error');
        res.redirect('/students')
    });
});

router.get('/students/delete', function(req, res){
    Student.deleteById(req.query.id, function(err){
        if (err)
            return res.status(500).send('Server error');
        res.redirect('/students')
    });
});

module.exports = router;