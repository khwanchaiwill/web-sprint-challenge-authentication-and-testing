const supertest = require('supertest');

const server = require('./server.js');
const db = require('../database/dbConfig.js');
const Users = require('../auth/AuthModel.js');


describe('server', () => {

    beforeEach(async () => {
        // empty table and reset parimary ket back to 1
        await db('users').truncate();

    })


    describe('GET/', () => {
        it('should return status 200 correctyly', () => {
            return supertest(server).get('/').then(res => {
                expect(res.status).toBe(200);
            });
        });
        it("should return 200 correctly using async/await ", async () => {
            const res = await supertest(server).get("/");

            expect(res.status).toBe(200);
        });

        it("Should return api is working..", () => {
            return supertest(server).get('/').expect({api: "working.."});
        });

        it("should return an api property with working.. correctly", async () => {
           await 
             supertest(server).get('/').then(res => {
                 expect(res.body.api).toBe("working..")
             });
        })
    });

    describe('POST/auth/register', () => {
        it('should add the username',  async () => {
           await supertest(server).post('/auth/register').send({
                username: " will",
                password: "03248428"
            });
            const users = await db('users');

            expect(users).toHaveLength(0)
        });

        it('should insert the provided hobbits into the db', async () => {
            // this code expects that the table is empty, we'll handle that below
            // add data to the test database using the data access file
            await Users.add({ username: 'gaffer', password: "03248428" });
            await Users.add({ username: 'sam', password: "03248428" });
      
            const users = await db('users');
            // to have length as expected
            expect(users).toHaveLength(2);
          });
 
    });

    describe('POST/auth/login', () => {
        it('should login ',  async done => {
           await supertest(server).post('/auth/login').send({
                username: " will",
                password: "03248428"
            });
            const users = await Users.findBy({username: "will"})

            done();
        });

        it('should can find byid', async done => {
           
            await Users.add({ username: 'gaffer', password: "03248428" });
    
            const users = Users.findBy({id: 1});
            
            done();
        
        });
    });

    describe('POST/auth/:id delete', () => {
        it('should login ',  async done => {
            await Users.add({ username: 'gaffer', password: "03248428" });
    
            const users = Users.findBy({id: 1});
            
            done();
        });

        it('should can find byid', async done => {
           
            await Users.add({ username: 'gaffer', password: "03248428" });
    
            const users = Users.findBy({id: 1});
            
            done();
        
        });
    });
});