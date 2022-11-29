export interface Node {
    name: string
    description: string
    components?: Node[]
};

export interface Segment extends Node {
    required: boolean
    repeatable: boolean
}

export interface Field extends Node {
    dataType: any
    length: number
    required: boolean
    repeatable?: boolean
    components?: Field[]
}

export interface ITranslator {
    fromHL7: (text: string) => any
    toHL7: (msg: any) => string
}

export interface Message {
    control: MessageControl
}

export interface MessageControl {
    fieldSeparator: string
    componentSeparator: string
    repetitionSeparator: string
    escapeCharacter: string
    subcomponentSeparator: string
    messageCode: string
    triggerEvent: string
    processingId: string
    processingMode: string
    versionId: string
}
