import { Slide } from "./Slide";
import { slidesCollection } from "./slidesCollection";

type Presentation = {
    name: string;
    slides: Slide[];
}

//файл types.ts раписать фигуры... тип для координат. Figure & {...} FigureType = 'rect' | 'circle'
//все ф-ии принимаюст всю презентацию. возвращаем презентацию. id слайда и всех сущностей.
// в ф-ию смены места слайда преедавать массив id-шник и его новую позицию.
//убрать сущность SlideColection
//всегда возвращаем Presentation

const rename = (presentation: Presentation, newName: string): void => {
    presentation = { ...presentation, name: newName}
}