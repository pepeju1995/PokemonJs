let teamsDatabase = {};

const cleanUpTeam = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = [];
    }
}

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

const deletePokemon = (userId, pokeIndex) => {
    console.log("DELETE", userId, pokeIndex);
    if (teamsDatabase[userId][pokeIndex]) {
        teamsDatabase[userId].splice(pokeIndex, 1);
    }
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;