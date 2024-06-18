function add(a,b){
    return a + b;
}

function sub(a,b){
    return a - b;
}

//exporting funtions
module.exports = {
    AddFN:add,
    SubFN:sub
};

//Another way to Export the functions/modules
// exports.add1 = (a,b) => a + b;

// exports.sub2 = (a,b) => a - b;