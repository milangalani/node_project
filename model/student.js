const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const AVATAR_PATH = path.join('/uploads/images');

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require :true
    },
    gender : {
        type : String,
        require : true
    },
    hobby : {
        type : Array,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    avatar : {
        type : String,
        require : true
    }
});

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null, path.join(__dirname, '..' ,AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+'-'+Date.now());
    }
});

studentSchema.statics.uploadedAvatar = multer ({ storage : storage}).single('avatar');
studentSchema.statics.avatarPath = AVATAR_PATH;

const Student = mongoose.model('student',studentSchema);

module.exports = Student;