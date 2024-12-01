# User API Spec

## Register User

Endpoint: POST /api/users

Request Body:

``` json
"username": "akhmal",
"password": "YTTA",
"name"    : "Akhmal Faidillah"
```

Response Body (Success):

``` json
{
    "data" : {
        "username": "akhmal",
        "name": "Akhmal Faidillah"
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "username must not blank"
}
```

## Login User

Endpoint: POST /api/users/login

Request Body:

``` json
"username": "akhmal",
"password": "YTTA"
```

Response Body (Success):

``` json
{
    "data" : {
        "username": "akhmal",
        "name": "Akhmal Faidillah",
        "token": "UUID"
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "username or password wrong"
}
```

## Get User

Endpoint: GET /api/users/current

Request Header : 
- X-API-TOKEN : token

Response Body (Success):

``` json
{
    "data" : {
        "username": "akhmal",
        "name": "Akhmal Faidillah"
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Unauthorized"
}
```

## Update User

Endpoint: PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body:

``` json
"password": "YTTA", //tidak wajib
"name" : "Akhmal Faidillah" //tidak wajib
```

Response Body (Success):

``` json
{
    "data" : {
        "username": "akhmal",
        "name": "Akhmal Faidillah",
    }
}
```

Response Body (Failed):

```json
{
    "errors" : "Unauthorized"
}
```

## Logout User

Endpoint: PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success):

``` json
{
    "data" : "OK"
}
```

Response Body (Failed):

```json
{
    "errors" : "Unauthorized"
}
```
