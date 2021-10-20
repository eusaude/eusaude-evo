import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-individuos',
  templateUrl: './list-individuos.component.html',
  styleUrls: ['./list-individuos.component.scss']
})
export class ListIndividuosComponent implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

  contactsCount: number = 10;
  individuos: any[] =  [];
  drawerMode: 'side' | 'over';
  searchInputControl: FormControl = new FormControl();
 individuo = {
    id: '56655dad',
    nome: 'Joao',
    email:'jaoao@gmail.com',
    dataNascimento: new Date('10/04/1990'),
    telefone: [5555555, 55556666],
    sexo: 'masculino',
    raca: 'parda',
    genero: 'heteroxesual',
    escolaridade:'2º completo',
    identificador: '4556659',
    tipoDocumento:'cpf',
    numeroDocumento:56669996,
    endereco:[{
      logradouro: 'Rua Americana, 56',
      bairro:'Jose de Almeira',
      cep: 5633562,
      cidade:' Nova Lima',
      estado:'Minas Gerais'
    }]

  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
    private _fuseMediaWatcherService: FuseMediaWatcherService
)
{
}

  ngOnInit(){
    this.individuos.push(this.individuo);

         // Subscribe to MatDrawer opened change
         this.matDrawer.openedChange.subscribe((opened) => {
          if ( !opened )
          {
              // Remove the selected contact when drawer closed

              // Mark for check
              this._changeDetectorRef.markForCheck();
          }
      });

       // Subscribe to media changes
       this._fuseMediaWatcherService.onMediaChange$
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe(({matchingAliases}) => {

           // Set the drawerMode if the given breakpoint is active
           if ( matchingAliases.includes('lg') )
           {
               this.drawerMode = 'side';
           }
           else
           {
               this.drawerMode = 'over';
           }

           // Mark for check
           this._changeDetectorRef.markForCheck();
       });

   // Listen for shortcuts
   fromEvent(this._document, 'keydown')
       .pipe(
           takeUntil(this._unsubscribeAll),
           filter<KeyboardEvent>(event =>
               (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
               && (event.key === '/') // '/'
           )
       )
       .subscribe(() => {
           this.createIndividuo();
       });
  }

  onBackdropClicked(){
    return null;
  }

  createIndividuo(){

      this._router.navigate(['./add'], {relativeTo: this._activatedRoute});

      // Mark for check
      this._changeDetectorRef.markForCheck();
  }


}
