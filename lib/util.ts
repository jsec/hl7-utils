function normalizeLineEndings(text: string): string {
    return text.replace(/\r\n/g, '\n');
}

export {
    normalizeLineEndings
};
