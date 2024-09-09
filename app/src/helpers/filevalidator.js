const{ ExpressValidator }  = require('express-validator');
const path = require('path');

module.exports = 
    {
        isImage: function(value, filename) {
    
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case  '.png':
                    return '.png';
                default:
                    return false;
            }
        },
        isTextFile: function(value, filename){
            const extension = path.extname(filename).toLowerCase();
            if (extension in ['.txt','.pdf','.doc','.docx']){
                return extension;
            } else{
                return false;
            }

        }
    }