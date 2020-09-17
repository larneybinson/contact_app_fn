import { Injectable } from '@angular/core';
// import * as crypto from 'crypto';

export interface Connection {
    connections: any[];
    nextPageToken?: string;
    totalPeople?: number;
    totalItems?: number;
}

export enum ResponseStatus {
    Success = 'success',
    Failed = 'failed'
}

export interface Response {
    status: ResponseStatus;
    message: string;
    data: any;
}

@Injectable()
export class AppService {
    constructor() {
    }

    private isLoggedIn = true;
    private userId = '';

    saveUserId(userId): void {
        this.userId = userId;
    }

    getUserId(): string {
        return this.userId;
    }

    setLoginStatus(value: boolean): void {
        this.isLoggedIn = value;
    }

    getLoginSatus(): boolean {
        return this.isLoggedIn;
    }

    decryptToken(token) {
        // return crypto.publicDecrypt("", token).toString()
    }
}
