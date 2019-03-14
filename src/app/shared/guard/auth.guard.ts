import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Keys} from '../common/keys'
import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        const tokenUser = localStorage.getItem(Keys.KEY_USER_INFO);
        console.log( tokenUser);
        if (tokenUser) {
            let userInfo = JSON.parse(tokenUser);
            console.log(moment());
            console.log(moment(userInfo.expires_date));
            if(moment().isBefore(moment(userInfo.expires_date))){
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}
