import { ITaskOptions } from "@/typings/task"
import csv from "csvtojson"
import { Converter } from "csvtojson/v2/Converter"
import { JsonObject } from "swagger-ui-express"
class CSVJsonClient{
    public csvClient:Converter
    constructor(){
        this.csvClient=csv()
    }
    public getJson = async (path:string):Promise<ITaskOptions[]> => {
        return await this.csvClient.fromFile(path)

    }
}

export default CSVJsonClient