import { Slide } from "./Slide"

export type slidesCollection = {
    slides: Slide[];
}

const addSlide = (slidesCollection: slidesCollection): void => {
    const newSlide: Slide = {
        labels: [],
        background: "black",
        sequenceNumber: slidesCollection.slides.length
    }
    slidesCollection = { ...slidesCollection, slides: [ ...slidesCollection.slides, newSlide ] };
}

const deleteSlide = (slidesCollection: slidesCollection, slide: Slide): void => {
    slidesCollection = { ...slidesCollection, slides: slidesCollection.slides.slice(slidesCollection.slides.indexOf(slide), 1) };
}

const changeSlidePosition = (slidesColection: slidesCollection, slide: Slide, newPositionNum: number): void => {
    slide = {...slide, sequenceNumber: newPositionNum}
    const newArrayOfSlide = slidesColection.slides.sort((a: Slide, b: Slide): number => 
        {
            a.sequenceNumber < b.sequenceNumber? 1: -1; return 0;
        }
    );
    slidesColection.slides = newArrayOfSlide;
    
}