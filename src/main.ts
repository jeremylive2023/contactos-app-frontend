import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { routes } from './app/app-routing.module'; // Ensure this path is correct

// Bootstrap the Angular application
bootstrapApplication(AppComponent, {
  providers: [
    // Import RouterModule and HttpClientModule
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule
    )
  ]
}).catch(err => console.error('Error bootstrapping the application', err));
