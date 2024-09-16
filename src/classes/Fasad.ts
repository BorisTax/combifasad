import { newFasadFromState } from "../functions/fasades"
import { FasadOuterEdges } from "../types/edges"
import { Division, FasadMaterial } from "../types/enums"
import { FasadProps } from "../types/fasadProps"
import FasadState, { FasadBackImageProps, getInitialBackImageProps } from "./FasadState"

export default class Fasad {
    private active = false
    private material: FasadMaterial
    private extMaterial = ''
    private division = Division.HEIGHT
    private outerRightEdge = true
    private outerLeftEdge = true
    private outerTopEdge = true
    private outerBottomEdge = true
    public Children: Fasad[]
    private width = 0
    private height = 0
    private fWidth = false
    private fHeight = false
    public Parent: Fasad | null = null
    private level = 0
    private backImageProps: FasadBackImageProps
    constructor(props: FasadProps = {}) {
        this.width = props?.width || 0
        this.height = props?.height || 0
        this.material = props?.material || FasadMaterial.DSP
        this.extMaterial = props?.extMaterial || ""
        this.Children = []
        this.OuterEdges = { left: true, right: true, top: true, bottom: true }
        this.backImageProps = getInitialBackImageProps()
    }

    public getState(): FasadState {
        const state: FasadState = new FasadState()
        state.active = this.active
        state.level = this.level
        state.division = this.division
        state.width = this.width
        state.height = this.height
        state.fixedWidth = this.fWidth
        state.fixedHeight = this.fHeight
        state.material = this.material
        state.extMaterial = this.extMaterial
        state.backImageProps = { ...this.backImageProps }
        state.outerEdges = { left: this.outerLeftEdge, right: this.outerRightEdge, top: this.outerTopEdge, bottom: this.outerBottomEdge }
        state.children = []
        for (const c of this.Children) state.children.push(c.getState())
        return state
    }
    public setState(state: FasadState, keepOriginalMaterial = false) {
        this.level = state.level
        this.active = state.active
        this.width = state.width
        this.height = state.height
        this.fWidth = state.fixedWidth
        this.fHeight = state.fixedHeight
        if (!keepOriginalMaterial) this.material = state.material
        if (!keepOriginalMaterial) this.extMaterial = state.extMaterial
        this.division = state.division
        this.OuterEdges = { ...state.outerEdges }
        this.backImageProps = { ...state.backImageProps }
        this.Children = state.children.map((s: FasadState) => {
            const f: Fasad = newFasadFromState(s, keepOriginalMaterial)
            f.Parent = this
            return f
        })
    }
    public set BackImageProps(value: FasadBackImageProps){
        this.backImageProps = { ...value }
    }
    public get BackImageProps(): FasadBackImageProps {
        return this.backImageProps
    }
    public get Material() {
        return this.material
    }
    public setMaterial(value: FasadMaterial, toChildren = true) {
        this.material = value
        if (!toChildren) return
        for (const f of this.Children) {
            f.setMaterial(value, toChildren)
        }
    }
    public setExtMaterial(value: string, toChildren = true) {
        if (this.extMaterial !== value) this.backImageProps = getInitialBackImageProps()
        this.extMaterial = value
        if (!toChildren) return
        for (const f of this.Children) {
            f.setExtMaterial(value, toChildren)
        }
    }
    public get ExtMaterial() {
        return this.extMaterial
    }

