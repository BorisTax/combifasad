import { FasadMaterial } from "./enums";

export enum SpecificationItem {
    DSP10 = "DSP10",
    Mirror = "Mirror",
    Arakal = "Arakal",
    Hydro = "Hydro",
    Lacobel = "Lacobel",
    Ritrama = "Ritrama",
    Armirovka = "Armirovka",
    FMPPaper = "FMPPaper",
    FMPGlass = "FMPGlass",
    Paint = "Paint",
    EVA = "EVA",
    Uplot = "Uplot",
    UplotSoedBavaria = "UplotSoedBavaria",
    ProfileSoedStandart = "ProfileSoedStandart",
    ProfileVertStandart = "ProfileVertStandart",
    ProfileHorTopStandart = "ProfileHorTopStandart",
    ProfileHorBottomStandart = "ProfileHorBottomStandart",
    ProfileSoedBavaria = "ProfileSoedBavaria",
    ProfileVertBavaria = "ProfileVertBavaria",
    ProfileHorTopBavaria = "ProfileHorTopBavaria",
    ProfileHorBottomBavaria = "ProfileHorBottomBavaria",
    Streich = "Streich",
    Roliki = "Roliki",
    RolikiBavaria = "RolikiBavaria",
    Karton = "Karton",
    Skotch = "Skotch",
    DSP = "DSP",
    DVP = "DVP",
    Kromka2 = "Kromka2",
    Kromka05 = "Kromka05",
    Glue = "Glue",
    Leg = "Leg",
    Confirmat = "Confirmat",
    ZagConfirmat = "ZagConfirmat",
    ZagMinifix = "ZagMinifix",
    Minifix = "Minifix",
    Nails = "Nails",
    Planka = "Planka",
    Telescope200 = "Telescope200",
    Telescope250 = "Telescope250",
    Telescope300 = "Telescope300",
    Telescope350 = "Telescope350",
    Telescope400 = "Telescope400",
    Telescope450 = "Telescope450",
    Telescope500 = "Telescope500",
    Telescope550 = "Telescope550",
    Trempel = "Trempel",
    Trempel250 = "Trempel250",
    Trempel300 = "Trempel300",
    Truba = "Truba",
    Flanec = "Flanec",
    Samorez16 = "Samorez16",
    Samorez30 = "Samorez30",
    StyagkaM6 = "StyagkaM6",
    NapravTop = "NapravTop",
    NapravBottom = "NapravBottom",
    Stopor = "Stopor",
    ConfKluch = "ConfKluch",
    Box = "Box",
    Brush = "Brush",
    BrushBavaria = "BrushBavaria",
    Lamp = "Lamp",
}

export enum CORPUS_SPECS {
    CORPUS = "corpus",
    EXT_TEL = "telescope",
    EXT_SHELF = "shelf",
    EXT_SHELFPLAT = "shelfPlat",
    EXT_PILLAR = "pillar",
    EXT_TUBE = "truba",
    EXT_TREMPEL = "trempel",
    EXT_STAND = "stand",
    EXT_CONSOLE = "console",
    EXT_BLINDER = "blinder",
    EXT_LIGHT = "light"
}
export type SPEC_GROUP = FasadMaterial | CORPUS_SPECS;

