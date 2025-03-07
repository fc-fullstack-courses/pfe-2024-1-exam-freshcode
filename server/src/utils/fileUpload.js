const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const { DEV_FILES_PATH, PROD_FILES_PATH } = require('../constants');

const devImagesPath = path.resolve(DEV_FILES_PATH, 'images');
const devContestsPath =  path.resolve(DEV_FILES_PATH, 'contests');

const imagesFilePath = env === 'production' ? `${PROD_FILES_PATH}/images` : devImagesPath;
const contestsFilePath = env === 'production' ? `${PROD_FILES_PATH}/images` : devContestsPath;

if(!fs.existsSync(imagesFilePath)) {
  fs.mkdirSync(imagesFilePath, {
    recursive: true,
  });
}

if(!fs.existsSync(contestsFilePath)) {
  fs.mkdirSync(contestsFilePath, {
    recursive: true,
  });
}

const storageImagesFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imagesFilePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, contestsFilePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerImagesStorage = multer({ storage: storageImagesFiles });
const multerContestStorage = multer({ storage: storageContestFiles });

module.exports.uploadAvatar = multerImagesStorage.single('file');
module.exports.uploadContestFiles = multerContestStorage.array('files', 3);
module.exports.updateContestFile = multerContestStorage.single('file');
module.exports.uploadLogoFile = multerContestStorage.single('offerData');
