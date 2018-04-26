const format = require('string-format');

// Defining custom round function to add
// decimal rounding
var ff = {};
ff.round = function(number, precision = 0) {
    let factor = Math.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

exports.trim = value => {
    return typeof value === 'string' ? value.trim() : value;
};

exports.reverse = value => {
    return typeof value === 'string' ? value.split('').reverse().join('') : value;
};

exports.slice = (value, start, end) => {
    return typeof value === 'string' ? value.slice(start, end) : value;
};

exports.replace = (value, searchValue, replaceValue) => {
    return typeof value === 'string' ? value.replace(searchValue, replaceValue || '') : value;
};

exports.substr = (value, from, length) => {
    return typeof value === 'string' ? value.substr(from, length) : value;
};

exports.int = (value) => {
    let intValue = parseInt(value);
    return isNaN(intValue) ? value : intValue;
};

exports.split = (value, char, index) => {
    if (typeof value === 'string') {
        if(char === '%SPECIAL_CHAR%') {
            char = '|';
        }
        let results = value.split(char);
        if (results[index] !== undefined) {
            return results[index];
        }
    }
    return value;
}

exports.format = (value, formatStr) => {
    return format(formatStr, value);
};

exports.until = (value, str) => {
    return typeof value === 'string' && value.indexOf(str) > 0 ? value.substr(0, value.indexOf(str)) : value;
}

exports.match = (value, str) => {
    return typeof value === 'string' && value.match(new RegExp(str)) !== null ? value.match(new RegExp(str))[1] : value;
}

// torrentzSizeFix
//
// Torrentz doesn't always gives you sizes in "GB",
// most of the times you'll get something like 4328 MB.
// This function fixes it and it convert it, in this
// particular case, to 4.3 GB, which i think is much better.
exports.torrentzSizeFix = (value) => {
    let splitted = value.split(" ");

    let bytes = parseInt(splitted[0]);
    let unit = splitted[1];

    return (unit == "MB" && bytes > 1024) ? ff.round(bytes/1000, 1) + " GB" : value;
}

exports.humanToBytes = (value) => {
    let splitted = value.split(" ");
    
    let bytes = parseInt(splitted[0]);
    let unit = splitted[1];
    
    switch(unit) {
        case 'KB': 
            return byes*1000;
            break;
       
        case 'MB': 
            return byes*1000000;
            break;
            
        case 'GB':
            return byes*1000000000;
            break;
           
        default:
            return value;
    }
    
}
