
const {userAuthSchema,User,loginAuthSchema}= require('./../models/userModel')
const catchAsync= require('./../utils/catchAsync');
const authToken =   require('./../helpers/generatetoken')



exports.signUp =  async(req,res,next)=>{
 try{
   console.log(res.status)
    const results = await userAuthSchema.validate(req.body);
     const {error} =results
    if(error) {
        // console.log(error)
     return res.status(400).json({
          message: error.details[0].message  
    });
    
    }
  

    const user= await User.findOne({email:req.body.email})
    if(user){
  // console.log(user)
       return res.status(400).json({
        message:'user Already exist',
    })
    }
 
    
    const newUser= await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
        passwordConfirm:req.body.passwordConfirm
    });
    const token = authToken(newUser._id)
    console.log(newUser)
    res.status(200).json({
        status:true,
        token, 
        data:{
           user:newUser
        }
    });
   
 }
 catch(err){
  console.log(err)
  res.status(500).json({
    erro:err
  })
 }
};


exports.login = catchAsync(async (req, res, next) => {
  // check if the email and password exist
  const { email, password } = req.body;
  const value = await loginAuthSchema.validate(req.body);
  const { error } = value;
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // check if a user exists in database and password is corrrect

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: false,
      message: 'Incorect email or password',
    });
  }

  // if everything is ok, senf token to a client
  const token = authToken(user._id);

  res.status(200).json({
    status: true,
    token,
    message: 'logged in successfully',
  });
});
