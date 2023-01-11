export interface Delimiters {
    field: string
    component: string
    repetition: string
    escape: string
    subComponent: string
}

export interface Node {
    name: string
    value: NodeValue
}

export interface Message {
    id: string // MSH.10
    delimiters: Delimiters // MSH.1 and MSH.2
    sender?: { // MSH.3 and MSH.4
        application: string
        facility: string
    }
    receiver?: { // MSH.5 and MSH.6
        application: string
        facility: string
    }
    timestamp: string // MSH.7
    security?: string
    type: { // mSH.9
        code: string // TODO: these should be in a lookup
        event: string
        structure: string
    }
    processing: { // MSH.11
        id: string // TODO: these should be in a lookup
        code: string
    }
    version: string // MSH.12
    segments: Node[]

}

export type NodeValue = string | null | Node[] | string[];
