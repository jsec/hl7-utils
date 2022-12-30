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
    version: string // MSH.12
    timestamp: string // MSH.7
    processing: { // MSH.11
        id: string
        code: string
    }
    segments: Node[]

}

export type NodeValue = string | null | Node[] | string[];
