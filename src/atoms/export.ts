import { atom } from "jotai";
import { specificationDataAtom } from "./specification";
import writeToExcel from 'write-excel-file';
import { SpecificationItem } from "../types/specification";
import { UnitCaptions } from "../functions/materials";
import { SpecificationData } from "../types/server";
import { appDataAtom } from "./app";
import { SpecificationResultItem } from "../types/wardrobe";

export const saveToExcelAtom = atom(null, async (get, set, specification: Map<SpecificationItem, SpecificationResultItem>, fileName: string) => {
    const { order } = get(appDataAtom)
    const orderCaption = order.trim() ? order.trim() + " " : ""
    const specList = get(specificationDataAtom).filter(s => (specification.has(s.name) && specification.get(s.name as SpecificationItem)?.amount !== 0)).map(s => ({ ...s, charCode: specification.get(s.name as SpecificationItem)?.char?.code }))
    const schema = [
        { column: "Код", type: String, value: (p: SpecificationData) => p.code, width: 20 },
        { column: "Наименование", type: String, value: (p: SpecificationData) => p.caption, width: 40 },
        { column: "Характеристика", type: String, value: (p: SpecificationData & { charCode: string }) => p.charCode, width: 40 },
        { column: "Кол-во", value: (p: SpecificationData) => Number((specification.get(p.name as SpecificationItem))?.amount?.toFixed(3)), width: 10 },
        { column: "Ед", value: (p: SpecificationData) => UnitCaptions.get(p.units || ""), width: 5 },
        { column: "Идентификатор", value: (p: SpecificationData) => p.id, width: 30 },
    ]

    const data = specList

    await writeToExcel(data, {
        schema,
        headerStyle: {
            fontWeight: 'bold',
            align: 'center'
        }, fileName: `${orderCaption}${fileName}.xlsx`
    })
})
