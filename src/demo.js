const docSimilarity = require('./index');

const doc1 = `Report: Xiaomi topples Fitbit and Apple as world's largest wearables vendor`;
const doc2 = `Xiaomi topples Fitbit and Apple as world's largest wearables vendor: Strategy Analytics`;
const doc3 = `An intermediate-sized asteroid, categorised as a "potentially hazardous asteroid", will make a close approach to earth on February 4, said Nasa.`;

console.log(`Doc 1-2. WordFreq, Jaccard: ${docSimilarity.wordFrequencySim(doc1, doc2, docSimilarity.jaccardSim)}`);
console.log(`Doc 1-2. WordFreq, Cosine: ${docSimilarity.wordFrequencySim(doc1, doc2, docSimilarity.cosineSim)}`);

console.log(`Doc 1-3. WordFreq, Jaccard: ${docSimilarity.wordFrequencySim(doc1, doc3, docSimilarity.jaccardSim)}`);
console.log(`Doc 1-3. WordFreq, Cosine: ${docSimilarity.wordFrequencySim(doc1, doc3, docSimilarity.cosineSim)}`);

