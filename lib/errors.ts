class AppError extends Error {
    public readonly name: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ParserError extends AppError {
    public readonly node: string;

    constructor(node: string, message: string) {
        super(message);
        this.node = node;
    }
}

export {
    AppError,
    ParserError
};
