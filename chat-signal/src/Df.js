/* global BigInt */
var forge = require("node-forge");
var bits = 256;

class Df {
  constructor() {
    // this.secret = BigInt(Math.round(Math.random() * 1000));
    // this.g = BigInt(gen);
    // this.p = BigInt(prime);
    // this.key = null;
    this.secret = null;
    this.g = null;
    this.p = null;
    this.key = 0n;
    this.rounds = 0;
  }

  setG(newG) {
    this.g = BigInt(newG);
  }

  setP(newP) {
    this.p = BigInt(newP);
  }

  setRounds(n) {
    this.rounds = parseInt(n);
  }

  getRounds() {
    return this.rounds;
  }

  resetSecret() {
    this.secret = BigInt(Math.round(Math.random() * 1000));
  }

  compute() {
    return this.g ** this.secret % this.p;
  }
  computeSecret(gen) {
    let pubKey = BigInt(gen);
    this.key = BigInt(pubKey) ** BigInt(this.secret) % BigInt(this.p);
    return this.key;
  }
  getKey() {
    return this.key;
  }
}
export default Df;
// This is an example function, it shouldn't actually be used.
// This conjoins the opperations that need to be taekn on the server and the client
// function keyExchange() {
//   forge.prime.generateProbablePrime(bits, function(err, num) { // Server
//     console.log('random prime', num.toString(16));
//     console.log(typeof(num));
//     p = BigInt(num);
//     console.log(this.p);
//     let gen = 2; // Server
//     let a = new Df(gen, p); // Client A
//     let b = new Df(gen, p); // Client B

//     let aPublic = BigInt(a.compute()); // Client A
//     console.log(aPublic.toString(16));
//     let bPublic = BigInt(b.compute());// Client B
//     console.log(bPublic.toString(16));

//     let aSecret = a.computeSecret(bPublic); // Client A
//     console.log(aSecret.toString(16));
//     let bSecret = b.computeSecret(aPublic);// Client B
//     console.log(bSecret.toString(16));
//   });

// }

// function keyExchangeMulty() {
//   forge.prime.generateProbablePrime(bits, function(err, num) { // Server
//     console.log('random prime', num.toString(16));
//     console.log(typeof(num));
//     p = BigInt(num);
//     console.log(this.p);
//     let gen = 2; // Server
//     let Client = Array(5);
//     let publicKeys = Array(5);
//     let secretKeys = Array(5);

//     for(c = 0; c<Client.length; c++) {
//       Client[c] = new Df(gen,p);
//       publicKeys[c] = Client[c].compute();
//     }

//     for( round = 0; round < Client.length-1; round++){
//       for(c = 0; c<Client.length; c++) {
//         let right = c-1;
//         if(right < 0) right = Client.length-1;
//         secretKeys[c] = Client[c].computeSecret(publicKeys[right]);
//       }
//       publicKeys = [...secretKeys];
//     }
//     console.log(secretKeys);
//   });

// }

// keyExchangeMulty();
