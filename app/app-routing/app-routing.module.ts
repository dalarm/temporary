import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from '../music/music.component';
import { HomeComponent } from '../home/home.component';
import { CodeComponent } from '../code/code.component';
import { Router } from '@angular/router/src/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },

    {
        path: 'music',
        component: MusicComponent,
    },
    
    { 
        path: 'music/code', 
        redirectTo: 'code', 
        pathMatch: 'full' 
    },
    
    {
        path: 'code',
        component: CodeComponent,
    },

    { 
        path: 'code/music', 
        redirectTo: 'music', 
        pathMatch: 'full' 
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
