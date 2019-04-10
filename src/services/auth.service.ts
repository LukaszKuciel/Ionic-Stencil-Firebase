export class AuthService {
    name: string;

    constructor() {
        this.name = 'Lukasz';
    }

    hello() {
        return 'AuthService says hello';
    }
}

export const authSvc = new AuthService();