    public get Width() {
        return this.width
    }
    public set Width(value: number) {
        this.width = value
    }
    public get Height() {
        return this.height
    }
    public set Height(value: number) {
        this.height = value
    }
    public fixWidth(value: boolean, toChildren = true) {
        this.fWidth = value
        if (!toChildren) return
        if (this.Division === Division.HEIGHT) this.Children.forEach((c: Fasad) => { c.fixWidth(value, toChildren) })
    }
    public FixedWidth(): boolean {
        return this.fWidth || (this.Division === Division.HEIGHT && this.Children.some((f: Fasad) => f.FixedWidth()))
    }
    public fixHeight(value: boolean, toChildren = true) {
        this.fHeight = value
        if (!toChildren) return
        if (this.Division === Division.WIDTH) this.Children.forEach((c: Fasad) => { c.fixHeight(value, toChildren) })
    }
    public FixedHeight(): boolean {
        return this.fHeight || (this.Division === Division.WIDTH && this.Children.some((f: Fasad) => f.FixedHeight()))
    }
    public get cutWidth() {
        return this.width - (this.material === FasadMaterial.DSP ? 0 : 3)
    }
    public get cutHeight() {
        return this.height - (this.material === FasadMaterial.DSP ? 0 : 3)
    }
    public get Division() {
        return this.division
    }
    public set Division(value: Division) {
        this.division = value
    }
    public get OuterEdges() {
        return { left: this.outerLeftEdge, right: this.outerRightEdge, top: this.outerTopEdge, bottom: this.outerBottomEdge }
    }
    public set OuterEdges(edges: FasadOuterEdges) {
        const { left, right, top, bottom } = edges
        if (right !== undefined) this.outerRightEdge = right
        if (left !== undefined) this.outerLeftEdge = left
        if (top !== undefined) this.outerTopEdge = top
        if (bottom !== undefined) this.outerBottomEdge = bottom
    }
    public get Active() {
        return this.active
    }
    public set Active(value: boolean) {
        this.active = value
    }
    public getActiveFasad(): Fasad | null {
        if (this.active) return this
        let active: Fasad | null = null
        this.Children.forEach((c: Fasad) => { active = c.getActiveFasad() || active })
        return active
    }
    public setActiveFasad(fasad: Fasad | null) {
        this.Children.forEach((c: Fasad) => { c.setActiveFasad(fasad) })
        this.active = (this === fasad)
    }

    public divideFasad(count: number, minSize: number) {
        if (this.Division === Division.HEIGHT) return this.divideOnHeight(count, minSize); else return this.divideOnWidth(count, minSize)
    }
    public divideOnHeight(count: number, minSize: number): boolean {
        const profileTotal = (count - 1)
        if (this.Children.length > 1) this.setMaterial(this.Children[0].Material)
        const partHeight = +((this.Height - profileTotal) / count).toFixed(1)
        if (partHeight < minSize) return false
        const partLast = +(this.height - partHeight * (count - 1) - profileTotal).toFixed(1)
        this.Children = []
        if (count === 1) return true
        for (let i = 1; i <= count; i++) {
            const part = i < count ? partHeight : partLast
            const fasad: Fasad = new Fasad({ width: this.width, height: part, minSize, material: this.material, extMaterial: this.extMaterial }) 
            const topEdge = i === 1 ? this.outerTopEdge : false
            const bottomEdge = i === count ? this.outerBottomEdge : false
            fasad.OuterEdges = { left: this.outerLeftEdge, right: this.outerRightEdge, top: topEdge, bottom: bottomEdge }
            fasad.Parent = this
            fasad.Level = this.level + 1
            fasad.Division = Division.WIDTH
            this.Children.push(fasad)
        }
        return true
    }
    public divideOnWidth(count: number, minSize: number): boolean {
        const profileTotal = (count - 1)
        if (this.Children.length > 1) this.setMaterial(this.Children[0].Material)
        const partWidth = +((this.width - profileTotal) / count).toFixed(1)
        if (partWidth < minSize) return false
        this.Children = []
        if (count === 1) return true
        for (let i = 1; i <= count; i++) {
            const fasad: Fasad = new Fasad({ width: partWidth, height: this.height, minSize, material: this.material, extMaterial: this.extMaterial }) 
            const leftEdge = i === 1 ? this.outerLeftEdge : false
            const rightEdge = i === count ? this.outerRightEdge : false
            fasad.OuterEdges = { left: leftEdge, right: rightEdge, top: this.outerTopEdge, bottom: this.outerBottomEdge }
            fasad.Parent = this
            fasad.Level = this.level + 1
            fasad.Division = Division.HEIGHT
            this.Children.push(fasad)
        }
        return true
    }
    public DistributePartsOnWidth(initiator: Fasad | null, newWidth: number, useSameWidth: boolean, minSize: number): boolean {
        if (this.Children.length === 0) return true
        let totalFixedWidth = 0
        let totalFreeWidth = 0
        let totalFreeCount = 0
        let partFreeWidth = 0
        let partLastWidth = 0
        let lastFreeIndex = 0
        const profile = 1
        let i = 0
        if (!useSameWidth) {
            for (const c of this.Children) {
                i = i + 1
                if (c.FixedWidth() && !(c === initiator)) totalFixedWidth = totalFixedWidth + c.width
                if (c === initiator) totalFixedWidth = totalFixedWidth + newWidth
                if ((!c.FixedWidth()) && !(c === initiator)) {
                    totalFreeCount = totalFreeCount + 1
                    lastFreeIndex = i
                }
                if (i < this.Children.length) {
                    totalFixedWidth = totalFixedWidth + profile
                }
            }
            if (totalFreeCount === 0) return false
            totalFreeWidth = this.width - totalFixedWidth
            partFreeWidth = +((totalFreeWidth / totalFreeCount).toFixed(1))
            partLastWidth = +(totalFreeWidth - partFreeWidth * (totalFreeCount - 1)).toFixed(1)
            if (partFreeWidth < minSize || partLastWidth < minSize) return false
        }
        let part = 0
        i = 0
        for (const c of this.Children) {
            i = i + 1
            if (c.FixedWidth()) part = c.width
            if (c === initiator) part = newWidth
            if (!c.FixedWidth() && !(c === initiator)) part = lastFreeIndex === i ? partLastWidth : partFreeWidth
            if (useSameWidth) part = c.width
            c.width = part
            c.height = this.height
            if (c.Children.length > 1) {
                let res: boolean
                if (c.Division === Division.HEIGHT) res = c.DistributePartsOnHeight(null, 0, useSameWidth, minSize); else res = c.DistributePartsOnWidth(null, 0, useSameWidth, minSize)
                if (!res) return false
            }
        }
        return true
    }

