import { Getter, Setter, atom } from "jotai";
import React from "react";
import { calculateSpecificationsAtom } from "./specification";
import { loadPriceListAtom } from "./prices";

type MessageAtom = {
    dialogRef: React.RefObject<HTMLDialogElement> | null
    message: string
}
type ConfirmAtom = {
    dialogRef: React.RefObject<HTMLDialogElement> | null
    message: string
    onYesAction: () => void
    onNoAction?: () => void
}
export const rerenderDialogAtom = atom(0)

const loginDialog = atom<React.RefObject<HTMLDialogElement> | null>(null)
export const loginDialogAtom = atom((get: Getter) => get(loginDialog), (get: Getter, set: Setter, loginDialogRef: React.RefObject<HTMLDialogElement> | null) => {
    set(loginDialog, loginDialogRef)
})
export const editMaterialDialogAtom = atom<React.RefObject<HTMLDialogElement> | null>(null)
export const editProfileDialogAtom = atom<React.RefObject<HTMLDialogElement> | null>(null)
export const editPriceDialogAtom = atom<React.RefObject<HTMLDialogElement> | null>(null)
export const specificationDialogAtom = atom<React.RefObject<HTMLDialogElement> | null>(null)
export const showSpecificationDialogAtom = atom(null, (get, set) => {
    const dialogRef = get(specificationDialogAtom)
    set(loadPriceListAtom)
    set(calculateSpecificationsAtom)
    dialogRef?.current?.showModal()
})
export const schemaDialogAtom = atom<React.RefObject<HTMLDialogElement> | null>(null)
export const showSchemaDialogAtom = atom(null, (get, set) => {
    const dialogRef = get(schemaDialogAtom)
    dialogRef?.current?.showModal()
    set(rerenderDialogAtom, Math.random())
})
const messageAtom = atom<MessageAtom>({ dialogRef: null, message: "" })
export const messageDialogAtom = atom((get) => get(messageAtom), (get, set, message: string) => {
    const state = get(messageAtom)
    set(messageAtom, { ...state, message })
})

export const messageDialogRefAtom = atom(null, (get, set, dialogRef: React.RefObject<HTMLDialogElement> | null) => {
    const state = get(messageAtom)
    set(messageAtom, { ...state, dialogRef })
})

const confirmAtom = atom<ConfirmAtom>({ dialogRef: null, message: "", onYesAction: () => { }, onNoAction: () => { } })

export const confirmDialogAtom = atom((get) => get(confirmAtom), (get, set, { message, onYesAction, onNoAction = () => { } }) => {
    const state = get(confirmAtom)
    set(confirmAtom, { ...state, message, onYesAction, onNoAction })
})

export const confirmDialogRefAtom = atom(null, (get, set, dialogRef: React.RefObject<HTMLDialogElement> | null) => {
    const state = get(confirmAtom)
    set(confirmAtom, { ...state, dialogRef })
})