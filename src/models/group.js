const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
});

module.exports = mongoose.model('Group', GroupSchema);
