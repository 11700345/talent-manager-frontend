import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { APICONFIG } from '../../config/api.config';
const APIURL = `${APICONFIG.routes.base}${APICONFIG.routes.auth}`;

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private authService: SocialAuthService) {}

    async login(): Promise<Observable<any>> {
        return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then(_ => {
                console.log('Getting token...');
                return this.getIdToken();
            })
            .then(token => {
                console.log(`token = ${token}`);
                return Promise.resolve(this.http.post(APIURL, token, {​​​​​observe: 'response'}));
            })
            .catch(err => {
                console.log(err);
                console.log('login rejected');
                return Promise.reject();
            });
    }

    async signOut(): Promise<any> {
        return this.authService.signOut()
            .then(_ => {
                return Promise.resolve(true);
            })
            .catch(err => {
                console.log(err);
                return Promise.reject(false);
            });
    }

    isLoggedIn(): boolean {
        const token: string = this.getIdToken();
        return token !== undefined;
    }

    getSocialUser(): SocialUser {
        let socialUser: SocialUser;
        this.authService.authState.subscribe(user => {
            socialUser = user;
        });
        return socialUser;
    }

    getIdToken(): string {
        let socialUser: SocialUser;
        this.authService.authState.subscribe(user => {
            socialUser = user;
        });

        return socialUser.idToken;
    }
}
