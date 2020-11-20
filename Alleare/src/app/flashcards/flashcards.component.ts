import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { eventNames } from 'process';

let tmpcontent: string[] = [];
let tmpfieldnames: string[] = [];

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {
  ContentListe: string[] = [];
  Fieldnames: string[] = [];
  closeResult = ''; // Damit bei einem Click außerhalb des Popups, das Fenster geschlossen wird.
  Versicherungen: string[] = ["Berufsunfähigkeitsversicherung", "Hausratversicherung", "Kfz-Versicherung", "Rechtschutzversicherung", "Reiseversicherung", "Riester-Rente", "Risikolebensversicherung", "Tierhaftpflichtversicherung", "Wohngebäudeversicherung", "private Haftpflichtversicherung", "private Unfallversicherung"];

  constructor(private modalService: NgbModal) {
    var db = firebase.firestore();
    let data: string[] = [];
    firebase.firestore().collection("Flashcards")
      .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("Name: ", change.doc.data());
          }
          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });
      });

    //Fragen von der Datenbank abgreifen und umwandeln in ein String
    db.collection("Flashcards").doc("Versicherungen")
      .get().then(function (doc) {
        if (doc.exists) {
          tmpfieldnames = Object.keys(doc.data());
          data = tmpfieldnames;
          tmpcontent.push(doc.data().Berufsunfähigkeitsversicherung);
          tmpcontent.push(doc.data().Hausratsversicherung);
          tmpcontent.push(doc.data().Kfz_Versicherung);
          tmpcontent.push(doc.data().Rechtsschutzversicherung);
          tmpcontent.push(doc.data().Reiseversicherung);
          tmpcontent.push(doc.data().Riester_Rente);
          tmpcontent.push(doc.data().Risikolebensversicherung);
          tmpcontent.push(doc.data().Tierhaftpflichtversicherung);
          tmpcontent.push(doc.data().Wohngebäudeversicherung);
          tmpcontent.push(doc.data().private_Haftpflichtversicherung);
          tmpcontent.push(doc.data().private_Unfallversicherung);
        } else {
          console.log("No such document!")
        }
      }
      ).catch(function (error) {
        console.log("Error getting document:", error)
      });
    this.ContentListe = tmpcontent;
    this.Fieldnames = data;
  }

  //Hiermit stelle ich fest auf welches Button geklickt wurde und passe entsprechend den Inhalt des Popups an.
  intendedContent(event) {
    let title: string = event.target.id;
    document.getElementById("title").innerText = title;
    document.getElementById("content").innerText = this.ContentListe[this.Versicherungen.indexOf(title)];
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
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  ngOnInit(): void {
    const test = firebase.firestore().collection("Flashcards").doc("Versicherungen");
  }
}