    public DistributePartsOnHeight(initiator: Fasad | null, newHeight: number, useSameHeight: boolean, minSize: number): boolean {
        if (this.Children.length === 0) return true
        let totalFixedHeight = 0
        let totalFreeHeight = 0
        let totalFreeCount = 0
        let partFreeHeight = 0
        let partLastHeight = 0
        let lastFreeIndex = 0
        const profile = 1
        let i = 0
        if (!useSameHeight) {
            for (const c of this.Children) {
                i = i + 1
                if (c.FixedHeight() && !(c === initiator)) totalFixedHeight = totalFixedHeight + c.height
                if (c === initiator) totalFixedHeight = totalFixedHeight + newHeight
                if ((!c.FixedHeight()) && !(c === initiator)) {
                    totalFreeCount = totalFreeCount + 1
                    lastFreeIndex = i
                }
                if (i < this.Children.length) {
                    totalFixedHeight = totalFixedHeight + profile
                }
            }
            if (totalFreeCount === 0) return false
            totalFreeHeight = this.height - totalFixedHeight
            partFreeHeight = +((totalFreeHeight / totalFreeCount).toFixed(1))
            partLastHeight = +(totalFreeHeight - partFreeHeight * (totalFreeCount - 1)).toFixed(1)
            if (partFreeHeight < minSize || partLastHeight < minSize) return false
        }
        let part = 0
        i = 0
        for (const c of this.Children) {
            i = i + 1
            if (c.FixedHeight()) part = c.height
            if (c === initiator) part = newHeight
            if (!c.FixedHeight() && !(c === initiator)) part = lastFreeIndex === i ? partLastHeight : partFreeHeight
            if (useSameHeight) part = c.height
            c.height = part
            c.width = this.width
            if (c.Children.length > 1) {
                let res: boolean
                if (c.Division === Division.WIDTH) res = c.DistributePartsOnWidth(null, 0, useSameHeight, minSize); else res = c.DistributePartsOnHeight(null, 0, useSameHeight, minSize)
                if (!res) return false
            }
        }
        return true
    }
    public set Level(value: number) {
        this.level = value
    }
    public get Level(): number {
        return this.level
    }
    public clone(parent: Fasad | null = null): Fasad {
        const fasad = new Fasad()
        fasad.Children = this.Children.map((c: Fasad) => c.clone(fasad))
        fasad.Active = this.Active
        fasad.Level = this.level
        fasad.Division = this.division
        fasad.setExtMaterial(this.extMaterial, false)
        fasad.setMaterial(this.material, false)
        fasad.Height = this.height
        fasad.Width = this.width
        fasad.fixHeight(this.fHeight, false)
        fasad.fixWidth(this.fWidth, false)
        fasad.OuterEdges = { ...this.OuterEdges }
        fasad.Parent = parent
        return fasad
    }
}