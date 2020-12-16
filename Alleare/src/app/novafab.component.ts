import { Component,} from '@angular/core';

@Component({
  selector: 'novafav-btn',
  template: `
<div>
  <button mat-fab class="float-btn" routerLink="/nova">
    <img src="/assets/nova/nova_intro_rechts.png" height="60vw" width="60vw">
  </button>
</div>
  `,
  styles: [
      `
      .float-btn{
          background:transparent;
          width:20vw;
          height:20vw;
          position:fixed;
          box-shadow:none;
          right:25px;
          bottom:55px;
          z-index:3;
          display:flex;
          align-items:center;
          justify-content:center;
          border:transparent;
      }
      `
  ],
})
export class novafabComponent{


}
