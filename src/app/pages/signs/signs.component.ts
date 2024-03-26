import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Signs } from '../../model/signs';
import { PatientService } from '../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from '../../model/patient';
import { MaterialModule } from '../../material/material.module';
import { SignsService } from '../../services/signs.service';
import { switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SignsDialogComponent } from './signs-dialog/signs-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-signs',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './signs.component.html',
  styleUrl: './signs.component.css'
})
export class SignsComponent implements OnInit{

  displayedColumns: string[] = ['idSign', 'patient', 'temperature', 'pulse', 'heartRate','date','actions'];
  dataSource: MatTableDataSource<Signs>;
  patients: Patient[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private signsService: SignsService,
    private _dialog: MatDialog,
    private patientService: PatientService,
     private _snackBar: MatSnackBar){}

  ngOnInit(): void {

    this.signsService.findAll().subscribe((data) => {
      this.createTable(data);
    });

    this.signsService.getSignsChange().subscribe(data =>{
      this.createTable(data);
    });

    this.signsService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', { duration: 2000 });
    });

    this.patientService.findAll().subscribe((data) => (this.patients = data));
  }


  createTable(data: Signs[]){
    this.dataSource = new MatTableDataSource(data);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(signs?: Signs){

    this._dialog.open(SignsDialogComponent,{
      width: '350px',
      data: signs,
      disableClose: false
    } )

  }

  delete(idSign: number){
    this.signsService.delete(idSign)
    .pipe(switchMap(() => this.signsService.findAll())
    ).subscribe((data) => {
      this.signsService.setSignsChange(data);
      this.signsService.setMessageChange('DELETED!');
    });
  }

}
