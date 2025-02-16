import { useEffect, useMemo, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { specificationCombiAtom } from "../atoms/specification"
import { CHAR_PURPOSE } from "../types/enums"
import ImageButton from "./inputs/ImageButton"
import { saveToExcelAtom } from "../atoms/export"
import SpecificationTable from "./SpecificationTable"
import { activeRootFasadIndexAtom, setActiveRootFasadAtom } from "../atoms/fasades"
import ImageButtonBar from "./inputs/Image'ButtonBar"

export default function CombiSpecification() {
    const saveToExcel = useSetAtom(saveToExcelAtom)
    const specifications = useAtomValue(specificationCombiAtom)
    const activeRootFasadIndex = useAtomValue(activeRootFasadIndexAtom)
    const setActiveRootFasad = useSetAtom(setActiveRootFasadAtom)
    const [fasadIndex, setFasadIndex] = useState(0)
    const specification = specifications[fasadIndex] || []
    const heads = useMemo(() => specifications.map((_, index) => <div key={index} role="button" className={index === fasadIndex ? "tab-button-active" : "tab-button-inactive"} onClick={() => { setActiveRootFasad(index) }}>{`Фасад ${index + 1}`}</div>), [specifications, fasadIndex])
    useEffect(() => {
        setFasadIndex(activeRootFasadIndex)
    }, [activeRootFasadIndex])
    return <div className="ml-auto">
        <ImageButtonBar justifyContent="flex-end">
            <ImageButton icon="excel" title="Сохранить в Excel" caption="Сохранить в Excel" onClick={() => saveToExcel(specification, `Фасад (${fasadIndex + 1} из ${specifications.length})`)} />
        </ImageButtonBar>
        <div className="ml-auto">
            <div className="d-flex flex-row flex-nowrap justify-content-start align-items-center gap-1">
                {heads}
            </div>
            <hr/>
            <SpecificationTable purposes={[CHAR_PURPOSE.FASAD, CHAR_PURPOSE.BOTH]} specification={specification} />
        </div>
    </div>
}
