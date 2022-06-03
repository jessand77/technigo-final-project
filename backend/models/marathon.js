import mongoose from "mongoose";

const marathonSchema = new mongoose.Schema({
    name: String,
    city: String,
    lat: Number,
    lon: Number,
    country: String,
    website: String,
});

const Marathon = mongoose.model('Marathon', marathonSchema);

export default Marathon;