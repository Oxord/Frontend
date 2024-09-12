type Presentation = {
    name: string;
    slides: Slide[];
}

type Slide = {
    id: string;//поправить на гид
    labels: labelType[];
    background: Background;
    sequenceNumber: number;
}

type Background = {
    type: 'solid' | 'image'
    value: Solid | ImageBackground
}

type Solid = {
    color: string;
    type: 'solid'
}

type ImageBackground = {
    src: string;
    type: 'image'
}

type Image = {
    
}

type labelType = {
    value: string;
    font: string;
    fontsize: number;
    positionX: number;
    positionY: number;
}

type selection = {
    selectedSlideId: string; //поправить на гид
}