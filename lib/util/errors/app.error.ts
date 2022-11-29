export class AppError extends Error {
    public readonly name: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
