import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient){ }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<boolean>
    {

        if(credentials.email === 'hughes.brian@company.com' && credentials.password ==='admin'){
            this._authenticated = true;
            localStorage.setItem('token', 'fadfadfdf6565');
            return of(true);
        }else{
            this._authenticated = false;
            throwError('User is already logged in.');
            return of(false);
        }

        // return this._httpClient.post('api/auth/sign-in', credentials).pipe(
        //     switchMap((response: any) => {

        //         // Store the access token in the local storage
        //         this.accessToken = response.accessToken;

        //         // Set the authenticated flag to true
        //         this._authenticated = true;

        //         // Store the user on the user service
        //         this._userService.user = response.user;

        //         // Return a new observable with the response
        //         return of(response);
        //     })
        // );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {

        return of(true);

    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        localStorage.removeItem('token');
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(false);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if (localStorage.getItem('token'))
        {
            this._authenticated = true;
            return of(true);
        }
        this._authenticated = false;
        return of(false);

    }
}
