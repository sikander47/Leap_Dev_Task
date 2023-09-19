import employee_details from "../fixtures/employee.json"
import updated_employee from "../fixtures/updated_employee.json" 

let userId;
const api_key = "e7b21130cffc44f385002d3b7fd3146c";
let entity = "employee";
let wrong_user_id = "abacase12312vadas"

describe("Employee Crud test cases ", () => {
    
  beforeEach(() =>{
      cy.visit('/')
  })
  
    it("Verify employee can be created successfully", () => {
      cy.request({
        method: "POST",
        url: `/api/${api_key}/${entity}`,   // url containing dynamic api key and entities, which are stored in a variable at top
        headers: {
          authorization: "",
        },
        body: {
                "firstName": employee_details.firstName,
                "lastName": employee_details.lastName,
                "dateOfBirth": employee_details.dateOfBirth,
                "startDate": employee_details.startDate,
                "department": employee_details.department,
                "jobTitleName": employee_details.jobTitleName,
                "emailAddress": employee_details.emailAddress,
                "mobile": employee_details.mobile,
                "address": employee_details.address,
                "salary": employee_details.salary,
        },
      }).then((response) => {
        expect(response).to.have.property("status").to.equal(201); 
        expect(response.body).to.have.property("_id").to.not.be.oneOf([null, ""]);    
        expect(response.body).to.have.property("firstName").to.equal(employee_details.firstName);
        expect(response.body).to.have.property("lastName").to.equal(employee_details.lastName);
        expect(response.body).to.have.property("dateOfBirth").to.equal(employee_details.dateOfBirth);
        expect(response.body).to.have.property("startDate").to.equal(employee_details.startDate);
        expect(response.body).to.have.property("department").to.equal(employee_details.department);
        expect(response.body).to.have.property("jobTitleName").to.equal(employee_details.jobTitleName);
        expect(response.body).to.have.property("emailAddress").to.equal(employee_details.emailAddress);
        expect(response.body).to.have.property("mobile").to.equal(employee_details.mobile);
        expect(response.body).to.have.property("address").to.equal(employee_details.address);
        expect(response.body).to.have.property("salary").to.equal(employee_details.salary);
        userId = response.body._id;
        cy.log(`A new user with ${employee_details.firstName} is created successfully`);
      });
    });

    it('Verified schema validations of create employee call' ,() =>{
        const schema ={
        
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "dateOfBirth": {
                "type": "string"
              },
              "startDate": {
                "type": "string"
              },
              "department": {
                "type": "string"
              },
              "jobTitleName": {
                "type": "string"
              },
              "emailAddress": {
                "type": "string"
              },
              "mobile": {
                "type": "string"
              },
              "address": {
                "type": "string"
              },
              "salary": {
                "type": "string"
              }
            },
            "required": [
              "firstName",
              "lastName",
              "dateOfBirth",
              "startDate",
              "department",
              "jobTitleName",
              "emailAddress",
              "mobile",
              "address",
              "salary"
            ]             
    }
            cy.request({
                    method: "POST",
                    url: `/api/${api_key}/${entity}`,   // url containing dynamic api key and entities, which are stored in a variable at top
                    headers: {
                        authorization: "",
                        },
                    body: {
                            "firstName": employee_details.firstName,
                            "lastName": employee_details.lastName,
                            "dateOfBirth": employee_details.dateOfBirth,
                            "startDate": employee_details.startDate,
                            "department": employee_details.department,
                            "jobTitleName": employee_details.jobTitleName,
                            "emailAddress": employee_details.emailAddress,
                            "mobile": employee_details.mobile,
                            "address": employee_details.address,
                            "salary": employee_details.salary,
                    },
                    }).then((response) => {
                        expect(response).to.have.property("status").to.equal(201); 
                        expect(response.body).to.be.jsonSchema(schema);    
                        })
                    }) 

    it('Verify that employee details can be retrieved by using id', () => {
        
      cy.request({
                  method: 'GET',
                  url: `/api/${api_key}/${entity}/${userId}`,
                  headers: {
                      'authorization': ''
                  }
              }).then((response) => {
                  expect(response).to.have.property('status').to.equal(200)
                  expect(response.body).to.have.property("_id").to.not.be.oneOf([null, ""]);
                  expect(response.body).to.have.property("firstName").to.equal(employee_details.firstName);
                  expect(response.body).to.have.property("lastName").to.equal(employee_details.lastName);
                  expect(response.body).to.have.property("dateOfBirth").to.equal(employee_details.dateOfBirth);
                  expect(response.body).to.have.property("startDate").to.equal(employee_details.startDate);
                  expect(response.body).to.have.property("department").to.equal(employee_details.department);
                  expect(response.body).to.have.property("jobTitleName").to.equal(employee_details.jobTitleName);
                  expect(response.body).to.have.property("emailAddress").to.equal(employee_details.emailAddress);
                  expect(response.body).to.have.property("mobile").to.equal(employee_details.mobile);
                  expect(response.body).to.have.property("address").to.equal(employee_details.address);
                  expect(response.body).to.have.property("salary").to.equal(employee_details.salary);
                  cy.log(`${employee_details.firstName} details are fetched successfully`);
                  
              })
          })

    it('Verify that employees details can be updated successfully', () => {
      cy.request({
                method: 'PUT',
                url: `/api/${api_key}/${entity}/${userId}`,
                headers: {
                    'authorization': ''
                },
                body: {
                  "firstName": updated_employee.firstName,
                  "lastName": updated_employee.lastName,
                  "dateOfBirth": updated_employee.dateOfBirth,
                  "startDate": updated_employee.startDate,
                  "department": updated_employee.department,
                  "jobTitleName": updated_employee.jobTitleName,
                  "emailAddress": updated_employee.emailAddress,
                  "mobile": updated_employee.mobile,
                  "address": updated_employee.address,
                  "salary": updated_employee.salary,
                }
            }).then((response) => {
                expect(response).to.have.property('status').to.equal(200)
                cy.log('User details have been updated successfully');
            })
        })

        it('Verify employee details can be deleted successfully', () => {
          cy.request({
                    method: 'DELETE',
                    url: `/api/${api_key}/${entity}/${userId}`,
                    headers: {
                        'authorization': ''
                    }
                }).then((response) => {
                    expect(response).to.have.property('status').to.equal(200)
                    cy.log('User details have been deleted successfully');
                })
            })
      })
      
