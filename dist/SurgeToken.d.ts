export default class SurgeToken {
    private netrc;
    private machine;
    static create(): Promise<SurgeToken>;
    getToken(): string;
    getCredentials(): {
        login: string;
        password: string;
    };
    init(): Promise<void>;
}
