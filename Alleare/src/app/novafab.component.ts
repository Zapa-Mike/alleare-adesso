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
          width:auto;
          height:auto;
          position:fixed;
          box-shadow:none;
          right:10vw;
          bottom:61px;
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
