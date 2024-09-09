const fileHandler = require("../helpers/fileHandler");


class ResourceService{
    constructor(Resource){
        this.Resource = Resource;
    }

    async getResource(page=0, limit = 20){

        const {data ,pagination}= await this.Resource.paginate({
            page,
            limit,
            include: "Documents",
            
        });
        
        return {
            pagination,
            data
        }
    }

    async getResourceById(id){
        try {
            const Resource = await this.Resource.findByPk(id);
            const doc = await Resource.getDocuments();
            
            return {
                Resource,
                doc
            } ;
        } catch (error) {
            
            throw error;
        }
    }

    async createResource(body,file,folderName){
        try {
          
            const ResourceData = await this.Resource.create(body);
    
            //save file
            if (file) {
                const fileurl = await fileHandler.saveFile(`${folderName}/${ResourceData.id}_${file.originalname}`, file);
                await ResourceData.createDocument({ url: fileurl });
            }
    
            return true
            
        } catch (error) {
            
            throw error;
        }
    }

    async updateResource(id,Resource,file=null){
        try {
            const updatedResource = await this.Resource.update(Resource,{where:{id}});
            const doc = await updatedResource.getDocuments();
            if (file){
                for(const Document of doc){
                    await fileHandler.deleteFile(Document.url);
                    const fileurl = await fileHandler.saveFile(`Resources/${updatedResource.id}_${file.originalname}`, file);
                    await Document.update({url: fileurl});

                }
            }
            
            return updatedResource;
        } catch (error) {
            
            throw error;
        }
    }

    async deleteResource(id){
        try{

            const deletedResource = await this.Resource.findByPk(id);

            if (!deletedResource) return false;
            const docs = await deletedResource.getDocuments();

            //delete Resource
            for (const Document of docs) { // Iterate through each document
                await fileHandler.deleteFile(Document.url);
                await Document.destroy(); 
            }
            await deletedResource.destroy();

            return true;
        }catch(error){
            
            throw error;
        }
    }

    
}

module.exports = ResourceService;