import { ForbiddenException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const imageUploadOptions: MulterOptions = {
    limits: {
        fileSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new ForbiddenException('Only .jpg, jpeg or .png format allowed!'), false);
        }
    },
};
