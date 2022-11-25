const student = require('../model/Student');

const fs = require('fs');

const path = require('path');

module.exports.student = function(req,res){
    return res.render('student');
}

module.exports.addstudent = function(req,res){
    student.uploadedAvatar(req,res,function(err){
        if(req.file){
            var name = req.body.name;
            var email = req.body.email;
            var password =req.body.password;
            var gender = req.body.gender;
            var hobby = req.body.hobby;
            var city = req.body.city;
            var description = req.body.description;
            var imagePath = student.avatarPath+"/"+req.file.filename;
            student.create({
                name : name,
                email : email,
                password : password,
                gender : gender,
                hobby : hobby,
                city : city,
                description : description,
                avatar : imagePath
            }, function(err,recordInsert){
                if(err){
                    console.log("record not insert");
                    return false;
                }
                return res.redirect('/collage/student/datapage');
            });
        }
    })
}

module.exports.deleteRecord = function(req,res){
    student.findById(req.params.id, function(err,record){
        if(err){
            console.log("err not found");
            return false;
        }

        if(record.avatar){
            fs.unlinkSync(path.join(__dirname,'..',record.avatar));
            student.findByIdAndDelete(req.params.id, function(err)
            {
                if(err){
                    console.log("somthing wrong");
                    return false;
                }
                return res.redirect('back')
            })
        }
        else{
            return res.redirect('back');
        }
    })
}


module.exports.updateRecord = function(req,res){
    student.findById(req.query.stId, function(err,data){
        if(err){
            console.log("record not found");
            return false;
        }
        return res.render('updateHome',{
            'singleRecord' : data
        })
    })
}

module.exports.Editstudent = function(req,res){
    student.uploadedAvatar(req,res,function(err){
        if(req.file)
        {
            student.findById(req.body.id, function(err,updateRecord){
                if(err){
                    console.log("record not found");
                    return false;
                }
                fs.unlinkSync(path.join(__dirname,'..',updateRecord.avatar));
                let newAvatar = student.avatarPath+'/'+req.file.filename;
                student.findByIdAndUpdate(req.body.id,{
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : req.body.gender,
                    hobby : req.body.hobby,
                    city : req.body.city,
                    description : req.body.description,
                    avatar : newAvatar
                },function(err,updaterecord){
                    if(err){
                        console.log("record not update");
                        return false;
                    }
                    return res.redirect('/collage/student/datapage');
                })
            })
        }
        else{
            student.findById(req.body.id, function(err,record){
                if(err){
                    console.log("record not found");
                    return false;
                }
                student.findByIdAndUpdate(req.body.id,{
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gender : req.body.gender,
                    hobby : req.body.hobby,
                    city : req.body.city,
                    description : req.body.description,
                    avatar : record.avatar
                },function(err,updaterecord){
                    if(err){
                        console.log("record not update");
                        return false;
                    }
                    return res.redirect('/collage/student/datapage');
                })
            })
        }
    })
}

module.exports.datapage = function(req,res){
    student.find({}, function(err,data){
        if(err){
            console.log("record not fetch from db");
        }
        return res.render('datapage',{
            'record' : data
        })
    })
}