import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-flashcards',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css'],
})
export class InfosComponent implements OnInit{
  toggleGeneral = true;
  toggleFavored = true;
  ContentListe: string[] = [];
  Fieldnames = [];
  dbget = firebase.firestore().collection('Flashcards');
  dbget2 = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'))
    .collection('Versicherungen');
  db2 = firebase
    .firestore()
    .collection('Benutzer')
    .doc(localStorage.getItem('hans'));
  closeResult = ''; // Damit bei einem Click außerhalb des Popups, das Fenster geschlossen wird.
  Versicherungen = [];
  VersicherungenOhneFav = [];
  allgemein1: boolean = true;
  favorisiert1: boolean = false;
  Versicherungenfav: string[] = new Array();
  evaluationfav:any;

  constructor(private dataservice:DataService ,private modalService: NgbModal) {
    this.dbget.get().then((querysnapshot) => {
      querysnapshot.forEach((doc) => {
        this.Versicherungen.push(doc.data().name);
        this.ContentListe.push(doc.data().info);
      });
    });
    this.evaluationfav=this.dataservice.getfav();
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
    let versicherung: string = event.target.id;
    this.db2.collection('Versicherungen').doc(versicherung).set({
      Favorisierung: true,
    });
    if (this.Versicherungenfav.includes(versicherung)) {
      this.VersicherungenOhneFav.push(versicherung);
      let temp1: string[] = [];
      let temp = temp1.concat(this.Versicherungenfav);
      this.Versicherungenfav.splice(0);
      this.db2.collection('Versicherungen').doc(versicherung).set({
        Favorisierung: false,
      });
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] != versicherung) this.Versicherungenfav.push(temp[i]);
      }
    } else {
      this.Versicherungenfav.push(versicherung);
      this.VersicherungenOhneFav.splice(0);
      for (let i = 0; i < this.Versicherungen.length; i++) {
        if (!this.Versicherungenfav.includes(this.Versicherungen[i]))
          this.VersicherungenOhneFav.push(this.Versicherungen[i]);
      }
    }
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
  ngOnInit() {
    this.dbget2
      .where('Favorisierung', '==', true)
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          this.Versicherungenfav.push(doc.id);
        });
        for (let i = 0; i < this.Versicherungen.length; i++) {
          if (!this.Versicherungenfav.includes(this.Versicherungen[i]))
            this.VersicherungenOhneFav.push(this.Versicherungen[i]);
        }
      });
      if(this.evaluationfav==true){// Wenn man von der Evaluation zum Favorisierten Bereich kommen möchte
        this.favorisiert();
        this.dataservice.setfav(false);
      }
  }
  toggleAllgemein() {
    this.toggleGeneral = !this.toggleGeneral;
  }
  toggleFavorisiert() {
    this.toggleFavored = !this.toggleFavored;
  }
}
