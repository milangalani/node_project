const student = require('../model/Student');
module.exports.home = function(req,res){
    student.find({}, function(err,data){
        if(err){
            console.log("record not found");
            return false;
        }
        return res.render('home',{
            'record' : data
        });
    })
}