import { labelType } from "./labelType";

export type Slide = {
    labels: labelType[];
    background: string;
    sequenceNumber: number;
}

const addLabel = (slide: Slide, label: labelType): void => {
    slide = {...slide, labels: [...slide.labels,  label] }
}

const deleteLabel = (slide: Slide, label: labelType): void => {
    slide = {...slide, labels: slide.labels.slice(slide.labels.indexOf(label), 1) }
}

const editPostion = (): void => {}