describe("Negative Test Cases ", () => {
    
        beforeEach(() =>{
            cy.visit('/')
        })      
      
      it('Verify that providing wrong user id should give 404 error', () => {
              cy.request({
                        method: 'GET',
                        url: `/api/${api_key}/${entity}/${wrong_user_id}`,
                        failOnStatusCode: false,
                        headers: {
                            'authorization': ''
                        }
                    }).then((response) => {
                        expect(response).to.have.property('status').to.equal(404)
                    })
                })

        it('Verify that providing wrong entity value should display 404 error', () => {
              cy.request({
                        method: 'GET',
                        url: `/api/${api_key}/${entity}/${userId}`,
                        failOnStatusCode: false,
                        headers: {
                              'authorization': ''
                            }
                        }).then((response) => {
                            expect(response).to.have.property('status').to.equal(404)
                        })
                    })

        it('Verify that providing wrong url should display 404 error', () => {
              cy.request({
                        method: 'GET',
                        url: `/api/${api_key}/${entity}/${userId}`,
                        failOnStatusCode: false,
                        headers: {
                                'authorization': ''
                                }
                            }).then((response) => {
                                expect(response).to.have.property('status').to.equal(404)
                            })
                        })

        it('Verify that providing wrong HTTP method should display 405 error', () => {
                cy.request({
                        method: 'COPY',
                        url: `/api/${api_key}/${entity}/${userId}`,
                        failOnStatusCode: false,
                        headers: {
                             'authorization': ''
                                }
                            }).then((response) => {
                                expect(response).to.have.property('status').to.equal(405)
                            })
                        })
    })


  
  

