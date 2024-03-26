import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from "./pages/patient/patient.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PatientComponent]
})
export class AppComponent {
  title = 'mediapp-frontend';
}
