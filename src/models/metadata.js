const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User extra-information: e.g permissions based on read, write groups
const MetadataSchema = new Schema({
    permissions: {
        read: [{
            type: Schema.ObjectId,
            ref: 'Group'
        }],
        write: [{
            type: Schema.ObjectId,
            ref: 'Group'
        }],
    }
});

module.exports = mongoose.model('Metadata', MetadataSchema);
