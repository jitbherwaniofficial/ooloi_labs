const express = require('express');
const router = express.Router();
const path = require('path')

const mongoose = require('mongoose');

const Event = require('../model/event_page_model');
const multer = require('multer');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
       let ext = path.extname(file.originalname)
       cb(null, Date.now() + ext)
    }
});

const fileFilter = function (req, file, cb) {
    cb(null, true); 
  };

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
})

router.get('/', async (req, res) => {
    const event = await Event.find()
    res.status(200).send(event)
})


router.post('/',upload.fields([
    {name: "speaker_image", maxCount: 1},
    {name: "moderator_image", maxCount: 1},
    {name: "images", maxCount: 10},
    {name: "pdf", maxCount: 10},
]), async (req, res) => {
    console.log(req.files);
    const basePath = 'http://localhost:3000/public/uploads/';
    let event = new Event({
        title: req.body.title,
        url_link: req.body.url_link,
        about_event: req.body.about_event,
        speaker_title:req.body.speaker_title,
        about_speaker:req.body.about_speaker,
        speaker_image: req.files['speaker_image'] ? `${basePath}${req.files['speaker_image'][0].filename}` : '',
        moderator_title:req.body.moderator_title,
        about_moderator:req.body.about_moderator,
        moderator_image: req.files['moderator_image'] ? `${basePath}${req.files['moderator_image'][0].filename}` : '',
        // speaker: {
        //     speaker_title: req.body.speaker_title,
        //     about_speaker:req.body.about_speaker,
        //     speaker_image: req.files['speaker_image'] ? `${basePath}${req.files['speaker_image'][0].filename}` : '',

        // },
        // moderator: {
        //     moderator_title: req.body.moderator_title,
        //     about_moderator:req.body.about_moderator, 
        //     moderator_image: req.files['moderator_image'] ?`${basePath}${req.files['moderator_image'][0].filename}` : '' ,
        // },
        material_and_resource : req.body.material_and_resource,
        title_text: req.body.title_text,
        bullet_list: req.body.bullet_list,
        number_list: req.body.number_list,
        quote: req.body.quote,
        images: req.files['images'].map(file => `${basePath}${file.filename}`),
        pdf: req.files['pdf'].map(file => `${basePath}${file.filename}`).join(', '),
        youtube_urls: req.body.youtube_urls,

    })

    try {
        event = await event.save();
        if (!event) {
          return res.status(500).send('The event could not be saved.');
        }
        res.send(event);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
      }
});

router.patch('/:id',upload.fields([
    {name: "speaker_image", maxCount: 1},
    {name: "moderator_image", maxCount: 1},
    {name: "images", maxCount: 10},
    {name: "pdf", maxCount: 10},
]), async(req,res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Event Id');
    }
    const basePath = 'http://localhost:3000/public/uploads/';

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            url_link: req.body.url_link,
            about_event: req.body.about_event,
            speaker_title:req.body.speaker_title,
            about_speaker:req.body.about_speaker,
            speaker_image: req.files['speaker_image'] ? `${basePath}${req.files['speaker_image'][0].filename}` : '',
            moderator_title:req.body.moderator_title,
            about_moderator:req.body.about_moderator,
            moderator_image: req.files['moderator_image'] ? `${basePath}${req.files['moderator_image'][0].filename}` : '',
            material_and_resource : req.body.material_and_resource,
            title_text: req.body.title_text,
            bullet_list: req.body.bullet_list,
            number_list: req.body.number_list,
            quote: req.body.quote,
            images: req.files['images'].map(file => `${basePath}${file.filename}`),
            pdf: req.files['pdf'].map(file => `${basePath}${file.filename}`).join(', '),
            youtube_urls: req.body.youtube_urls,
        },
        {new:true}
    )
    res.send(updatedEvent);
})

router.delete('/:id', (req, res) => {
    Event.findByIdAndRemove(req.params.id)
        .then((event) => {
            if (event) {
                return res.status(200).json({
                    success: true,
                    message: 'the event is deleted!'
                });
            } else {
                return res.status(404).json({ success: false, message: 'event not found!' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});



module.exports = router;