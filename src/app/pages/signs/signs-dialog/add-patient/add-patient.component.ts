import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../../services/patient.service';
import { Patient } from '../../../../model/patient';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { SignsDialogComponent } from '../signs-dialog.component';
import { SignsService } from '../../../../services/signs.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [MaterialModule,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent implements OnInit{

  form:FormGroup;
  id: number;
  isEdit: boolean;

  patient: Patient;

  @ViewChild(SignsDialogComponent) signsDialogComponent: SignsDialogComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Patient,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    private patientService: PatientService,
    private signsService: SignsService,
     private router: Router,){}

     ngOnInit(): void {
      this.patient = {... this.data};
    }

    operate(){

      this.patientService.save( this.patient)
      .pipe(switchMap(()=> this.patientService.findAll()))
      .subscribe(data => {
        this.patientService.setPatientChange(data);
        this.patientService.setMessageChange('CREATED!');

        this.signsService.setPatientsFilteredChange(data);

      });
      this.close();
    }

    close(){
      this.dialogRef.close();
    }

}
