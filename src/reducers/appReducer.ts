import { DIVIDE_FASAD, SET_ACTIVE_FASAD, SET_EXTMATERIAL, SET_FIXED_HEIGHT, SET_FIXED_WIDTH, SET_HEIGHT, SET_MATERIAL, SET_MATERIAL_LIST, SET_PROFILE_DIRECTION, SET_WIDTH } from '../actions/AppActions'
import Fasad from '../classes/Fasad'
import FasadState from '../classes/FasadState'
import { Division, FasadMaterial } from "../types/enums"
import { ExtMaterial } from '../types/materials'

export type AppState = {
    rootFasad: Fasad
    activeFasad: Fasad | null
    materials: Map<string, ExtMaterial[]>
  }

export function appReducer(state: AppState, action: { type: string, payload?: any }) {
    switch (action.type) {
        case DIVIDE_FASAD:
            state.activeFasad?.divideFasad(action.payload)
            return { ...state }
        case SET_ACTIVE_FASAD:
            state.activeFasad = action.payload
            return { ...state }
        case SET_FIXED_HEIGHT:
            if (state.activeFasad) state.activeFasad.fixHeight(action.payload)
            return { ...state }
        case SET_FIXED_WIDTH:
            if (state.activeFasad) state.activeFasad.fixWidth(action.payload)
            return { ...state }
        case SET_EXTMATERIAL:
            if (state.activeFasad) state.activeFasad.ExtMaterial = action.payload
            return { ...state }
        case SET_MATERIAL:
            if (state.activeFasad) state.activeFasad.Material = action.payload
            return { ...state }
        case SET_MATERIAL_LIST:
            state.materials = action.payload
            return { ...state }
        case SET_PROFILE_DIRECTION:
            if (state.activeFasad) {
            state.activeFasad.Division = action.payload
            state.activeFasad.divideFasad(state.activeFasad.Children.length)
            }
            return { ...state }
        case SET_HEIGHT:
            if (state.activeFasad) {
            const height = state.activeFasad.Material === FasadMaterial.DSP ? action.payload : action.payload + 3
            state.activeFasad.trySetHeight(height)
            }
            return { ...state }
        case SET_WIDTH:
            if (state.activeFasad) {
            const width = state.activeFasad.Material === FasadMaterial.DSP ? action.payload : action.payload + 3
            state.activeFasad.trySetWidth(width)
            }
        return { ...state }
    }
    return state
  }

  function getFasadState(width: number, height: number, division: Division, material: FasadMaterial) {
    const state = new FasadState()
    state.height = height
    state.width = width
    state.division = division
    state.material = material
  
    return state
  }
  export function getInitialState(): AppState {
    const root = getFasadState(1179, 2243, Division.HEIGHT, FasadMaterial.DSP)
    let children = [getFasadState(1179, 747, Division.HEIGHT, FasadMaterial.DSP), getFasadState(1179, 747, Division.WIDTH, FasadMaterial.MIRROR), getFasadState(1179, 747, Division.HEIGHT, FasadMaterial.DSP)]
    root.children = children
    children = [getFasadState(392.3, 747, Division.WIDTH, FasadMaterial.FMP), getFasadState(392.3, 747, Division.WIDTH, FasadMaterial.MIRROR), getFasadState(392.3, 747, Division.WIDTH, FasadMaterial.SAND)]
    root.children[1].children = children
    const fasad = new Fasad()
    fasad.setState(root)
    return { rootFasad: fasad, activeFasad: null, materials: new Map() }
  }