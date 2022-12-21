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

export type NodeValue = string | null | Node[] | string[];
