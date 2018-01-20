const stemmer = require('stemmer');

function cosineSim (p, q) {//input word vector (1 = total similarity, 0 = total dissimilarity)
    let sum = 0;
    let upper = 0;
    let bottomA = 0;
    let bottomB = 0;
    let len = Math.min(p.length, q.length);
    for (let i=0;i<len;i++){
        upper+= p[i]*q[i];
        bottomA+= p[i]*p[i];
        bottomB+= q[i]*q[i];
    }
    let diviser = (Math.sqrt(bottomA)*Math.sqrt(bottomB));
    return diviser!=0?(upper/diviser):0;
}
  
function jaccardSim (p, q) {//input word vector (1 = total similarity, 0 = total dissimilarity)
    let union = 0;
    let intersection = 0;
    let len = Math.min(p.length, q.length);
    for (let i=0;i<len;i++){
        //for non distinct calculation
        /*intersection+=Math.min(p[i],q[i]);//p = 1, q = 2 - intersect = 1
        union+=Math.max(p[i],q[i]);//p = 0, q = 3 - union = 3*/

        //for distinct calculation
        if (p[i]>0 && q[i]>0){
            intersection++;
        }
        if (p[i]>0 || q[i]>0){
            union++;
        }
        
    }
    return union==0?0:(intersection/union);
};

function documentTokenizer(documentList, minLen=1){
    /**@type{{[k:string]:Number}} */
    let bagOfWords = {};
    /**@type{{[k:string]:Number}} */
    let wordInDocumentOccurence = {};//word in documents occurence (unique word occurence - max 1 per document)
    /**@type{[{[k:string]:Number}]} */
    let documentBOW = [];
    /**@type{[Number]}} */
    let documentTotalWord = [];
    let numberOfDistintWords = 0;
    let totalNumberOfWords = 0;

    for (let k in documentList){
        let currentBOW = {};
        let currentTotalWord = 0;
        const words = documentList[k].toLowerCase().replace(/[^a-z0-9 ]/g,"").split(" ");
        let contentWords = [];

        if (words.length>=minLen){//remove short sentences
            for (let j in words) {
                const word = stemmer(words[j]);
                if (word!==""){//make sure
                    contentWords.push(word);

                    //general bag of words of whole input
                    if (word in bagOfWords){
                        bagOfWords[word]++;//current sentence bag of word
                    } else {
                        bagOfWords[word]=1;
                        numberOfDistintWords++;
                    }

                    //document specific bag of words
                    if (word in currentBOW) {
                        currentBOW[word]++;//current sentence bag of word
                    } else {
                        currentBOW[word]=1;
                        //found in this document for the first time
                        if (word in wordInDocumentOccurence)
                            wordInDocumentOccurence[word]++;
                        else
                            wordInDocumentOccurence[word]=1;
                    }
                }
            }
            totalNumberOfWords += contentWords.length;
            currentTotalWord += contentWords.length;
        }
        
        documentBOW.push(currentBOW);
        documentTotalWord.push(currentTotalWord);
    }

    return {totalNumberOfWords, numberOfDistintWords, bagOfWords, wordInDocumentOccurence, documentBOW, documentTotalWord};
}

function wordFrequencySim (document1, document2, similarityFunc=cosineSimilarity) {
    const tokenizer = documentTokenizer([document1, document2]);
    const documentBOW = tokenizer.documentBOW;
    const wordBOW = tokenizer.bagOfWords;
    const numberOfDistintWords = tokenizer.numberOfDistintWords;

    let matrix2d = new Array(2);//doc 1 and 2

    for (let i =0;i<2;i++){
        matrix2d[i] = new Array(numberOfDistintWords);
        let index = 0;
        for (let j in wordBOW){//all words
            if (j in documentBOW[i])
                matrix2d[i][index++] = documentBOW[i][j];
            else 
                matrix2d[i][index++] = 0;
        }
    }

    return similarityFunc(matrix2d[0], matrix2d[1]);
}

module.exports = {cosineSim, jaccardSim, wordFrequencySim};