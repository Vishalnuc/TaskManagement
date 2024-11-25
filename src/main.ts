import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TaskManagementComponent } from './app/TaskManagement/taskmanagement/taskmanagement.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {providers: [provideHttpClient()]})
  .catch((err) => console.error(err));

bootstrapApplication(TaskManagementComponent,{providers: [provideHttpClient()]})
.catch((err) => console.error(err));
