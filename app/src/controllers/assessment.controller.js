const ResourceService = require('../services/Resource.Services.Js')
const fileHandler = require("../helpers/fileHandler");
const db = require('../models');
const AssessmentModel = db.getModels().Assessment;

const AssessmentService = new ResourceService(AssessmentModel);

class Assessment{
    async getAssessment(req,res){
        try {

          const assessment = await AssessmentService.getResource();
          return res.status(200).json({assessment});

        } catch (error) {
          
          return res.status(400).json({error: "Something went wrong"});
        }
    }

    async createAssessment(req,res){
       
        const uploadedFile = req.file;
        const fileName = "Assessment";
        const size = Math.round((uploadedFile.size/(1024))* 100)/100;
       
        
        const body = {
            'name': req.body.name,
            'courseCode': req.body.courseCode,
            'size': size,
        }
        try {
          const isCreated = await AssessmentService.createResource(body,uploadedFile,fileName);
          if (isCreated){
            return res.status(200).json({message: "Assessment uploaded successfully"});
          }
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: "image not saved"});
            
        }
    }

    async getAssessmentById(req,res){
       try {
          const assessment = await AssessmentService.getResourceById(req.params.id);
          return res.status(200).json(assessment);
       } catch (error) {
          
          return res.status(400).json({error: "Something went wrong"});
       }
    }

    async downloadAssessment(req,res){
      try {
          const file = await fileHandler.retrieveFile(req.query.fileName,res);
          return {};
      } catch (error) {
        
        console.error(error.message)
        return res.status(400).json({error: "Something went wrong"});
      }
    }


    async updateAssessment(req,res){
        try{
            const updatedAssessment = await AssessmentService.updateResource(req.params.id,req.body,req.file);
            return res.status(200).json(updatedAssessment);
        }catch(error){
          
          res.status(400).json({error: "Something went wrong"});
        }
    }

    async deleteAssessment(req,res) {
        try{
            const deletedAssessment = await AssessmentService.deleteResource(req.params.id);

            if(deletedAssessment){
              return res.status(200).json({message: "Assessment deleted successfully"});
            }

            return res.status(400).json({error: "Something went wrong"})
        }catch (error){
          
          return res.status(400).json({error: "Something went wrong"});
        }
    }
}

module.exports = new Assessment;