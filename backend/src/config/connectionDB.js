import mongoose from 'mongoose';
import 'dotenv/config';

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log.green('[Connected] MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
