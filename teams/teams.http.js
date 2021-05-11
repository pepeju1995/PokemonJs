const axios = require("axios");
const teamsController = require("./teams.controller");
const { getUser } = require("../auth/users.controller");

const getTeamFromUser = async (req, res) => {
    let user = getUser(req.user.userId);
    let team = await teamsController.getTeamOfUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: team
    })
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    let pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    let pokemon = {
            name: pokemonName,
            pokedexNumber: pokeApiResponse.data.id
    };
    try {
        await teamsController.addPokemon(req.user.userId, pokemon);
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(400).json({message: "You have already 6 pokemon"});
    }
}

const deletePokemonFromTeam = (req,res) => {
        teamsController.deletePokemon(req.user.userId, req.params.pokeid);
        res.status(200).send();
}

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;