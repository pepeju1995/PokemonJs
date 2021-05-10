const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const usersController = require("../controllers/users");
const teamsController = require("../controllers/teams");
const app = require("../app").app;

before((done) => {
    usersController.registerUser("pepeju95", "1234");
    usersController.registerUser("pepeju1995", "4321");
    done();
});

afterEach((done) => {
    teamsController.cleanUpTeam();
    done();
});

describe("Suite de pruebas teams", () => {
    it("should return the team of the given user", (done) => {
        let team = [{name: "Charizard"}, {name: "Blastoise"}];
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({user: "pepeju95", password: "1234"})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put("/teams")
                    .send({
                        team: team
                    })
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/teams")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: "pepeju95", team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, "pepeju95");
                                chai.assert.equal(res.body.team.length, team.length);
                                chai.assert.equal(res.body.team[0].name, team[0].name);
                                chai.assert.equal(res.body.team[1].name, team[1].name);
                                done();
                            });
                        
                    });
            });
    });

    it("should return the pokedex number", (done) => {
        let pokemonName = "Bulbasaur";
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({user: "pepeju95", password: "1234"})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post("/teams/pokemons")
                    .send({name: pokemonName})
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/teams")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: "pepeju95", team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, "pepeju95");
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });
                        
                    });
            });
    });

    it("should remove the pokemon at index", (done) => {
        let team = [{name: "Charizard"}, {name: "Blastoise"}, {name: "Pikachu"}];
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({user: "pepeju95", password: "1234"})
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put("/teams")
                    .send({team: team})
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .delete("/teams/pokemons/1")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                chai.request(app)
                                    .get("/teams")
                                    .set("Authorization", `JWT ${token}`)
                                    .end((err, res) => {
                                        // tiene equipo con Charizard y Blastoise
                                        // { trainer: "pepeju95", team: [Pokemon]}
                                        chai.assert.equal(res.statusCode, 200);
                                        chai.assert.equal(res.body.trainer, "pepeju95");
                                        chai.assert.equal(res.body.team.length, team.length - 1);
                                        done();
                                    });
                                
                            });
                    });
                    
            });
    });

});

after((done) => {
    usersController.cleanUpUsers();
    done();
});
