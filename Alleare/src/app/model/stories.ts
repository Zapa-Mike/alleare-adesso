export interface Story{
    storyfrage:string;
    docidstory:any;
    story:string;
    bildstory:any;
    audio?: HTMLAudioElement;
}

export interface Radio{
    radiofrage:string;
    docidradio:any;
    bildradio:any;
}

export interface VierRadio{
    frage:string;
    docid:any;
    antwort1:string;
    antwort2:string;
    antwort3:string;
    antwort4:string;
}

export interface ZweiBilder{
    frage:string;
    docid:any;
    bild1:string;
    bild2:string;
    label1:string;
    label2:string;
}