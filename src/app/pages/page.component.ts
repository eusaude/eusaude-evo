import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseVerticalNavigationAppearance, FuseVerticalNavigationMode, FuseNavigationItem, FuseVerticalNavigationPosition, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit, OnDestroy
{

  @Input() appearance: FuseVerticalNavigationAppearance;
  @Input() autoCollapse: boolean;
  @Input() inner: boolean;
  @Input() mode: FuseVerticalNavigationMode;
  @Input() name: string;
  @Input() navigation: FuseNavigationItem[];
  @Input() isScreenSmall: boolean;
  @Input() position: FuseVerticalNavigationPosition;
  @Input() transparentOverlay: boolean;
  navigationData: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    },
    {
        id      : 'cadastros',
        title   : 'Gestão de Cadastros',
        subtitle: '',
        type    : 'collapsable',
        icon    : 'heroicons_outline:database',
        children: [
            {
                id   : 'individuos',
                title: 'Indivíduos',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/individuos'
            }
        ]
    },
];

private _unsubscribeAll: Subject<any> = new Subject<any>();

    private isAuth = false;

    /**
     * Constructor
     */
    constructor(private _fuseNavigationService: FuseNavigationService,  private _authService: AuthService,
        private _router: Router){}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(){

      this._authService.check().subscribe((a) =>{
        this.isAuth = a;
    });

     }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    toAuth(): boolean {
       return this.isAuth;
    }

    updateUserStatus(status: string): void
    {

    }

    /**
     * Sign out
     */
    signOut(): void
    {
        this._router.navigate(['/sign-out']);
    }
  }
