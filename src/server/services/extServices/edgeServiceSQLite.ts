import { Edge, NewEdge } from '../../../types/materials.js';
import { Result } from '../../../types/server.js';
import { IMaterialExtService, IMaterialServiceProvider } from '../../../types/services.js';
import { dataBaseQuery } from '../../functions/database.js';
import messages from '../../messages.js';
import { MAT_TABLE_NAMES } from '../../../types/schemas.js';
import { StatusCodes } from 'http-status-codes';
const { EDGE } = MAT_TABLE_NAMES
export default class EdgeServiceSQLite implements IMaterialExtService<Edge> {
    dbFile: string;
    constructor(dbFile: string) {
        this.dbFile = dbFile
    }
    async getExtData(): Promise<Result<Edge[]>> {
        return dataBaseQuery<Edge[]>(this.dbFile, `select * from ${EDGE};`, [], {successStatusCode: StatusCodes.OK})
    }
    async addExtData({ name, code }: Edge): Promise<Result<null>> {
        return dataBaseQuery(this.dbFile, `insert into ${EDGE} (name, code) values(?, ?, ?);`, [name, code], {successStatusCode: StatusCodes.CREATED, successMessage: messages.MATERIAL_ADDED})
    }
    async deleteExtData(name: string): Promise<Result<null>> {
        return dataBaseQuery(this.dbFile, `DELETE FROM ${EDGE} WHERE name=?;`, [name], { successStatusCode: StatusCodes.OK, successMessage: messages.MATERIAL_DELETED})
    }
    async updateExtData({ newName, code, name }: NewEdge): Promise<Result<null>> {
        const query =getEdgeQuery({ newName, code, name })
        return dataBaseQuery(this.dbFile, query.query, query.params, { successStatusCode: StatusCodes.OK, successMessage: messages.MATERIAL_UPDATED })
    }
}

function getEdgeQuery({ newName, code, name }: NewEdge) {
    const parts = []
    const params = []
    if (newName) {
        parts.push(`name=?`)
        params.push(newName)
    }
    if (code) {
        parts.push(`code=?`)
        params.push(code)
    }
    params.push(name)
    const query = parts.length > 0 ? `update ${EDGE} set ${parts.join(', ')} where name=?;` : ""
    return { query, params }
}
