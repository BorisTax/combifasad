import { useEffect, useMemo, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { loadPriceListAtom, priceListAtom, updatePriceListAtom } from "../../atoms/prices"
import { PriceData } from "../../types/server"
import { specificationDataAtom } from "../../atoms/specification"
import EditDataSection, { EditDataItem } from "./EditDataSection"
import { UnitCaptions } from "../../functions/materials"
import TableData from "../TableData"
import { SpecificationItem } from "../../types/specification"
import { InputType, PropertyType } from "../../types/property"
import EditContainer from "../EditContainer"
import { userAtom } from "../../atoms/users"
import { RESOURCE } from "../../types/user"
import messages from "../../server/messages"
type ExtPriceData = PriceData & { units: string, caption: string }
export default function EditPriceDialog() {
    const { permissions } = useAtomValue(userAtom)
    const perm = permissions.get(RESOURCE.PRICES)
    const loadPriceList = useSetAtom(loadPriceListAtom)
    const priceList = useAtomValue(priceListAtom)
    const specList = useAtomValue(specificationDataAtom)
    const extPriceList: ExtPriceData[] = useMemo(() => priceList.map(p => ({ ...p, units: specList.find(s => s.name === p.name)?.units || "", caption: specList.find(s => s.name === p.name)?.caption || "" })), [priceList, specList]) 
    const [selectedIndex, setSelectedIndex] = useState(0)
    const def = { name: "", caption: "", price: "", markup: "" }
    const { name, caption, price, markup } = (extPriceList && extPriceList[selectedIndex]) ? ({ ...(extPriceList[selectedIndex] || def) }) : def
    const updatePriceList = useSetAtom(updatePriceListAtom)
    const heads = ['Наименование', 'Ед', 'Цена', 'Наценка']
    const contents = extPriceList.map((i: ExtPriceData) => [i.caption || "", UnitCaptions.get(i.units || "") || "", `${i.price || ""}`, `${i.markup || ""}`])
    const editItems: EditDataItem[] = [
        { caption: "Наименование:", value: caption || "", message: messages.ENTER_CAPTION, type: InputType.TEXT, readonly: true },
        { caption: "Цена:", value: `${price}`, message: messages.ENTER_PRICE, type: InputType.TEXT, propertyType: PropertyType.POSITIVE_NUMBER },
        { caption: "Наценка:", value: `${markup}`, message: messages.ENTER_MARKUP, type: InputType.TEXT, propertyType: PropertyType.POSITIVE_NUMBER },
    ]
    useEffect(() => {
        loadPriceList()
    }, [loadPriceList])
    useEffect(() => {
        if (!perm?.Read) window.location.replace('/')
    }, [perm])
    return <EditContainer>
        <TableData heads={heads} content={contents} onSelectRow={(index) => setSelectedIndex(index)} />
        {(perm?.Create || perm?.Update || perm?.Delete) ? <EditDataSection items={editItems} onUpdate={async (checked, values) => {
            const data: PriceData = { name: name as SpecificationItem }
            if (checked[1]) data.price = +values[1]
            if (checked[2]) data.markup = +values[2]
            const result = await updatePriceList(data)
            return result
        }} /> : <div></div>}
    </EditContainer>
}
