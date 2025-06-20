import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from '../Mongodb/models/post.js';

dotenv.config();

const router = express.Router();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

//GET All POSt
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error('Error while fetching posts:', err);
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    console.log('🔍 Incoming POST:', { name, prompt, photo: photo?.slice(0, 30) }); // Just part of photo

    if (!photo || !photo.startsWith('data:image')) {
      return res.status(400).json({ success: false, message: 'Invalid or missing photo data' });
    }
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error('❌ Post creation failed:', err.message);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;