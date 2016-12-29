import * as _ from 'lodash';

const updateResultStrV = function (result, htmlString) {
    const resultLength = result.length;
    const length = htmlString.length - resultLength;
    let j = 0;
    const arrayOfWordEndTag = [' ', ',', '?', '.', ';', '>', '<'];
    let newLength = resultLength;
    for (j = 1; j < length; j++) {
        newLength = resultLength + j;
        const index = htmlString.substring(newLength - 1, newLength);
        if (!(_.indexOf(arrayOfWordEndTag, index) < 0) && !(/\b/.test(index))) {
            break;
        }
        result += index;
    }
    result += ' ...';
    return result;
};

export const htmlSubstring = (htmlString, truncateNum) => { // eslint-disable-line max-statements
    if (!htmlString) {
        return htmlString;
    }

    const htmlText = htmlString.replace(/<(?:.|\n)*?>/gm, '');
    let m = '';
    const htmlReg = /<([^>\s]*)[^>]*>/g;
    const stack = [];
    let lasti = 0;
    let result = '';
    // for each tag, while we don't have enough characters
    while (htmlReg.exec(htmlString) && truncateNum) {
        m = htmlReg.exec(htmlString);
        // get the text substring between the last tag and this one
        const temp = htmlString.substring(lasti, m.index).substr(0, truncateNum);
        // append to the result and count the number of characters added
        result += temp;
        truncateNum -= temp.length;
        lasti = htmlReg.lastIndex;
        if (truncateNum) {
            result += m[0];
            if (m[1].indexOf('/') === 0) {
                // if this is a closing tag, than pop the stack (does not account for bad html)
                stack.pop();
            } else if (m[1].lastIndexOf('/') !== m[1].length - 1) {
                // if this is not a self closing tag than push it in the stack
                stack.push(m[1]);
            }
        }
    }
    // add the remainder of the string, if needed (there are no more tags in here)
    result += htmlString.substr(lasti, truncateNum);
    if (htmlText.length > truncateNum) {
        result = updateResultStrV(result, htmlString);
    }
    // fix the unclosed tags
    while (stack.length) {
        result += '</' + stack.pop() + '>';
    }
    return result;
};
