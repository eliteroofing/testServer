exports.formatSkillArray = (array) => {

    var newArray = array.split('-');
    var lastArray = [];
    newArray.forEach(function(element) {
        if(element){
            lastArray.push(element);
        }

    }, this);

    return lastArray;
}