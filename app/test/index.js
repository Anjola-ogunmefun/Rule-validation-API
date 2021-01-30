// Require dependencies
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('/Get base data', () => {
  // eslint-disable-next-line no-undef
  it('should respond with data on base endpoint', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('status');
        res.body.should.have.property('message').eql('My Rule-Validation API');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.should.have.property('data').eql({
            "name": "Ogunmefun Anjolaoluwa",
            "github": "@Anjola-ogunmefun",
            "email": "ogunmefunanjola@gmail.com",
            "mobile": "07037378514"
        });
        done();
      });
  });
});



// Test post body to validate rule

describe('/validate-rule', () => {
  it('should respond with data on required rule field', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
            data: {
              name: "James Holden",
              crew: "Rocinante",
              age: 34,
              position: "Captain",
              missions: 45
            }
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('rule is required.');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });

  it('should respond with data on required data field', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
        rule: {
            field: "missions",
            condition: "gte",
            condition_value: 30
          }
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('data is required.');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });

  it('should respond with data on type of rule input', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send(
          {
              rule:["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
              data: {}
          }
      )
      .end((err, res) => {[]
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('Invalid JSON payload passed.');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });

  it('should respond with data on presence of field property in rule field', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
            rule: {
                condition: "gte",
                condition_value: 30
              },
              data: {
                name: "James Holden",
                crew: "Rocinante",
                age: 34,
                position: "Captain",
                missions: 45
              }
          }
      )
      .end((err, res) => {[]
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('field property of rule is required.');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });

  it('should respond with data on type of data input', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
            rule: {
                condition: "gte",
                condition_value: 30
              },
              data: 50
          }
      )
      .end((err, res) => {[]
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('field property of rule is required.');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });

  it('should respond with result on if field is present in data', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
            rule: {
                field: 'missions',
                condition: "gte",
                condition_value: 30
              },
              data: {
                name: "James Holden",
                crew: "Rocinante",
                age: 34,
                position: "Captain",
                kills: 45
              }
          }
      )
      .end((err, res) => {[]
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('missions is missing from data.');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });

  it('should respond with successful validation', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
            rule: {
            field: "missions",
            condition: "gte",
            condition_value: 30
          },
          data: {
            name: "James Holden",
            crew: "Rocinante",
            age: 34,
            position: "Captain",
            missions: 45
          }
          }
      )
      .end((err, res) => {[]
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('field missions successfully validated.');
        res.body.should.have.property('data').eql({
                "validation": {
                    "error": false,
                    "field": "missions",
                    "condition": "gte",
                    "condition_value": 30
                }
            }
            );
        done();
      });
  });

  it('should respond with failed validation', (done) => {
    chai.request(app)
      .post('/validate-rule')
      .send({
            rule: {
            field: "missions",
            condition: "eq",
            condition_value: 30
          },
          data: {
            name: "James Holden",
            crew: "Rocinante",
            age: 34,
            position: "Captain",
            missions: 45
          }
          }
      )
      .end((err, res) => {[]
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('field missions failed validation.');
        res.body.should.have.property('data').eql( {
                "validation": {
                    "error": false,
                    "field": "missions",
                    "condition": "eq",
                    "condition_value": 30
                }
            }
            );
        done();
      });
  });

});
