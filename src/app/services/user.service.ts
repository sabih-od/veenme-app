import { Injectable } from '@angular/core';
import { StorageService } from './basic/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(public storage: StorageService) { }

    setToken(token) {
        return this.storage.set('token', token);
    }

    getToken() {
        return this.storage.get('token');
    }
}
