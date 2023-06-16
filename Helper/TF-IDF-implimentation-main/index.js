const fs = require('fs');

function load_vocab(callback) {
    var vocab = {};
    fs.readFile('Helper/TF-IDF-implimentation-main/vocab.txt', 'utf8', (err, vocab_terms) => {
        if (err) throw err;
        fs.readFile('Helper/TF-IDF-implimentation-main/idf-values.txt', 'utf8', (err, idf_values) => {
            if (err) throw err;
            vocab_terms = vocab_terms.split('\n');
            idf_values = idf_values.split('\n');

            for (var i = 0; i < vocab_terms.length; i++) {
                var term = vocab_terms[i].trim();
                var idf_value = parseInt(idf_values[i].trim());
                vocab[term] = idf_value;
            }

            callback(vocab);
        });
    });
}

function load_document(callback) {
    fs.readFile('Helper/TF-IDF-implimentation-main/document.txt', 'utf8', (err, documents) => {
        if (err) throw err;
        documents = documents.split('\n');
        callback(documents);
    });
}

function load_inverted_index(callback) {
    var inverted_index = {};
    fs.readFile('Helper/TF-IDF-implimentation-main/inverted_index.txt', 'utf8', (err, inverted_index_terms) => {
        if (err) throw err;
        inverted_index_terms = inverted_index_terms.split('\n');

        try {
            for (var i = 0; i < inverted_index_terms.length; i += 2) {
                var term = inverted_index_terms[i].trim();
                var documents = [];

                try {
                    if (inverted_index_terms[i + 1]) {
                        documents = inverted_index_terms[i + 1].trim().split(',');

                        // Further processing or manipulation of the documents array as needed
                    }
                } catch (innerErr) {
                    console.error('Error occurred during document processing:', innerErr);
                }

                inverted_index[term] = documents;
            }
        } catch (outerErr) {
            console.error('Error occurred during inverted index processing:', outerErr);
        }

        callback(inverted_index);
    });
}



function load_link_of_index(callback) {
    fs.readFile('Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/index.txt', 'utf8', (err, links) => {
        if (err) throw err;

        // Remove any leading or trailing whitespace from the entire content
        links = links.trim();

        // Split the content by newlines, considering different line break characters
        links = links.split(/\r?\n/);

        // Remove any leading or trailing whitespace from each line
        links = links.map(link => link.trim());

        // Remove any empty lines
        links = links.filter(link => link.length > 0);
        callback(links);
    });
}
function load_link_of_qs(callback) {
    fs.readFile('Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/Qlink.txt', 'utf8', (err, links) => {
        if (err) throw err;

        // Remove any leading or trailing whitespace from the entire content
        links = links.trim();

        // Split the content by newlines, considering different line break characters
        links = links.split(/\r?\n/);

        // Remove any leading or trailing whitespace from each line
        links = links.map(link => link.trim());

        // Remove any empty lines
        links = links.filter(link => link.length > 0);
        callback(links);
    });
}
function load_link_of_diff(callback) {
    fs.readFile('Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/output.txt', 'utf8', (err, links) => {
        if (err) throw err;

        // Remove any leading or trailing whitespace from the entire content
        links = links.trim();

        // Split the content by newlines, considering different line break characters
        links = links.split(/\r?\n/);

        // Remove any leading or trailing whitespace from each line
        links = links.map(link => link.trim());

        // Remove any empty lines
        links = links.filter(link => link.length > 0);
        callback(links);
    });
}


function get_tf_dict(term, inverted_index, document) {
    var tf_dict = {};
    if (term in inverted_index) {
        for (var i = 0; i < inverted_index[term].length; i++) {
            var doc = inverted_index[term][i];
            if (!(doc in tf_dict)) {
                tf_dict[doc] = 1;
            } else {
                tf_dict[doc] += 1;
            }
        }
    }

    for (var doc in tf_dict) {
        try {
            tf_dict[doc] /= document[parseInt(doc)].split(' ').length;
        } catch (e) {
            console.log(e);
            console.log(doc);
        }
    }

    return tf_dict;
}

function get_idf_value(term, vocab, document) {
    return Math.log((1 + document.length) / (1 + vocab[term]));
}

function calc_docs_sorted_order(q_terms, vocab, inverted_index, document, Qlink, qindex, diff) {
    var potential_docs = {};
    var ans = [];

    for (var i = 0; i < q_terms.length; i++) {
        var term = String(q_terms[i]).toLowerCase();
        if (!(term in vocab)) {
            continue;
        }

        var tf_vals_by_docs = get_tf_dict(term, inverted_index, document);
        var idf_value = get_idf_value(term, vocab, document);

        for (var doc in tf_vals_by_docs) {
            if (!(doc in potential_docs)) {
                potential_docs[doc] = tf_vals_by_docs[doc] * idf_value;
            } else {
                potential_docs[doc] += tf_vals_by_docs[doc] * idf_value;
            }
        }

        for (var doc in potential_docs) {
            potential_docs[doc] /= q_terms.length;
        }

        var sorted_docs = Object.entries(potential_docs).sort(
            (a, b) => b[1] - a[1]
        );

        if (sorted_docs.length === 0) {
            console.log('No matching question found. Please search with more relevant terms.');
        }

        for (var j = 0; j < sorted_docs.length; j++) {
            var doc_index = sorted_docs[j][0];
            ans.push({
                'QuestionLink': Qlink[parseInt(doc_index) - 1],
                'QuestionName': qindex[parseInt(doc_index) - 1].replace(/^\d+\.\s*/, ''),
                'Diff':diff[parseInt(doc_index) - 1]
            });
        }
    }
    return ans;
}
// Usage

const filePath = 'Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/index.txt';
function searchTermsInFile(terms, Qlink, qindex, diff) {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const matchingLines = [];

    lines.forEach((line, index) => {
        const lowerLine = line.toLowerCase(); // Convert line to lowercase

        for (const term of terms) {
        
            const lowerTerm = term.toLowerCase(); // Convert term to lowercase
            if (lowerLine.includes(lowerTerm)) {
                matchingLines.push(index);
                break;
            }
        }
    });
    const ans = [];
    matchingLines.forEach((lineIndex) => {
        ans.push({
            'QuestionLink': Qlink[lineIndex],
            'QuestionName': qindex[lineIndex].replace(/^\d+\.\s*/, ''),
            'Diff':diff[lineIndex]
        });
    });
    return ans;
}
async function performSearch(q_terms) {
    return new Promise((resolve, reject) => {
        load_vocab(function (vocab) {
            load_document(function (document) {
                load_inverted_index(function (inverted_index) {
                    load_link_of_qs(function (Qlink) {
                        load_link_of_index(function (qindex) {
                            load_link_of_diff(function(diff) {
                                var result = calc_docs_sorted_order(
                                    q_terms,
                                    vocab,
                                    inverted_index,
                                    document,
                                    Qlink,
                                    qindex,
                                    diff
                                );
                                var result_by_title = searchTermsInFile(q_terms, Qlink, qindex, diff);
                                var mergedResults = new Set([
                                    ...result.slice(0, 10).map(JSON.stringify),
                                    ...result_by_title.slice(0, 10).map(JSON.stringify)
                                ]);
                                console.log(result);
                                console.log(result_by_title);
                                // Convert the JSON strings back to objects
                                var mergedResultsArray = Array.from(mergedResults, JSON.parse);
                                // Resolve the promise with the mergedResultsArray
                                console.log(mergedResultsArray);
                                resolve(mergedResultsArray);
                            })
                        });
                    });
                });
            });
        });
    });
}
export default performSearch;
