import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Cidade } from 'app/models/cidade';
import { Endereco } from 'app/models/endereco';
import { Escolaridade } from 'app/models/escolaridade';
import { Estado } from 'app/models/estado';
import { Genero } from 'app/models/genero';
import { Individuo } from 'app/models/individuo';
import { Raca } from 'app/models/raca';
import { Documento } from 'app/models/documento';
import { PagesService } from 'app/pages/pages.service';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { ListIndividuosComponent } from '../list-individuos/list-individuos.component';
import { Sexo } from 'app/models/sexo';
import { Identificador } from 'app/models/identificador';
import { Telefone } from 'app/models/telefone';
import { TipoDocumento } from 'app/models/tipoDocumento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-individuos-details',
  templateUrl: './individuos-details.component.html',
  styleUrls: ['./individuos-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividuosDetailsComponent implements OnInit, OnDestroy {

  @Input() individuoForm: FormGroup;
  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
  @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
  @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;


  editMode: boolean = false;
  saving: boolean = false;
  individuo: Individuo;
  individuos: Individuo[];
  documentos$: Observable<Documento[]>;
  sexos$: Observable<Sexo[]>;
  cidades$: Observable<Cidade[]>;
  estados$: Observable<Estado[]>;
  escolaridades$: Observable<Escolaridade[]>;
  racas$: Observable<Raca[]>;
  generos$: Observable<Genero[]>;
  matcher = new MyErrorStateMatcher();
  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _individuosListComponent: ListIndividuosComponent,
    private _formBuilder: FormBuilder,
    public _snackBar: MatSnackBar,
    private _renderer2: Renderer2,
    private _overlay: Overlay,
    private _router: Router,
    private _viewContainerRef: ViewContainerRef,
    private pageService: PagesService) {

    this.cidades$ = this.pageService.getCidadas();
    this.sexos$ = this.pageService.getListaSexos();
    this.generos$ = this.pageService.getListaGeneros();
    this.racas$ = this.pageService.getListaRacas();
    this.escolaridades$ = this.pageService.getListaEscolaridades();
    this.documentos$ = this.pageService.getListaDocumentos();
  }

  ngOnInit() {

    // Open the drawer
    this._individuosListComponent.matDrawer.open();

    // Create the individuo form
    this.createIndividuoForm();

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    // Dispose the overlays if they are still on the DOM
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }
  createIndividuoForm() {

    this.individuoForm = this._formBuilder.group({
      indNome: new FormControl([''], [Validators.required, Validators.minLength(15)]),
      indEmail: new FormControl([''], [Validators.required, Validators.email]),
      telefones: this._formBuilder.array([this.createTelefoneForms()]),
      dataNascimento: new FormControl({ value: [''], disabled: true }, [Validators.required]),
      enderecos: this._formBuilder.array([this.createEnderecosForms()]),
      sexo: new FormControl([''], [Validators.required]),
      raca: new FormControl([''], [Validators.required]),
      escolaridade: new FormControl([''], [Validators.required]),
      genero: new FormControl([''], [Validators.required]),
      documentos: this._formBuilder.array([this.createDocForms()]),
      identificadores: this._formBuilder.array([this.createIdentificadoresForms()]),
    });
  }

  createDocForms() {
    return new FormGroup({
      tipoDocId: new FormControl('', Validators.required),
      indDocNumero: new FormControl('', Validators.required)
    });
  }

  createIdentificadoresForms() {
    return new FormGroup({
      identificador: new FormControl('', Validators.required)
    });
  }

  createTelefoneForms() {
    return new FormGroup({
      telefone: new FormControl('', Validators.required)
    });
  }

  createEnderecosForms() {
    return new FormGroup({
      logradouro: new FormControl([''], Validators.required),
      cep: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)

    });
  }


  get telefonesControls() {
    return (this.individuoForm.get('telefones') as FormArray).controls;
  }

  get identificadoresControls() {
    return (this.individuoForm.get('identificadores') as FormArray).controls;
  }

  get individuoControlsForm(): { [key: string]: AbstractControl } {
    return this.individuoForm.controls;
  }

  get enderecosControls() {
    return (this.individuoForm.get('enderecos') as FormArray).controls;
  }

  get documentosControls() {
    return (this.individuoForm.get('documentos') as FormArray).controls;
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Close the drawer
   */
  async closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._individuosListComponent.matDrawer.close();
  }

  /**
   * Toggle edit mode
   *
   * @param editMode
   */
  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    }
    else {
      this.editMode = editMode;
    }
    this.closeDrawer();

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }



  /**
   * Open tags panel
   */
  openTagsPanel(): void {
    // Create the overlay
    this._tagsPanelOverlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
        .withFlexibleDimensions(true)
        .withViewportMargin(64)
        .withLockedPosition(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          }
        ])
    });

    // Subscribe to the attachments observable
    this._tagsPanelOverlayRef.attachments().subscribe(() => {

      // Add a class to the origin
      this._renderer2.addClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

      // Focus to the search input once the overlay has been attached
      this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
    });

    // Create a portal from the template
    const templatePortal = new TemplatePortal(this._tagsPanel, this._viewContainerRef);

    // Attach the portal to the overlay
    this._tagsPanelOverlayRef.attach(templatePortal);

    // Subscribe to the backdrop click
    this._tagsPanelOverlayRef.backdropClick().subscribe(() => {

      // Remove the class from the origin
      this._renderer2.removeClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

      // If overlay exists and attached...
      if (this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached()) {
        // Detach it
        this._tagsPanelOverlayRef.detach();

      }

      // If template portal exists and attached...
      if (templatePortal && templatePortal.isAttached) {
        // Detach it
        templatePortal.detach();
      }
    });
  }

  addEnderecoField(): void {

    const addressFormGroup = this._formBuilder.group({ logradouro: [''], cep: [''], bairro: [''], cidade: [''], estado: [''] });

    (this.individuoForm.get('enderecos') as FormArray).push(addressFormGroup);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }


  removeEnderecoField(index: number): void {

    // Get form array for address
    const addressFormArray = this.individuoForm.get('enderecos') as FormArray;

    // Remove the address number field
    addressFormArray.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Add an empty phone number field
   */
  addTelefoneField(): void {
    // Create an empty phone number form group
    const phoneNumberFormGroup = this._formBuilder.group({ telefone: [''] });

    // Add the phone number form group to the phoneNumbers form array
    (this.individuoForm.get('telefones') as FormArray).push(phoneNumberFormGroup);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove the phone number field
   *
   * @param index
   */
  removeTelefoneField(index: number): void {
    // Get form array for phone
    const phoneNumbersFormArray = this.individuoForm.get('telefones') as FormArray;

    // Remove the phone number field
    phoneNumbersFormArray.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  addIdentificadorField() {
    const identificadoresFormGroup = this._formBuilder.group({ identificador: new FormControl('', Validators.required) });

    (this.individuoForm.get('identificadores') as FormArray).push(identificadoresFormGroup);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  removeIdentificadorField(index: number): void {

    // Get form array for identificador
    const identificadoresFormGroup = this.individuoForm.get('identificadores') as FormArray;

    // Remove the Identificador field
    identificadoresFormGroup.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();

  }

  addDocumentoField() {
    const tiposDocumentosFormGroup = this._formBuilder.group({
      tipoDocumento: new FormControl('', Validators.required),
      indDocNumero: new FormControl('', Validators.required)
    });

    (this.individuoForm.get('documentos') as FormArray).push(tiposDocumentosFormGroup);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  removeDocumentoField(index: number): void {
    // Get form array for identificador
    const tiposDocumentosFormGroup = this.individuoForm.get('documentos') as FormArray;

    // Remove the Identificador field
    tiposDocumentosFormGroup.removeAt(index);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }


  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  get enderecos(): FormArray {
    return this.individuoForm.get('enderecos') as FormArray;
  }

  get documentos(): FormArray {
    return this.individuoForm.get('documentos') as FormArray;
  }

  editAddressSubmit(enderecos): any {
    const estado = new Estado();
    const cidade = new Cidade();

    for (let i = 0; i < enderecos.length; i++) {
      if (enderecos.at(i).value.cidade) {
        cidade.recId = enderecos.at(i).value.cidade;
        enderecos.at(i).value.cidade = cidade;
      }
      if (enderecos.at(i).value.estado) {
        estado.recId = enderecos.at(i).value.estado;
        enderecos.at(i).value.estado = estado;
      }
      if (enderecos.at(i).value.cep) {
        enderecos.at(i).value.cep = parseInt(enderecos.at(i).value.cep, 10);
      }
    }
    return enderecos.value;
  }

  editDocumentoSubmit(documentos): any {
    const tipoDocumento = new TipoDocumento();

    for (let i = 0; i < documentos.length; i++) {
      if (documentos.at(i).value.tipoDocId) {
        tipoDocumento.recId = documentos.at(i).value.tipoDocId;
        documentos.at(i).value.tipoDocId = tipoDocumento;
      }
      if (documentos.at(i).value.indDocNumero) {
        documentos.at(i).value.indDocNumero = parseInt(documentos.at(i).value.indDocNumero, 10);
      }
    }
    return documentos.value;
  }

  editDateSubmit(dataNascimento): string {
    const formatedDate = moment(dataNascimento).format('L');
    return formatedDate;
  }

  editSexoSubmit(sexoInd): Sexo {
    const sexo = new Sexo();
    sexo.recId = sexoInd;
    return sexo;
  }

  editEscolaridadeSubmit(escolaridadeInd): Escolaridade {
    const escolaridade = new Escolaridade();
    escolaridade.recId = escolaridadeInd;
    return escolaridade;
  }

  editGeneroSubmit(generoInd): Genero {
    const genero = new Genero();
    genero.recId = generoInd;
    return genero;
  }

  editRacaSubmit(racaInd): Raca {
    const raca = new Raca();
    raca.recId = racaInd;
    return raca;
  }

  onSubmit() {
    if (this.individuoForm.valid) {

      this.individuoForm.value.dataNascimento = this.editDateSubmit(this.individuoForm.value.dataNascimento);
      this.individuoForm.value.enderecos = this.editAddressSubmit(this.enderecos);
      this.individuoForm.value.documentos = this.editDocumentoSubmit(this.documentos);
      this.individuoForm.value.sexo = this.editSexoSubmit(this.individuoForm.value.sexo);
      this.individuoForm.value.raca = this.editRacaSubmit(this.individuoForm.value.raca);
      this.individuoForm.value.genero = this.editGeneroSubmit(this.individuoForm.value.genero);
      this.individuoForm.value.escolaridade = this.editEscolaridadeSubmit(this.individuoForm.value.escolaridade);


      const indiv = new Individuo(this.individuoForm.value);
      this.saving = true;
      this.pageService
        .addIndividuo(indiv)
        .subscribe(
          () => {
            this.saving = false;
            this.closeDrawer();
            this._router.navigate(['/individuos']);
            this.individuoForm.reset();
            this._snackBar.open('Indivíduo Salvo com Sucesso!', '200', { duration: 4000 });
          },
          (error) => {
            this.saving = false;
            this.closeDrawer();
            this._router.navigate(['/individuos']);
            this.individuoForm.reset();
            this._snackBar.open(error.message, ' ' + error.status, { duration: 4000 });
          });

    }
  }
}
