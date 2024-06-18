import { useEffect, useMemo, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { Uplotnitel } from "../../../types/materials"
import messages from "../../../server/messages"
import { materialListAtom } from "../../../atoms/materials/materials"
import { FasadMaterial } from "../../../types/enums"
import EditDataSection, { EditDataItem } from "../EditDataSection"
import { InputType } from "../../../types/property"
import TableData from "../../TableData"
import Container from "../../Container"
import { addUplotnitelAtom, deleteUplotnitelAtom, updateUplotnitelAtom, uplotnitelListAtom } from "../../../atoms/materials/uplotnitel"

export default function EditUplotnitel() {
    const noSortedList = useAtomValue(uplotnitelListAtom)
    const list = useMemo(() => noSortedList.toSorted((i1, i2) => i1.name > i2.name ? 1 : -1), [noSortedList])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { name, code } = list[selectedIndex]
    const deleteUplotnitel = useSetAtom(deleteUplotnitelAtom)
    const addUplotnitel = useSetAtom(addUplotnitelAtom)
    const updateUplotnitel = useSetAtom(updateUplotnitelAtom)
    const heads = ['Наименование', 'Код']
    const contents = list.map((i: Uplotnitel) => [i.name, i.code])
    const editItems: EditDataItem[] = [
        { caption: "Наименование:", value: name || "", message: "Введите наименование", type: InputType.TEXT },
        { caption: "Код:", value: code, message: "Введите код", type: InputType.TEXT },
    ]
    useEffect(() => {
        setSelectedIndex(0)
    }, [noSortedList])
    return <Container>
        <TableData heads={heads} content={contents} onSelectRow={(index) => { setSelectedIndex(index) }} />
        <EditDataSection name={name} items={editItems}
            onUpdate={async (checked, values) => {
                const usedCode = checked[0] ? values[1] : ""
                const usedCaption = checked[1] ? values[2] : ""
                const result = await updateUplotnitel({ name, code: usedCode, caption: usedCaption })
                return result
            }}
            onDelete={async (name) => {
                const result = await deleteUplotnitel(list[selectedIndex])
                setSelectedIndex(0)
                return result
            }}
            onAdd={async (checked, values) => {
                const code = values[0]
                const caption = values[1]
                if (list.find((p: Uplotnitel) => p.name === name)) { return { success: false, message: messages.MATERIAL_EXIST } }
                const result = await addUplotnitel({ name, code })
                return result
            }} />
    </Container>
}
