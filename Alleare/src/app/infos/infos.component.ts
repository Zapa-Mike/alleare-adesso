import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flashcards',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css'],
})
export class InfosComponent implements OnInit {
  ContentListe: string[] = [];
  Fieldnames = [];
  dbget= firebase.firestore().collection('Flashcards');
  closeResult = ''; // Damit bei einem Click außerhalb des Popups, das Fenster geschlossen wird.
  Versicherungen = [];
  allgemein1: boolean = true;
  favorisiert1: boolean = false;
  Versicherungenfav: any[] = [];

  constructor(private modalService: NgbModal) {

    this.dbget
    .get()
    .then((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        this.Versicherungen.push(doc.data().name);
        this.ContentListe.push(doc.data().info);
      });
    });
    console.log(this.Versicherungen)
  }
 
  //Hiermit stelle ich fest auf welches Button geklickt wurde und passe entsprechend den Inhalt des Popups an.
  intendedContent(event) {
    let title: string = event.target.id;
    document.getElementById('title').innerText = title;
    document.getElementById('content').innerText = this.ContentListe[
      this.Versicherungen.indexOf(title)
    ];
  }
  changeImg(event) {
    let a: string = event.target.id;
    let element: HTMLImageElement;
    element = <HTMLImageElement>document.getElementById(a);
    console.log(element.src);
    if (element.src.endsWith('/assets/icons/icon_favorite_star_empty.svg'))
      element.src = '/assets/icons/icon_favorite_star.svg';
    else element.src = '/assets/icons/icon_favorite_star_empty.svg';
  }
  //Bedingungen zum schließen des Popupfensters
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Öffnet das Popupfenster
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  allgemein() {
    this.favorisiert1 = false;
    this.allgemein1 = true;
  }
  favorisiert() {
    this.allgemein1 = false;
    this.favorisiert1 = true;
  }
  ngOnInit(): void {
    this.dbget
      .where('Favorisierung', '==', true)
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.Versicherungenfav.push(doc.id);
        });
      });
  }
}


