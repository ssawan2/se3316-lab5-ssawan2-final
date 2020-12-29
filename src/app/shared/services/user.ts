export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    admin : boolean;
    siteManager : boolean;
    active: boolean;
 }