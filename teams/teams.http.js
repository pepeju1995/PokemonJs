const axios = require("axios");
const teamsController = require("./teams.controller");
const { getUser } = require("../auth/users.controller");
const { to } = require("../tools/to");

const getTeamFromUser = async (req, res) => {
    let user = await getUser(req.user.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: team
    })
}

const setTeamToUser = async (req, res) => {
    await teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let [pokeApiError, pokeApiResponse] = 
        await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));
    if (pokeApiError) {
        return res.status(400).json({message: pokeApiError});
    }
    
    let pokemon = {
            name: pokemonName,
            pokedexNumber: pokeApiResponse.data.id
    };
    let [errorAdd, response] = await to(teamsController.addPokemon(req.user.userId, pokemon));
    if (errorAdd) {
        return res.status(400).json({message: errorAdd});
    }
    res.status(201).json(pokemon);
}

const deletePokemonFromTeam = async (req,res) => {
        let [delErr, delRes] = await to(teamsController.deletePokemon(req.user.userId, req.params.pokeid));
        if (delErr) {
            return res.status(400).json({message: delErr});
        }
        res.status(200).send();
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;