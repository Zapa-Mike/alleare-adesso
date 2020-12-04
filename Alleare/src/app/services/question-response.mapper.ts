import { Injectable } from '@angular/core';
import {
  QuestionResponse,
  QuestionType,
} from '../questions/stories/models/story-models.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionResponseMapper {
  constructor() {}
  public mapToQuestionResponse(data: any): QuestionResponse {
    switch (this.resolveType(data.type)) {
      case QuestionType.radiostory:
        return this.mapToRadioHistory(data);

      case QuestionType.liste:
        return this.mapToListe(data);

      case QuestionType.zweiradio:
        return this.mapToZweiRadio(data);

      case QuestionType.zweibilder:
        return this.mapToZweiBilder(data);

      case QuestionType.vierradio:
        return this.mapToVierradio(data);
    }
  }
  private mapToRadioHistory(data: any): QuestionResponse {
    return {
      frage: data.frage,
      type: data.type,
      bild: data.bild ? data.bild : undefined,
      story: data.story,
      versicherung: data.versicherung ? data.versicherung : undefined,
    };
  }
  private mapToListe(data: any): QuestionResponse {
    {
      return {
        frage: data.frage,
        type: data.type,
        versicherung: data.versicherung ? data.versicherung : undefined,
      };
    }
  }
  private mapToZweiRadio(data: any): QuestionResponse {
    return {
      frage: data.frage,
      type: data.type,
      bild: data.bild,
      versicherung: data.versicherung ? data.versicherung : undefined,
    };
  }
  private mapToZweiBilder(data: any): QuestionResponse {
    return {
      frage: data.frage,
      type: data.type,
      bild1: data.bild,
      bild2: data.bild2,
      antwort1: data.antwort1,
      antwort2: data.antwort2,
      versicherung: data.versicherung ? data.versicherung : undefined,
    };
  }
  private mapToVierradio(data: any): QuestionResponse {
    return {
      frage: data.frage,
      type: data.type,
      antwort1: data.antwort1,
      antwort2: data.antwort2,
      antwort3: data.antwort1,
      antwort4: data.antwort2,
      bild: data.bild ? data.bild : undefined,
      versicherung: data.versicherung ? data.versicherung : undefined,
    };
  }

  private resolveType(type: string): QuestionType {
    return QuestionType[type];
  }
}
