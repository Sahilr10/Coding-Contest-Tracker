import { asyncHandler } from "../utils/asyncHandler.js";
import { APiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import User from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
    
    const {username, email, password} = req.body

    if(
        [username, email, password].some((field)=> field?.trim() === '' )
    ){
        throw new APiError('All fields are required', 400);
    }

    if(!email.includes('@')){
        throw new APiError('Invalid email', 400);
    }

    const existedUser = await User.findOne({
        $or:[{email}, {username}]
    })

    if(existedUser){
        throw new APiError(409,'User already exists');
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = await User.findById(user._id).select('-password -refreshToken')

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creaing a user")
    }

    return res
    .status(201) 
    .json(new ApiResponse(200, createdUser, 'User created successfully'))
})

export { registerUser };