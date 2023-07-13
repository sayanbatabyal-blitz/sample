import multer, { Multer, StorageEngine } from 'multer'
class MulterClient{
    public storage:StorageEngine
    public upload:Multer
    constructor(){
        this.storage=multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,'temp/')
            },
            filename:(req,file,cb)=>{
                cb(null,"data.csv")
            },
        })
        this.upload=multer({storage:this.storage})
    }
}

export default MulterClient