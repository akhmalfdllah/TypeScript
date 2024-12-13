# Address API Spec

## Create Address
Endpoint : POST /api/contacts/:idContacts/addresses

Request Header : 
- X-API-TOKEN : token

Request Body :
```json
{
    "street" : "Jalan Raya",
    "city" : "Jatibening",
    "province" : "London",
    "country" : "indonesia",
    "postal_code" : "15210"
}
```
Response Body (Success) :
```json
{
    "data" : {
        "id": 1,
        "street" : "Jalan Raya",
        "city" : "Jatibening",
        "province" : "London",
        "country" : "indonesia",
        "postal_code" : "15210"
    }
}
```

Response Body (Failed) :
```json
{
    "errors" : "postal_code is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContacts/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : {
        "id": 1,
        "street" : "Jalan Raya",
        "city" : "Jatibening",
        "province" : "London",
        "postal_code" : "15210"
    }
}
```
Response Body (Failed) :
```json
{
    "errors" : "Address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContacts/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : {
        "id": 1,
        "street" : "Jalan Raya",
        "city" : "Jatibening",
        "province" : "London",
        "postal_code" : "15210"
    }
}
```
Response Body (Failed) :
```json
{
    "errors" : "Address is not found"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContacts/addresses/:idAddress

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : "OK"
}
```
Response Body (Failed) :
```json
{
    "errors" : "Address is not found"
}
```

## List Address

Endpoint : GET /api/contacts/:idContacts/addresses

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : [
        {
            "id": 1,
            "street" : "Jalan Raya",
            "city" : "Jatibening",
            "province" : "London",
            "postal_code" : "15210"
        },
        {
            "id": 2,
            "street" : "Jalan Raya",
            "city" : "Jatibening",
            "province" : "London",
            "postal_code" : "15210"
        }
    ]
}
```
Response Body (Failed) :
```json
{
    "errors" : "Contact is not found"
}
```