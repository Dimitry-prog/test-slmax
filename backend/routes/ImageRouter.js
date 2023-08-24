import Router from 'express';
import multer from 'multer';
import { uploadImage, downloadImage, getImages } from '../controllers/ImageController.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const fileName = file.originalname.replaceAll(' ', '_');
    cb(null, fileName);
  },
});
const upload = multer({ storage });
const router = new Router();

router.get('/', getImages);
router.get('/:imageId', downloadImage);
router.post('/uploads', upload.single('file'), uploadImage);

export default router;
