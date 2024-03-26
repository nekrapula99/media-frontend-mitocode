import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../../model/medic';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MedicService } from '../../../services/medic.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medic-dialog',
  standalone: true,
  imports: [MaterialModule,FormsModule, NgIf],
  templateUrl: './medic-dialog.component.html',
  styleUrl: './medic-dialog.component.css'
})
export class MedicDialogComponent implements OnInit{

  medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private dialogRef: MatDialogRef<MedicDialogComponent>,
    private medicService: MedicService
  ){}

  ngOnInit(): void {
    this.medic = {... this.data};
  }

  operate(){
    if(this.medic != null && this.medic.idMedic > 0){
      //UPDATE
      this.medicService.update(this.medic.idMedic, this.medic)
      .pipe(switchMap(()=> this.medicService.findAll()))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('UPDATED!');
      });
    }else{
      //INSERT
      this.medicService.save( this.medic)
      .pipe(switchMap(()=> this.medicService.findAll()))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('CREATED!');
      });
      
    }
    this.close();
  }

  close(){
    this.dialogRef.close();
  }

}
