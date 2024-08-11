const isLogin=async(req,res,next)=>{
    try {
      if (req.session.organiser_id) {
        
      } else {
            res.redirect('/organiser');
      }
      next();
        
    } catch (error) {
        console.log( error.message)
    }
}
const isLogout=async(req,res,next)=>{
    try {
        if(req.session.organiser_id){
            res.redirect('/organiser/dashboard');
        }
        next();
        
    } catch (error) {
       console.log( error.message)
    }
}

module.exports={
    isLogin,
    isLogout
}