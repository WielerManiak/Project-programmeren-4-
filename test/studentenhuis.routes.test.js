const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(index)
            .post('/api/studentenhuis')
            .set('X-Access-Token', 'wrong token')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        chai.request(index)
            .post('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .send({
                "naam": "lamp",
                "adres": "aarde",
            })
            .end((err, res) => {
                res.should.have.status(200)
                const response = res.body
                response.should.have.property('bericht').equals('Het studentenhuis is succesvol toegevoegd')
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(index)
            .post('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .send({
                "adres": "aarde",
            })
            .end((err, res) => {
                res.should.have.status(401)
                const response = res.body
                response.should.have.property('bericht').equals('Het studentenhuis is niet succesvol toegevoegd')
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(index)
            .post('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .send({
                "naam": "boom",
            })
            .end((err, res) => {
                res.should.have.status(401)
                const response = res.body
                response.should.have.property('bericht').equals('Het studentenhuis is niet succesvol toegevoegd')
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(index)
            .get('/api/studentenhuis')
            .set('X-Access-Token', 'wrong token')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        chai.request(index)
            .get('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(index)
            .get('/api/studentenhuis/1')
            .set('X-Access-Token', 'wrong token')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        chai.request(index)
            .get('/api/studentenhuis/1')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return an error when using an non-existing huisId', (done) => {
        chai.request(index)
            .get('/api/studentenhuis/9999')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(index)
            .put('/api/studentenhuis/1')
            .set('X-Access-Token', 'wrong token')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        chai.request(index)
            .put('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .send({
                "naam": "kel",
                "adres": "zernikenlaan",
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        chai.request(index)
            .put('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .send({
                "adres": "zernikenlaan",
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when adres is missing', (done) => {
        chai.request(index)
            .put('/api/studentenhuis')
            .set('X-Access-Token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxOTAzMDAsImlhdCI6MTUyNjMyNjMwMCwic3ViIjoia0Bob3RtYWlsLmNvbSJ9.LoRE0SOWP67t5exyhoLAf6hi8mlu49zBtKN-O_8gHXs')
            .send({
                "naam": "kel",
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(index)
            .delete('/api/studentenhuis/5')
            .set('X-Access-Token', 'wrong token')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})