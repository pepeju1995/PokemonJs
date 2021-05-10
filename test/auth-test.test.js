const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const usersController = require("../controllers/users");
const app = require("../app").app;


before((done) => {
    usersController.registerUser("pepeju95", "1234");
    usersController.registerUser("pepeju1995", "4321");
    done();
});

describe("Suite de pruebas auth", () => {
    it("should return 401 when no jwt token available", (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get("/teams")
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });

    it("should return 400 when no data is provided", (done) => {
        chai.request(app)
            .post("/auth/login")
            .end((err, res) => {
                //Expected valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it("should return 200 and token for succesful login", (done) => {
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({user: "pepeju95", password: "1234"})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it("should return 200 when jwt valid", (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({user: "pepeju95", password: "1234"})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get("/teams")
                    .set("Authorization", `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        done();
                    });
            });
    })
});

after((done) => {
    usersController.cleanUpUsers();
    done();
});
