const ResourceService = require('../services/Resource.Services.Js')
const fileHandler = require("../helpers/fileHandler");
const db = require('../models');
const Lecture_noteModel = db.getModels().Lecture_note;

const Lecture_noteService = new ResourceService(Lecture_noteModel);

class Lecture_note{
    async getLecture_note(req,res){
        try {

          const lecture_note = await Lecture_noteService.getResource();
          return res.status(200).json({lecture_note});

        } catch (error) {
          
          return res.status(400).json({error: "Something went wrong"});
        }
    }

    async createLecture_note(req,res){
       
        const uploadedFile = req.file;
        const fileName = "lecture_note";
        const size = Math.round((uploadedFile.size/(1024))* 100)/100;
       
        
        const body = {
            'name': req.body.name,
            'courseCode': req.body.courseCode,
            'size': size,
        }
        try {
          const isCreated = await Lecture_noteService.createResource(body,uploadedFile,fileName);
          if (isCreated){
            return res.status(200).json({message: "Lecture_note uploaded successfully"});
          }
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "image not saved"});
            
        }
    }

    async getLecture_noteById(req,res){
       try {
          const lecture_note = await Lecture_noteService.getResourceById(req.params.id);
          return res.status(200).json(lecture_note);
       } catch (error) {
          
          return res.status(400).json({error: "Something went wrong"});
       }
    }

    async downloadLecture_note(req,res){
      try {
          const file = await fileHandler.retrieveFile(req.query.fileName,res);
          return {};
      } catch (error) {
        
        console.error(error.message)
        return res.status(400).json({error: "Something went wrong"});
      }
    }


    async updateLecture_note(req,res){
        try{
            const updatedLecture_note = await Lecture_noteService.updateResource(req.params.id,req.body,req.file);
            return res.status(200).json(updatedLecture_note);
        }catch(error){
          
          res.status(400).json({error: "Something went wrong"});
        }
    }

    async deleteLecture_note(req,res) {
        try{
            const deletedLecture_note = await Lecture_noteService.deleteResource(req.params.id);

            if(deletedLecture_note){
              return res.status(200).json({message: "Lecture_note deleted successfully"});
            }

            return res.status(400).json({error: "Something went wrong"})
        }catch (error){
          
          return res.status(400).json({error: "Something went wrong"});
        }
    }
}

module.exports = new Lecture_note;