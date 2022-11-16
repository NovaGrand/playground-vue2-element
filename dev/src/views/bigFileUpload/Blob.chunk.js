
Blob.prototype.chunk = function(size){
    let amount = this.size % size === 0 ? this.size / size : Math.ceil(this.size / size)
    let byteStart = 0
    let chunks = []
    for (let i = 0;i < amount;i++) {
        let byteEnd = byteStart + size
        let chunk = this.slice(byteStart, byteEnd)
        chunk.BBB='BBB'
        chunks.push(chunk)
        byteStart += (byteEnd - byteStart)
    }
    return chunks
}