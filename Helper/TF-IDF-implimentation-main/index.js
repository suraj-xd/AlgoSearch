const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function load_vocab() {
  try {
    const vocab_terms = await readFileAsync('Helper/TF-IDF-implimentation-main/vocab.txt', 'utf8');
    const idf_values = await readFileAsync('Helper/TF-IDF-implimentation-main/idf-values.txt', 'utf8');
    
    const vocab = {};
    const terms = vocab_terms.split('\n');
    const values = idf_values.split('\n');
    
    for (let i = 0; i < terms.length; i++) {
      const term = terms[i].trim();
      const idf_value = parseInt(values[i].trim());
      vocab[term] = idf_value;
    }
    
    return vocab;
  } catch (err) {
    throw new Error(`Error occurred while loading vocabulary: ${err.message}`);
  }
}

async function load_document() {
  try {
    const documents = await readFileAsync('Helper/TF-IDF-implimentation-main/document.txt', 'utf8');
    return documents.split('\n');
  } catch (err) {
    throw new Error(`Error occurred while loading documents: ${err.message}`);
  }
}

async function load_inverted_index() {
  try {
    const inverted_index_terms = await readFileAsync('Helper/TF-IDF-implimentation-main/inverted_index.txt', 'utf8');
    
    const inverted_index = {};
    const terms = inverted_index_terms.split('\n');
    
    for (let i = 0; i < terms.length; i += 2) {
      const term = terms[i].trim();
      let documents = [];
      
      try {
        if (terms[i + 1]) {
          documents = terms[i + 1].trim().split(',');
          // Further processing or manipulation of the documents array as needed
        }
      } catch (innerErr) {
        console.error('Error occurred during document processing:', innerErr);
      }
      
      inverted_index[term] = documents;
    }
    
    return inverted_index;
  } catch (err) {
    throw new Error(`Error occurred while loading inverted index: ${err.message}`);
  }
}

async function load_link_of_index() {
  try {
    const links = await readFileAsync('Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/index.txt', 'utf8');
    
    const trimmedLinks = links.trim();
    const splitLinks = trimmedLinks.split(/\r?\n/);
    const filteredLinks = splitLinks.map(link => link.trim()).filter(link => link.length > 0);
    
    return filteredLinks;
  } catch (err) {
    throw new Error(`Error occurred while loading links of index: ${err.message}`);
  }
}

async function load_link_of_qs() {
  try {
    const links = await readFileAsync('Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/Qlink.txt', 'utf8');
    
    const trimmedLinks = links.trim();
    const splitLinks = trimmedLinks.split(/\r?\n/);
    const filteredLinks = splitLinks.map(link => link.trim()).filter(link => link.length > 0);
    
    return filteredLinks;
  } catch (err) {
    throw new Error(`Error occurred while loading links of questions: ${err.message}`);
  }
}

async function load_link_of_diff() {
  try {
    const links = await readFileAsync('Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/output.txt', 'utf8');
    
    const trimmedLinks = links.trim();
    const splitLinks = trimmedLinks.split(/\r?\n/);
    const filteredLinks = splitLinks.map(link => link.trim()).filter(link => link.length > 0);
    
    return filteredLinks;
  } catch (err) {
    throw new Error(`Error occurred while loading links of difficulty: ${err.message}`);
  }
}

function get_tf_dict(term, inverted_index, document) {
  const tf_dict = {};
  
  if (term in inverted_index) {
    for (let i = 0; i < inverted_index[term].length; i++) {
      const doc = inverted_index[term][i];
      
      if (!(doc in tf_dict)) {
        tf_dict[doc] = 1;
      } else {
        tf_dict[doc] += 1;
      }
    }
  }
  
  for (let doc in tf_dict) {
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
  const potential_docs = {};
  const ans = [];

  for (let i = 0; i < q_terms.length; i++) {
    const term = String(q_terms[i]).toLowerCase();

    if (!(term in vocab)) {
      continue;
    }

    const tf_vals_by_docs = get_tf_dict(term, inverted_index, document);
    const idf_value = get_idf_value(term, vocab, document);

    for (let doc in tf_vals_by_docs) {
      if (!(doc in potential_docs)) {
        potential_docs[doc] = tf_vals_by_docs[doc] * idf_value;
      } else {
        potential_docs[doc] += tf_vals_by_docs[doc] * idf_value;
      }
    }

    for (let doc in potential_docs) {
      potential_docs[doc] /= q_terms.length;
    }

    const sorted_docs = Object.entries(potential_docs).sort((a, b) => b[1] - a[1]);

    if (sorted_docs.length === 0) {
      console.log('No matching question found. Please search with more relevant terms.');
    }

    for (let j = 0; j < sorted_docs.length; j++) {
      const doc_index = sorted_docs[j][0];
      ans.push({
        'QuestionLink': Qlink[parseInt(doc_index) - 1],
        'QuestionName': qindex[parseInt(doc_index) - 1].replace(/^\d+\.\s*/, ''),
        'Diff': diff[parseInt(doc_index) - 1]
      });
    }
  }

  return ans;
}
const filePath = 'Helper/TF-IDF-implimentation-main/Leetcode-Scraping/qData/index.txt';
async function searchTermsInFile(terms, Qlink, qindex, diff) {
  try {
    const data = await readFileAsync(filePath, 'utf8');
    const lines = data.split('\n');
    const matchingLines = [];

    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();

      for (const term of terms) {
        const lowerTerm = term.toLowerCase();

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
        'Diff': diff[lineIndex]
      });
    });

    return ans;
  } catch (err) {
    throw new Error(`Error occurred while searching terms in file: ${err.message}`);
  }
}

async function  performSearch(q_terms) {
  try {
    const vocab = await load_vocab();
    const document = await load_document();
    const inverted_index = await load_inverted_index();
    const Qlink = await load_link_of_qs();
    const qindex = await load_link_of_index();
    const diff = await load_link_of_diff();

    const result = calc_docs_sorted_order(
      q_terms,
      vocab,
      inverted_index,
      document,
      Qlink,
      qindex,
      diff
    );
    
    const result_by_title = await searchTermsInFile(q_terms, Qlink, qindex, diff);
    
    const mergedResults = new Set([
      ...result.slice(0, 10).map(JSON.stringify),
      ...result_by_title.slice(0, 10).map(JSON.stringify)
    ]);
    
    const mergedResultsArray = Array.from(mergedResults, JSON.parse);


    return mergedResultsArray;
  } catch (err) {
    throw new Error(`Error occurred while performing the search: ${err.message}`);
  }
}

export default performSearch;
