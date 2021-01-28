const bcrypt = require('bcryptjs');

function hash (pass){
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(pass, salt);
    return hashed
}

function compare (UPass,DbPass){
    const decoded = bcrypt.compareSync(UPass, DbPass);
    return decoded
}

module.exports = {
    hash,
    compare
}