import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        platform: {
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },{timestamps: true}
)

export const Contest = mongoose.model("Contest", contestSchema)