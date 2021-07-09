const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previoushHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    proofOfWork(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()            
        }
    }

    mineBlock(difficulty) {

    }

}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesis()]
        this.difficulty = 4;
    }

    createGenesis() {
        return new Block(0, new Date().getDay, "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.proofOfWork(this.difficulty)
        this.chain.push(newBlock);
    }


    checkValidity() {
        for (let i = 1; i < this.chain.length; i++) {

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }


        }

        return true
    }


}
let time  = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}:${new Date().getDay()}:${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}}`
let docsChain = new BlockChain()

docsChain.addBlock(
    new Block(
        1,
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}:${new Date().getDay()}:${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}}`,
        {
            "name": "thesis.docx",
            "size": "12mb",
            "owner": "agoo clinton",
            "institution": "Rongo University"
        },
    ),
)
docsChain.addBlock(
    new Block(
        1,
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}:${new Date().getDay()}:${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}}`,
        {
            "name": "thesis.docx",
            "size": "12mb",
            "owner": "agoo clinton",
            "institution": "Rongo University"
        },
    ),
)

console.log(JSON.stringify(docsChain, null, 4))


console.log("Is blockchain valid? " + docsChain.checkValidity());
