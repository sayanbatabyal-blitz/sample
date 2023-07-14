import { Task } from "@/typings/task";
import { Parser } from 'json2csv';
export const createCsvFile = async (data: Task[], fields: Object[]) => {
    const parser = new Parser({ fields: fields });
    const csv = await parser.parse(data);
    return csv
}