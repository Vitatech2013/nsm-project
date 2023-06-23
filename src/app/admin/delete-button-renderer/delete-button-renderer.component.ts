import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-delete-button-renderer',
  // template: `
  // // <button type="button" (click)="onClick($event)">{{label}}</button>
  
  // // `
  templateUrl: './delete-button-renderer.component.html',
  styleUrls: ['./delete-button-renderer.component.css']
})
export class DeleteButtonRendererComponent implements  ICellRendererAngularComp{

  params;
  label: string;
 private router:Router
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    console.log($event);
    
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      console.log(params);
      
      this.params.onClick(this.params);
      
    }
  }

}
