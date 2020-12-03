import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { CourseComponent, CertificateComponent, DegreeComponent } from './components/forms/education';
import { LanguageComponent, SoftSkillsComponent } from './components/forms/additional-skills';
import { BioComponent, GeneralInfoComponent, LocationInfoComponent } from './components/forms/personal-information';
import { LinkComponent } from './components/forms/personal-information/link/link.component';
import { CustomerOverviewComponent } from './components/customer-overview/customer-overview.component';
import { CreateCustomerComponent } from './components/forms/customer-project/create-customer/create-customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wizard', component: WizardComponent },

  { path: 'education/courses', component: CourseComponent },
  { path: 'education/certificates', component: CertificateComponent },
  { path: 'education/degrees', component: DegreeComponent },

  { path: 'skills/languages', component: LanguageComponent },
  { path: 'skills/softskills', component: SoftSkillsComponent },

  { path: 'personal/bio', component: BioComponent },
  { path: 'personal/general', component: GeneralInfoComponent },
  { path: 'personal/location', component: LocationInfoComponent },
  { path: 'personal/links', component: LinkComponent},

  { path: 'customers', component: CustomerOverviewComponent},
  { path: 'customer/:uuid', component: CustomerDetailComponent },
  { path: 'createcustomer', component: CreateCustomerComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
