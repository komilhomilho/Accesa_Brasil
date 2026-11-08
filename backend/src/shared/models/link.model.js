import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'The link name is required.']
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        required: [true, 'The URL is mandatory'],
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
},
{ collection: 'link' });

linkSchema.index({ tags: 1 });
linkSchema.index({ lastUpdated: 1 });

const Link = model('link', linkSchema);

export default Link;
