const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/poiri/Desktop/CDA-24-2/1_EVAL BLOCS/1_COLLABORATIF/ressources_relationnelles/backend/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
