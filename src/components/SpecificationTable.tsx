import { useMemo, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { priceListAtom } from "../atoms/prices"
import { PriceData } from "../types/server"
import { UnitCaptions } from "../functions/materials"
import { MAT_PURPOSE } from "../types/enums"
import { userAtom } from "../atoms/users"
import { specificationDataAtom, specificationInProgress } from "../atoms/specification"
import { setVerboseDataAtom } from "../atoms/verbose"
import { showVerboseDialogAtom } from "../atoms/dialogs"
import { SpecificationResult, TotalData, VerboseData } from "../types/wardrobe"
import { RESOURCE } from "../types/user"
import CheckBox from "./inputs/CheckBox"

type SpecificationTableProps = {
    purposes: MAT_PURPOSE[],
    specification: SpecificationResult[],
    hint?: string
}

export default function SpecificationTable(props: SpecificationTableProps) {
    const { permissions } = useAtomValue(userAtom)
    const loading = useAtomValue(specificationInProgress)
    const permPrice =  permissions.get(RESOURCE.PRICES)
    const permSpec =  permissions.get(RESOURCE.SPECIFICATION)
    const specData = useAtomValue(specificationDataAtom)
    const priceList = useAtomValue(priceListAtom)
    const showVerbose = useSetAtom(showVerboseDialogAtom)
    const setVerboseData = useSetAtom(setVerboseDataAtom)
    const list: TotalData[] = useMemo(() => {
        const specList: TotalData[] = []
        specData.forEach(sd => {
            const spec = props.specification?.filter(s => s[0] === sd.name) || []
            if (spec.length === 0) spec.push([sd.name, { data: { amount: 0, char: { code: "", caption: "" } } }])
            const priceItem = priceList.find(p => p.name === sd.name) as PriceData
            spec.forEach(sp => {
                const code = sp[1].data.useCharAsCode ? sp[1].data.char?.code : sd.code //для щетки
                const caption = sp[1].data.useCharAsCode ? sp[1].data.char?.caption : sd.caption //для щетки
                specList.push({ ...sd, code, caption, ...sp[1].data, ...priceItem, amount: sp[1].data.amount, char: sp[1].data.char, verbose: sp[1].verbose as VerboseData })
            })
        })
        return [...specList]
    }, [specData, priceList, props.specification]) 
    const [showAll, setShowAll] = useState(false)
    const [showCodes, setShowCodes] = useState(false)
    const contents = list.filter(i => props.purposes.some(p => i.purpose === p) && (i.amount !== 0 || showAll)).map((item: TotalData, index: number) => {
        const amount = item.amount || 0
        const charCode = (item?.char?.code && showCodes) ? `(${item.char.code})` : ""
        const char = item.char && !item.useCharAsCode ? `${item.char.caption} ${charCode}` : ""
        const price = item.price || 0
        const className = (amount > 0) ? "tr-attention" : "tr-noattention"
        const verbose = (item.verbose) ? { className: "table-data-cell table-data-cell-hover", role: "button", onClick: () => { if (!permSpec?.Read) return; setVerboseData(item.verbose, item.name); showVerbose() } } : {}
        return <tr key={index} className={"table-data-row " + className}>
            <td className="table-data-cell" >{item.code}</td>
            <td className="table-data-cell" {...verbose}>{item.caption}</td>
            <td className="table-data-cell">{char}</td>
            <td className="table-data-cell">{Number(amount.toFixed(3))}</td>
            <td className="table-data-cell">{UnitCaptions.get(item.units || "")}</td>
            {permPrice?.Read ? <td className="table-data-cell">{price.toFixed(2)}</td> : <></>}
            {permPrice?.Read ? <td className="table-data-cell">{(amount * price).toFixed(2)}</td> : <></>}
            {permPrice?.Read ? <td className="table-data-cell">{item.markup}</td> : <></>}
        </tr >
    })
    return <div className="specification-table">
        <div className="table-data">
            <table>
                <thead>
                    <tr>
                        <th className="table-header">Код</th>
                        <th className="table-header">Наименование</th>
                        <th className="table-header">Характеристика</th>
                        <th className="table-header">Кол-во</th>
                        <th className="table-header">Ед</th>
                        {permPrice?.Read ? <th className="table-header">Цена за ед</th> : <></>}
                        {permPrice?.Read ? <th className="table-header">Цена</th> : <></>}
                        {permPrice?.Read ? <th className="table-header">Наценка</th> : <></>}
                    </tr>
                </thead>
                <tbody>{contents}</tbody>
            </table>
        </div>
        <hr />
        {props.hint && <div className="fw-bold text-danger">{props.hint}</div>}
        <CheckBox checked={showAll} caption="Показать все позиции" onChange={() => { setShowAll(!showAll) }} />
        <CheckBox checked={showCodes} caption="Отображать код характеристики" onChange={() => { setShowCodes(!showCodes) }} />
        {loading && <div className="spinner-container" onClick={(e) => { e.stopPropagation() }}><div className="spinner"></div></div>}
    </div>
}

