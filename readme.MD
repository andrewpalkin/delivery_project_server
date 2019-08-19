List of REST APIs:

POST ../auth/register
    
    mandatory input fields:
    - email
    - password
    
    output JSON example:
    {
        "id": "5d53bda7d7200d2a88213558",
        "email": "test@gmail.com",
        "verification": "SEND",
        "createDate": "2019-08-14T07:51:35.267Z"
    }
        
GET ../auth/verify

    mandatory input fileds (passed as query parameters)
    - email
    - verificationString
    
    output JSON example:
    {
        "id": "5d53bda7d7200d2a88213558",
        "email": "test@gmail.com",
        "verification": "DONE",
        "createDate": "2019-08-14T07:51:35.267Z"
    }
    
POST ../auth/login
    
    mandatory input fields:
    - email
    - password
    
    output JSON example:
    {
        "id": "5d53bda7d7200d2a88213558",
        "email": "test@gmail.com",
        "verification": "SEND",
        "createDate": "2019-08-14T07:51:35.267Z"
    }
        
GET ../auth/logout

POST ../users/saveDetails

    mandatory input fields:
    - userID
    - firstName
    - secondName
    
    output JSON example (in case and no entry exist in DB):
    {
        "userID": "5d55253786acf8755c009c1d",
        "createDate": "2019-08-18T09:02:10.898Z"
    }

    output JSON example (in case and entry exist in DB, will be retreived updateDate):
    {
        "userID": "5d55253786acf8755c009c1d",
        "createDate": "2019-08-18T09:02:10.898Z",
        "updateDate": "2019-08-18T09:13:44.639Z"
    }

GET ../users/userDetails 

    mandatory input fields (passed as query parameters):
    - userID 
    
    output JSON example:
    {
        "createDate": "2019-08-18T08:38:39.155Z",
        "updateDate": "2019-08-18T08:38:39.155Z",
        "userID": "5d55253786acf8755c009c1d",
        "firstName": "Vasya",
        "secondName": "Pupkin"
    }
    
POST ../items/create

    mandatory input fields:
    - name
    - status ['NEW', 'ASSIGNED', 'CANCELED', 'DONE']
    - description
    - createdBy
    - deliveryAddressID
    - pickUpAddressID
    optional input fields:
    - handledBy
    - deadLineDate
    - pictureURL
        
    output JSON example:
    {
         "createDate": "2019-08-19T08:27:59.340Z",
         "updateDate": "2019-08-19T08:27:59.340Z",
         "id": "5d5a5e43bf0d5a50aca4e3d5",
         "name": "test item test item 3333",
         "status": "NEW",
         "description": "description description description description description",
         "createdBy": "5d55253786acf8755c009c1d",
         "deadLineDate": "2019-11-17T08:27:59.340Z",
         "pictureURL": [],
         "deliveryAddressID": "5d5a5e43bf0d5a50aca4e3d5",
         "pickUpAddressID": "5d5a5e43bf0d5a50aca4e3d5"
    }    
    
GET ../items/item

    mandatory input fields (passed as query parameters):
    - id 
    
    output JSON example:
    {
         "createDate": "2019-08-19T08:27:59.340Z",
         "updateDate": "2019-08-19T08:27:59.340Z",
         "id": "5d5a5e43bf0d5a50aca4e3d5",
         "name": "test item test item 3333",
         "status": "NEW",
         "description": "description description description description description",
         "createdBy": "5d55253786acf8755c009c1d",
         "deadLineDate": "2019-11-17T08:27:59.340Z",
         "pictureURL": [],
         "deliveryAddressID": "5d5a5e43bf0d5a50aca4e3d5",
         "pickUpAddressID": "5d5a5e43bf0d5a50aca4e3d5"
    }
    
