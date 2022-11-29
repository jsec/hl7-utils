export default class FhirClient {
    private readonly _url: string;

    constructor(url: string) {
        this._url = url;
    }

    public send(): void {
        console.log('send messages here');
    }
}
