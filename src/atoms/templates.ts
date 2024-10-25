import { atom } from "jotai";
import { FetchResult, fetchData, fetchGetData } from "../functions/fetch";
import { userAtom } from "./users";
import { combiStateAtom } from "./app";
import { TableFields } from "../types/server";
import { Template } from "../types/templates";
import { activeRootFasadIndexAtom } from "./fasades";
import FasadState from "../classes/FasadState";
import { setNewFasadesId, trySetHeight, trySetWidth } from "../functions/fasades";
import { settingsAtom } from "./settings";
import messages from "../server/messages";
import { API_ROUTE, TEMPLATES_ROUTE } from "../types/routes";
import { cloneAppState } from "../functions/wardrobe";

export const templateListAtom = atom<Template[]>([])

export const loadTemplateListAtom = atom(null, async (get, set) => {
    const { token } = get(userAtom)
    try {
        const result: FetchResult<Template> = await fetchGetData(`${API_ROUTE}${TEMPLATES_ROUTE}?token=${token}`)
        if (!result.success) return
        set(templateListAtom, result.data as Template[])
    } catch (e) { console.error(e) }
})

export const deleteTemplateAtom = atom(null, async (get, set, id) => {
    const user = get(userAtom)
    const result = await fetchData(`${API_ROUTE}${TEMPLATES_ROUTE}`, "DELETE", JSON.stringify({ id, token: user.token }))
    await set(loadTemplateListAtom)
    return { success: result.success as boolean, message: result.message as string }
})

export const addFasadTemplateAtom = atom(null, async (get, set, name: string) => {
    const user = get(userAtom)
    const index = get(activeRootFasadIndexAtom)
    const { rootFasades } = get(combiStateAtom)
    const data = JSON.stringify(rootFasades[index])
    const formData = JSON.stringify({[TableFields.NAME]: name, [TableFields.DATA]: data, [TableFields.TOKEN]: user.token})
    try {
        const result = await fetchData(`${API_ROUTE}${TEMPLATES_ROUTE}`, "POST", formData)
        await set(loadTemplateListAtom)
        return { success: result.success as boolean, message: result.message as string }
    } catch (e) { 
        console.error(e) 
        return { success: false, message: messages.SERVER_ERROR }
    }
})

export const updateFasadTemplateAtom = atom(null, async (get, set, { name, id, rename = false }) => {
    const user = get(userAtom)
    const index = get(activeRootFasadIndexAtom)
    const { rootFasades } = get(combiStateAtom)
    const data = JSON.stringify(rootFasades[index])
    const formData = {[TableFields.NAME]: name, [TableFields.ID]: id, [TableFields.DATA]: data, [TableFields.TOKEN]: user.token}
    if(!rename) formData[TableFields.DATA] = data
    try {
        const result = await fetchData(`${API_ROUTE}${TEMPLATES_ROUTE}`, "PUT", JSON.stringify(formData))
        await set(loadTemplateListAtom)
        return { success: result.success as boolean, message: result.message as string }
    } catch (e) { 
        console.error(e) 
        return { success: false, message: messages.SERVER_ERROR }
    }
})

export const applyTemplateAtom = atom(null, (get, set, state: FasadState) => {
    const index = get(activeRootFasadIndexAtom)
    const appData = cloneAppState(get(combiStateAtom))
    const { minSize } = get(settingsAtom)
    const width = appData.rootFasades[index].width
    const height = appData.rootFasades[index].height
    const newFasad = state
    setNewFasadesId(newFasad)
    let res = trySetWidth(newFasad, appData.rootFasades, width, minSize)
    res = res && trySetHeight(newFasad, appData.rootFasades,height, minSize)
    if(res){
        appData.rootFasades[index] = newFasad
        set(combiStateAtom, appData, true)
        return { success: true, message: "" }
    } else return { success: false, message: messages.TEMPLATE_APPLY_ERROR }
})