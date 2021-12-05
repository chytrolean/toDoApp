const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    title: {type: String},
    done: {type: Boolean, default: false}
},
{timestamps: true})

const Goal = mongoose.model('List', goalSchema);
module.exports = Goal;

