import { BaseError } from './base.error';

type ErrorName = 'PARSER_ERROR' | 'INVALID_SEGMENT' | 'INVALID_FIELD';

export class ParserError extends BaseError<ErrorName> { };
