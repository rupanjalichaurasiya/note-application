exports.homepage = async(req,res)=>{
    const locals = {
     title: "NODEJS NOTES",
     description: "FREE"
    }
    res.render('index',{
        locals,
        layout:'../views/layouts/front-page'
    });
}
exports.about = async(req,res)=>{
    const locals = {
        title: "About NODEJS NOTES",
        description: "FREE"
       }
       res.render('about',locals);
}