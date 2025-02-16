import { PropertyType } from "../types/property"
import PropertyGrid from "./PropertyGrid"
import PropertyRow from "./PropertyRow"
import { useAtomValue, useSetAtom } from "jotai"
import ComboBox from "./inputs/ComboBox"
import { combiStateAtom, historyCombiAtom, openStateAtom, redoAtom, resetAppDataAtom, saveStateAtom, setFasadCountAtom, setProfileIdAtom, setWardHeightAtom, setWardTypeAtom, setWardWidthAtom, undoAtom } from "../atoms/app"
import useConfirm from "../custom-hooks/useConfirm"
import ImageButton from "./inputs/ImageButton"
import { userAtom } from "../atoms/users"
import TextBox from "./inputs/TextBox"
import { useMemo } from "react"
import { WARDROBE_TYPE } from "../types/wardrobe"
import { RESOURCE } from "../types/user"
import { wardrobeTypesAtom } from "../atoms/storage"
import { profileAtom } from "../atoms/materials/profiles"
import { charAtom } from "../atoms/materials/chars"
import useMessage from "../custom-hooks/useMessage"
import ImageButtonBar from "./inputs/Image'ButtonBar"
import Selector from "./inputs/Selector"
const fasades = [ 2, 3, 4, 5, 6]
export default function WardrobePropertiesBar() {
    const user = useAtomValue(userAtom)
    const allWardTypes = useAtomValue(wardrobeTypesAtom)
    const profileList = useAtomValue(profileAtom)
    const chars = useAtomValue(charAtom)
    const { profile, fasadCount, type, wardHeight, wardWidth } = useAtomValue(combiStateAtom)
    const setProfileId = useSetAtom(setProfileIdAtom)
    const setFasadCount = useSetAtom(setFasadCountAtom)
    const setWardWidth = useSetAtom(setWardWidthAtom)
    const setWardHeight = useSetAtom(setWardHeightAtom)
    const setWardType = useSetAtom(setWardTypeAtom)
    const showConfirm = useConfirm()
    const showMessage = useMessage()
    const resetAppData = useSetAtom(resetAppDataAtom)
    const saveState = useSetAtom(saveStateAtom)
    const openState = useSetAtom(openStateAtom)
    const { next, previous } = useAtomValue(historyCombiAtom)
    const undo = useSetAtom(undoAtom)
    const redo = useSetAtom(redoAtom)
    const perm = user.permissions.get(RESOURCE.COMBIFASADES)
    const saveFileDisabled = !perm?.Create
    const readFileDisabled = !perm?.Read
    const wardTypes = useMemo(() => [...allWardTypes.keys()].filter(k=> k !== WARDROBE_TYPE.GARDEROB), [allWardTypes])
    const wardTypeChangeConfirm = async () => {
        await showMessage("Текущая конфигурация фасадов невозможна при данном типе шкафа")
        return false
    }
    const wardHeightConfirm = async () => {
        await showMessage("Текущая конфигурация фасадов невозможна при данной высоте")
        return false
    }
    const wardWidthConfirm = async () => {
        await showMessage("Текущая конфигурация фасадов невозможна при данной ширине")
        return false
    }
    const wardProfileConfirm = async () => {
        await showMessage("Текущая конфигурация фасадов невозможна при данном типе профиля")
        return false
    }
    const wardFasadCountConfirm = async () => {
        await showMessage("Текущая конфигурация фасадов невозможна при данном кол-ве фасадов")
        return false
    }
    return <div className="properties-bar">
        <div className="d-flex flex-nowrap justify-content-between">
            <div>Параметры шкафа</div>
            <ImageButtonBar justifyContent="flex-end">
                <ImageButton title="Настройки по умолчанию" icon="new" onClick={async () => { if (await showConfirm("Сбросить в начальное состояние?")) resetAppData() }} />
                <ImageButton title="Открыть" icon="open" disabled={readFileDisabled} onClick={() => { openState() }} />
                <ImageButton title="Сохранить" icon="save" disabled={saveFileDisabled} onClick={() => { saveState() }} />
                <ImageButton title="Отменить" icon="undo" disabled={!previous} onClick={() => { undo() }} />
                <ImageButton title="Повторить" icon="redo" disabled={!next} onClick={() => { redo() }} />
            </ImageButtonBar>
        </div>
        <hr />
        <PropertyGrid>
            <ComboBox<WARDROBE_TYPE> title="Тип:" value={type} items={wardTypes} displayValue={value => allWardTypes.get(value) || ""} onChange={value => { setWardType([value as WARDROBE_TYPE, wardTypeChangeConfirm]) }} />
            <div className="text-end">Ширина: </div>
            <PropertyRow>
                <TextBox name="width" value={wardWidth} type={PropertyType.INTEGER_POSITIVE_NUMBER} min={900} max={4000} setValue={(value) => { setWardWidth([+value, wardWidthConfirm]) }} submitOnLostFocus={true} />
            </PropertyRow>
            <div className="text-end">Высота: </div>
            <PropertyRow>
                <TextBox name="height" value={wardHeight} type={PropertyType.INTEGER_POSITIVE_NUMBER} min={1800} max={2700} setValue={(value) => { setWardHeight([+value, wardHeightConfirm]) }} submitOnLostFocus={true} />
            </PropertyRow>
            <Selector<number> title="Кол-во фасадов:" value={fasadCount} items={fasades} displayValue={value => <div>&nbsp;{value}&nbsp;</div>} onChange={value => { setFasadCount([+value, wardFasadCountConfirm]) }} columns={fasades.length} />
            <ComboBox<number> title="Профиль:" value={profile.id} items={[...profileList.keys()]} displayValue={value => chars.get(profileList.get(value)?.charId || 0)?.name || ""} onChange={value => { setProfileId([value, wardProfileConfirm]); }} />
        </PropertyGrid>
    </div>
}