POST ../items/update

    mandatory input fields (passed as query parameters):
    - id 
    
    in case and field was not passed in input JSON, 
    it will be erazed in DB if it was exist    
   
    madatory input fields (passed as JSON):
    - name
    - status ['NEW', 'ASSIGNED', 'CANCELED', 'DONE']
    - description
    - createdBy
    - deliveryAddressID
    - pickUpAddressID
    
    optional input fields (passed as JSON):
    - handledBy
    - deadLineDate
    - pictureURL
    
    output JSON example:
    {
         "createDate": "2019-08-19T08:27:59.340Z",
         "updateDate": "2019-08-19T08:27:59.340Z",
         "id": "5d5a5e43bf0d5a50aca4e3d5",
         "name": "test item test item 3333",
         "status": "NEW",
         "description": "description description description description description",
         "createdBy": "5d55253786acf8755c009c1d",
         "deadLineDate": "2019-11-17T08:27:59.340Z",
         "pictureURL": [],
         "deliveryAddressID": "5d5a5e43bf0d5a50aca4e3d5",
         "pickUpAddressID": "5d5a5e43bf0d5a50aca4e3d5"
    }
   
GET ../items/createdBy

    mandatory input fields (passed as query parameters):
    - id 
    
    output JSON example:
    {
        "5d5a5df9bf0d5a50aca4e3d3": {
            "createDate": "2019-08-19T08:27:59.340Z",
            "updateDate": "2019-08-19T09:17:22.960Z",
            "id": "5d5a5df9bf0d5a50aca4e3d3",
            "name": "test item test item 3333 updated",
            "status": "DONE",
            "description": "description description description description description",
            "createdBy": "5d55253786acf8755c009c1d",
            "handledBy": "5d55253786acf8755c009c1d",
            "deadLineDate": "2019-11-17T08:27:59.340Z",
            "pictureURL": [],
            "deliveryAddressID": "23434234234234",
            "pickUpAddressID": "234235234234"
        },
        "5d5a5e43bf0d5a50aca4e3d5": {
            "createDate": "2019-08-19T08:27:59.340Z",
            "updateDate": "2019-08-19T08:49:10.611Z",
            "id": "5d5a5e43bf0d5a50aca4e3d5",
            "name": "test item test item 3333 updated",
            "status": "DONE",
            "description": "description description description description description",
            "createdBy": "5d55253786acf8755c009c1d",
            "handledBy": "5d55253786acf8755c009c1d",
            "deadLineDate": "2019-11-17T08:27:59.340Z",
            "pictureURL": [],
            "deliveryAddressID": "23434234234234",
            "pickUpAddressID": "234235234234"
        }
    }
    
GET ../items/handledBy

    mandatory input fields (passed as query parameters):
    - id 
    
    output JSON example:
    {
        "5d5a5df9bf0d5a50aca4e3d3": {
            "createDate": "2019-08-19T08:27:59.340Z",
            "updateDate": "2019-08-19T09:17:22.960Z",
            "id": "5d5a5df9bf0d5a50aca4e3d3",
            "name": "test item test item 3333 updated",
            "status": "DONE",
            "description": "description description description description description",
            "createdBy": "5d55253786acf8755c009c1d",
            "handledBy": "5d55253786acf8755c009c1d",
            "deadLineDate": "2019-11-17T08:27:59.340Z",
            "pictureURL": [],
            "deliveryAddressID": "23434234234234",
            "pickUpAddressID": "234235234234"
        },
        "5d5a5e43bf0d5a50aca4e3d5": {
            "createDate": "2019-08-19T08:27:59.340Z",
            "updateDate": "2019-08-19T08:49:10.611Z",
            "id": "5d5a5e43bf0d5a50aca4e3d5",
            "name": "test item test item 3333 updated",
            "status": "DONE",
            "description": "description description description description description",
            "createdBy": "5d55253786acf8755c009c1d",
            "handledBy": "5d55253786acf8755c009c1d",
            "deadLineDate": "2019-11-17T08:27:59.340Z",
            "pictureURL": [],
            "deliveryAddressID": "23434234234234",
            "pickUpAddressID": "234235234234"
        }
    }