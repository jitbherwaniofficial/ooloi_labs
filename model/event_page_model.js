const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    title: { type: String, },
    url_link: { type: String, },
    date: { type: String, default: new Date()},
    from: { type: String, default: (new Date()).getTime() },
    to: {type: String, default: (new Date()).getTime() },
    about_event: { type: String, },
    speaker_title: [{type :String}],
    about_speaker: [{type:String}],
    speaker_image:[{type:String}],
    moderator_title: [{type :String}],
    about_moderator: [{type:String}],
    moderator_image:[{type:String}],
    // speaker : [
    //     {
    //         speaker_title: {type:String, default: ''},
    //         about_speaker: {type:String, default: ''},
    //         speaker_image: {type:String, default: ''},
    //     }
    //     ],
    // moderator:[
    //     {
    //         moderator_title: {type:String, default: ''},
    //         about_moderator: {type:String, default: ''},
    //         moderator_image: {type:String, default: ''},
    //     }
    // ],
    material_and_resource : {type: String},
    title_text: {type: String},
    bullet_list: [{type: String}],
    number_list: [{type:String}],
    quote: {type: String},
    pdf: {type:[String]},
    images: [{type:String}],
    youtube_urls: [{type:String}],
    
    
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
