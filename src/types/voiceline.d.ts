export class Ship {
    Default: Array<Line>;
    // [Skin Name]: Array<Line>; // note: the skin name is directly from the wiki page
    // ...
}

export class Line {
    event: string;  // the event (touch etc) name
    en?: string;    // the line in english
    zh?: string;    // the line in chinese
    jp?: string;    // the line in japanese
    audio?: string; // the line's audio url, file type = "audio/ogg"
}