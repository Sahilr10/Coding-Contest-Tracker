import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const connectedAccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },

    connected: {
      type: Boolean,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    lastSyncedAt: {
      type: Date,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed, // ratings, ranks, etc.
      default: {},
    },
  },
  { _id: false }
);




const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
            lowercase: true

        },
        email: { 
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            
        },
        refreshToken:{
            type: String,
        },
        connectedAccounts: {
            codeforces: connectedAccountSchema,
            leetcode: connectedAccountSchema,
            codechef: connectedAccountSchema,
            geeksforgeeks: connectedAccountSchema,
        },
        favoritePlatforms: [
            { 
                type: String,
                default: ["Codeforces", "LeetCode", "CodeChef", "GeeksforGeeks"], 
            }
        ],
        reminderTimes: {
                type: [Number], // in minutes, e.g. [60, 120, 1440]
                default: [120], // default: 2 hrs before
        },
    },{timestamps: true}
);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
        
    this.password = await bcrypt.hash(this.password, 10)
    next();
    
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model('User', userSchema);