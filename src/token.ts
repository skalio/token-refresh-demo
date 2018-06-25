import { Guid } from './guid';

export class Token {
    key: string;
    expires: Date;

    constructor() {
        this.refresh();
    }

    public isExpired(): boolean {
        return this.expires < new Date();
    }

    public getkey(): string {
        return this.key;
    }

    public refresh(): void {
        this.key = Guid.newGuid();
        this.expires = new Date( new Date().getTime() + 10000);
        console.log('Token refreshed, will expire on ', this.expires);
    }
}