List of REST APIs:

../auth/register
    
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
        
../auth/verify

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
    
../auth/login
    
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
        
../auth/logout

../users/saveDetails

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

../users/userDetails 

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
    