export default class SurgeToken {
    private netrc;
    private machine;
    static create(): Promise<SurgeToken>;
    getAuthToken(): string;
    getCredentials(): {
        login: string;
        password: string;
    };
    init(): Promise<void>;
}
