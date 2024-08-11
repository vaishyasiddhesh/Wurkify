const isLogin=async(req,res,next)=>{
    try {
      if (req.session.user_id) {
        
      } else {
            res.redirect('/register');
      }
      next();
        
    } catch (error) {
        console.log( error.message)
    }
}
const isLogout=async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect('/dashboard');
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