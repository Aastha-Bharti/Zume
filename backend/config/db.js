import mongoose from 'mongoose'

export const connectDB = async (params) => {
    await mongoose.connect('mongodb+srv://asbharti27:Mp1Octd8ODCWeD1M@cluster0.eizabwl.mongodb.net/Zume')
    .then(() => {
        console.log("database connected")
    })
}