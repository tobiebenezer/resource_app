const {bucket, admin }= require("../config/firebase-config.js")
const axios = require('axios')

class FileHandler{

    //Save file to storage
    async saveFile(ref_path,file){      
        const storage = await bucket.file(ref_path);
        const uploadFile = await storage.save(file.buffer,{contentType: file.mimetype});
        console.log(ref_path);
        return ref_path;
    }
      
    //Retrieve file from to storage
    async retrieveFile(url,res){
        try {
            // const fileName = url.split("/").pop();
            // const options = {
            //     destination: `./${fileName}`,
            // };
            // const file = await bucket.file(url);
            // const fileData = await file.download(options);
            
            // return fileData;
            const file = await bucket.file(url);
            const [metadata] = await file.getMetadata(); // Get file metadata

            // Set response headers for downloading
            const fileName = metadata.name.split("/").pop();
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', metadata.contentType);
            res.setHeader('Content-Length', metadata.size);

            // Create a read stream from the file and pipe it to the response
            const readStream = file.createReadStream();
            readStream.pipe(res);
        } catch (error) {
            console.log(error);
            throw error;
            return null;
        }
    }
    
    //Delete file from

    async deleteFile(ref_path){
        
        try{
            const file = await bucket.file(ref_path);
            const deleteObject = await file.delete();
    
            return true;
            
        }catch(error){
            console.log(error);
            throw error;
        }
  
    }

}

module.exports = new FileHandler();