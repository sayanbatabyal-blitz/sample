import { IFilter } from "@/typings/common"

export const createFilter=(filters:IFilter)=>{
        const taskFilters = {};
        if(filters.status.length!==0) taskFilters['status']={['$in']:filters.status}
        if(Object.keys(filters.startDate).length!==0) taskFilters['startDate']={['$gte']:filters.startDate.from,['$lte']:filters.startDate.to}
        if(Object.keys(filters.completionDate).length!==0) taskFilters['completionDate']={['$gte']:filters.completionDate.from,['$lte']:filters.completionDate.to}
        return taskFilters      
}