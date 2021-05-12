let teamsDatabase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) => {
        for (let user in teamsDatabase) {
            teamsDatabase[user] = [];
        }
        resolve();
    })   
}

const bootstrapTeam = (userId) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = [];
        resolve();
    })
}

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId].length == 6) {
            reject("You have already 6 pokemon");
        } else {
            teamsDatabase[userId].push(pokemon);
            resolve();
        }
    })
}

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDatabase[userId]);
    })
}

const setTeam = (userId, team) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDatabase[userId] = team);
    })
}

const deletePokemon = (userId, pokeIndex) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId][pokeIndex]) {
            teamsDatabase[userId].splice(pokeIndex, 1);
            resolve();
        } else {
            reject("Index not found.");
        }
    })    
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;