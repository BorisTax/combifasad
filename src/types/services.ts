import {  OmitId } from "./materials"
import { Result, Token, PriceData } from "./server"
import { PermissionSchema, ResourceSchema, User } from "./user"
import { Template } from "./templates"
import { DATA_TABLE_NAMES, KeySet, TABLE_NAMES } from "./schemas"
import { UserPermissions, RESOURCE, UserRole } from "./user"

interface IUserAbstractService {
    getUsers: () => Promise<Result<User>>
    getUser: (token: string) => Promise<Result<User>>
    getTokens: () => Promise<Result<Token>>
    getToken: (token: string) => Promise<Result<Token>>
    addToken: ({ token, username, time, lastActionTime }: Token) => Promise<Result<null>>
    updateToken: (token: string, lastActionTime: number) => Promise<Result<null>>
    deleteToken: (token: string) => Promise<Result<null>>
    clearAllTokens: () => Promise<Result<null>>
    registerUser: (userName: string, password: string, roleId: number) => Promise<Result<null>>
    updateUser: ({ userName, password, roleId }: { userName: string, password?: string, roleId?: number }) => Promise<Result<null>>
    deleteUser: (user: User) => Promise<Result<null>>
    getUserRoleId: (username: string) => Promise<number>
    getRoles: () => Promise<Result<UserRole>>
    addRole: (name: string) => Promise<Result<null>>
    deleteRole: (id: number) => Promise<Result<null>>
    getSuperUsers: () => Promise<Result<{ name: string }>>
    getSuperRoles: () => Promise<Result<{ roleId: number }>>
}

export interface IDataBaseService<T extends { id?: number }> {
    getData: (table: TABLE_NAMES, columns: KeySet<T>, conditions: Partial<T>) => Promise<Result<T>>
    addData: (table: TABLE_NAMES, data: Partial<T>) => Promise<Result<T>>
    deleteData: (table: TABLE_NAMES, lookIn: Partial<T> ) => Promise<Result<null>>
    updateData: (table: TABLE_NAMES, lookIn: Partial<T>, update: Partial<T>) => Promise<Result<null>>
}
interface ITemplateAbstractService {
    getFasadTemplates: () => Promise<Result<Template>>
    addFasadTemplate: ({ }: OmitId<Template>) => Promise<Result<null>>
    deleteFasadTemplate: (id: number) => Promise<Result<null>>
    updateFasadTemplate: ({ }: Template) => Promise<Result<null>>
}
interface IPriceAbstractService {
    getPriceList: () => Promise<Result<PriceData>>
    updatePriceList: (item: PriceData) => Promise<Result<null>>
}
interface IPermissionAbstractService {
    getPermissions: (roleId: number) => Promise<Result<PermissionSchema>>
    addPermissions: (roleId: number, resource: RESOURCE, permissions: UserPermissions) => Promise<Result<null>>
    deletePermissions: (roleId: number, resource: RESOURCE) => Promise<Result<null>>
    updatePermissions: (roleId: number, resource: RESOURCE, permissions: UserPermissions) => Promise<Result<null>>
    getResourceList: () => Promise<Result<ResourceSchema>>
}

export interface IDataBaseServiceProvider<T extends { id: number }> extends IDataBaseService<T> {
    dbFile: string
}
export interface ITemplateServiceProvider extends ITemplateAbstractService {
    dbFile: string
}
export interface ITemplateService extends ITemplateAbstractService {
    provider: ITemplateServiceProvider
}
export interface IUserServiceProvider extends IUserAbstractService {
    dbFile: string
}
export interface IUserService extends IUserAbstractService {
    provider: IUserServiceProvider
}

export interface IPriceServiceProvider extends IPriceAbstractService {
    dbFile: string
}
export interface IPriceService extends IPriceAbstractService {
    provider: IPriceServiceProvider
}

export interface IPermissionServiceProvider extends IPermissionAbstractService {
    dbFile: string
}
export interface IPermissionService extends IPermissionAbstractService {
    provider: IPermissionServiceProvider
}