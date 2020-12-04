export interface QuestionResponse {
  frage: string;
  type: QuestionType;
  versicherung?: string;
  bild?: any;
  bild1?: any;
  bild2?: any;
  antwort1?: string;
  antwort2?: string;
  antwort3?: string;
  antwort4?: string;
  story?: string;
}

export enum QuestionType {
  zweiradio = 'zweiradio',
  vierradio = 'vierradio',
  liste = 'liste',
  radiostory = 'radiostory',
  zweibilder = 'zweibilder',
}
