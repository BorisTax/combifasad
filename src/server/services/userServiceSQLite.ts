import { dataBaseQuery, hashData } from '../functions/other.js'
import { IUserServiceProvider } from '../types/services.js';
import { Results, Token, User } from '../types/server.js';
import messages from '../messages.js';

export default class UserServiceSQLite implements IUserServiceProvider {
    dbFile: string;
    constructor(dbFile: string) {
        this.dbFile = dbFile
    }
    async getUsers(): Promise<Results> {
        return dataBaseQuery(this.dbFile, "select * from 'users'", {successStatusCode: 200})
    }
    async getTokens(): Promise<Results> {
        return dataBaseQuery(this.dbFile, "select * from 'tokens'", {successStatusCode: 200})
    }
    async addToken({ token, username, time, lastActionTime }: Token): Promise<Results> {
        return dataBaseQuery(this.dbFile, `INSERT INTO tokens (token, username, time, lastActionTime) VALUES('${token}', '${username}', ${time}, ${lastActionTime})`, {successStatusCode: 201})
    }
    async updateToken(token: string, lastActionTime: number): Promise<Results> {
        return dataBaseQuery(this.dbFile, `UPDATE tokens set lastActionTime='${lastActionTime}' WHERE token='${token}';`, {successStatusCode: 200})
    }
    async deleteToken(token: string): Promise<Results> {
        return dataBaseQuery(this.dbFile, `DELETE FROM tokens WHERE token='${token}'`, {successStatusCode: 200})
    }

    async clearAllTokens(): Promise<Results> {
        return dataBaseQuery(this.dbFile, `DELETE FROM tokens`, {successStatusCode: 200})
    }

    async registerUser(user: User): Promise<Results> {
        const result = await hashData(user.password);
        return dataBaseQuery(this.dbFile, `INSERT INTO users (name, role, password) VALUES('${user.name}', '${user.role}', '${result.data}')`, {successStatusCode: 201, successMessage: messages.USER_ADDED})
    }

    async deleteUser(user: User): Promise<Results> {
        return dataBaseQuery(this.dbFile, `DELETE FROM users where name='${user.name}';`, {successStatusCode: 200, successMessage: messages.USER_DELETED})
    }
}
