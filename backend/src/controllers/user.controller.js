import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import {User} from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, 'Something went wrong while generating tokens');
    }
}

const registerUser = asyncHandler(async (req, res) => {
    
    const {username, email, password} = req.body

    if(
        [username, email, password].some((field)=> field?.trim() === '' )
    ){
        throw new ApiError('All fields are required', 400);
    }

    if(!email.includes('@')){
        throw new ApiError('Invalid email', 400);
    }

    const existedUser = await User.findOne({
        $or:[{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409,'User already exists');
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

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if([email, password].some((field)=> field?.trim() === '' )){
        throw new ApiError(400,'All fields are required');
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404,'User not found');
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,'Invalid credentials');
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options) 
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
             'User logged in successfully'
        ))
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {refreshToken: 1}
        },
        {new: true}
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'))
})

export { 
    registerUser,
    loginUser,
    logoutUser
    };