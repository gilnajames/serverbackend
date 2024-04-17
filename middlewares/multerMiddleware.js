const multer=require('multer')
const storage = multer.diskStorage({
    //it has 2 keys -first one is destination and second one is  filename
// destination:where the files are saving
//filename:the name in which files are stored

destination:(req,file,callback)=>{
    callback(null,'./uploads')
},
filename:(req,file,callback)=>{
    const filename=`image-${Date.now()}-${file.originalname}`
    callback(null,filename)
}

})

//file filter is used to check the type of file uploading

const fileFilter=(req,file,callback)=>{
    if(file.mimetype == 'image/png' || file.mimetype =='image/jpeg'|| file.mimetype =='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false);
        return callback(new error('only png,jpg,jpeg files are allowed'))
    }
}
// create multer configuration

const multerConfig=multer({
    storage,
    fileFilter
})

module.exports = multerConfig