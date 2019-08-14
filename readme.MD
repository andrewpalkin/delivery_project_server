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


