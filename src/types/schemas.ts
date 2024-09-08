import { SpecificationItem } from "./specification"

export type Query = {
    query: string,
    params: any[]
}
export type WardrobeTableSchema = {
    name: string,
    caption: string
}
export type WardrobeDetailSchema = {
    name: string,
    caption: string
}

export type DVPTableSchema = {
    width: number,
    length: number
}
export type WardrobeDetailTableSchema = {
    wardrobe: string,
    name: string,
    minwidth: number,
    maxwidth: number,
    minheight: number,
    maxheight: number,
    count: number,
    size: string,
    enable: number
}

export type WardrobeFurnitureTableSchema = {
    wardrobe: string,
    name: SpecificationItem,
    minwidth: number,
    maxwidth: number,
    minheight: number,
    maxheight: number,
    mindepth: number,
    maxdepth: number,
    count: number,
    size: string,
    enable: number
}
export enum MAT_TABLE_NAMES {
    MATERIALS = 'materials',
    EXTMATERIALS = 'extmaterials',
    EXTMATERIALS_IMAGES = 'extmaterials_images',
    PROFILE_COLORS = 'profilecolors',
    BRUSH = 'brush',
    EDGE = 'edge',
    TREMPEL = 'trempel',
    ZAGLUSHKA = 'zaglushka',
    UPLOTNITEL = 'uplotnitel',
    DSPEDGEZAGL = 'dsp_edge_zagl',
}

export enum SPEC_TABLE_NAMES {
    PRICELIST = 'pricelist',
    MATERIALS = 'materials',
    UNITS = 'units',
    WARDROBES = 'wardrobes',
    DETAILS = 'details',
    DETAIL_TABLE = 'detail_table',
    DVP_TEMPLATES = 'dvp_templates',
    FURNITURE = 'furniture'
}

export enum USER_TABLE_NAMES {
    USERS = 'users',
    USERROLES = 'userroles',
    TOKENS = 'tokens',
    ROLES = 'roles',
    RESOURCES = 'resources',
    PERMISSIONS = 'permissions',
    USER_ROLES = 'user_roles',
    SUPERUSERS = 'superusers',
    SUPERROLES = 'superroles',
}
