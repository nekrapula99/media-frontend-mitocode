import { Component, Inject, OnInit } from '@angular/core';
import { Signs } from '../../../model/signs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignsService } from '../../../services/signs.service';
import { Observable, map, switchMap } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Patient } from '../../../model/patient';
import { PatientService } from '../../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signs-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, NgIf, AsyncPipe],
  templateUrl: './signs-dialog.component.html',
  styleUrl: './signs-dialog.component.css'
})
export class SignsDialogComponent implements OnInit{

  formGroup: FormGroup;
  patients: Patient[];
  patientSelected: Patient[] = [];
  minDate: Date = new Date();


  signs: Signs;

  patientControl: FormControl = new FormControl();
  dateControl: FormControl = new FormControl();
  patientsFiltered$: Observable<Patient[]>

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Signs,
    private dialogRef: MatDialogRef<SignsDialogComponent>,
    private signsService: SignsService,
    private patientService: PatientService,
    private _snackBar : MatSnackBar
  ){}

  ngOnInit(): void {

    this.signs = {... this.data};
    this.patientControl.setValue(this.signs.patient);
    this.dateControl.setValue(this.signs.date);

    this.patientService.findAll().subscribe((data) => (this.patients = data));
    this.patientsFiltered$ = this.patientControl.valueChanges.pipe(map(val => this.filterPatients(val)))
  }

  filterPatients(val: any){
    if(val?.idPatient > 0){
      return this.patients.filter(el => 
        el.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || el.lastName.toLowerCase().includes(val.lastName.toLowerCase())
      );
    }else{
      return this.patients.filter(el => 
        el.firstName.toLowerCase().includes(val?.toLowerCase()) || el.lastName.toLowerCase().includes(val?.toLowerCase())
      );
    } 
  }

  operate(){
      //UPDATE
    if(this.signs != null && this.signs.idSign > 0){
      const tmpPatient = this.patientControl.value;

      if(tmpPatient != null){
        this.patientSelected.push(tmpPatient);
        this.signs.patient.idPatient = tmpPatient.idPatient;
      }else{
        this._snackBar.open('Please select a Patient', 'INFO', {duration: 2000})
      }

      const tmpDate = this.dateControl.value;

      if(tmpDate != null){
        this.signs.date = tmpDate;
      }else{
        this._snackBar.open('Please select a Date', 'INFO', {duration: 2000})
      }

      this.signsService.update(this.signs.idSign, this.signs)
      .pipe(switchMap(()=> this.signsService.findAll()))
      .subscribe(data => {
        this.signsService.setSignsChange(data);
        this.signsService.setMessageChange('UPDATED!');
      });
    }else{
      //INSERT

      const tmpPatient = this.patientControl.value;
      console.log('tmpPatient', tmpPatient);
      if(tmpPatient != null){
        this.patientSelected.push(tmpPatient);
        this.signs.patient = tmpPatient;
        console.log('this.signs', this.signs);
      }else{
        this._snackBar.open('Please select a Patient', 'INFO', {duration: 2000})
      }
      const tmpDate = this.dateControl.value;

      if(tmpDate != null){
        this.signs.date = tmpDate;
      }else{
        this._snackBar.open('Please select a Date', 'INFO', {duration: 2000})
      }

      this.signsService.save( this.signs)
      .pipe(switchMap(()=> this.signsService.findAll()))
      .subscribe(data => {
        this.signsService.setSignsChange(data);
        this.signsService.setMessageChange('CREATED!');
      });
      
    }
    this.close();
  }

  showPatient(val: any){
    return val ? `${val.firstName} ${val.lastName}` : val;
  }

  getDate(e: any) {
   // console.log(e);
  }

  close(){
    this.dialogRef.close();
  }

}