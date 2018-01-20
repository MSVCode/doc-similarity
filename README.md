# doc-similarity
NodeJS simple document similarity module. Support some popular similarity measurement.

### NPM package ###
- Run `npm install doc-similarity --save`
- Require it in your project `const docSimilarity = require('doc-similarity');`
- Call it `docSimilarity.wordFrequencySim(document1, document2, [similarityFunction])`
- Example `docSimilarity.wordFrequencySim("Hello World", "Hello John", docSimilarity.cosineSim)`

Similarity function is optional parameter, default set to Cosine Similarity. It could be replaced by any user-created function.

### Demo run in project folder ###
- Make sure to install the npm modules first `npm install`
- In the project, run `node ./src/demo.js`

### Current Features (0.0.1)
Word Weighting

- Word Frequency

Similarity Measure

- Cosine
- Jaccard

### To-do
- TF-IDF distance
- HTF-IDF distance
- Browser compatibility