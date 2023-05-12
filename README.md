# Nodejs MYSQL REST API

### Documentation

```
Create new user
POST https://firstmysqlapi-production.up.railway.app/api/SignUp {name,lastname,email,password, profilepic, username}

Login
POST https://firstmysqlapi-production.up.railway.app/api/Login {email,password}

Get all users
GET https://firstmysqlapi-production.up.railway.app/api/users

Get user by ID
GET https://firstmysqlapi-production.up.railway.app/api/users/<<ID>>

Delete user
DELETE https://firstmysqlapi-production.up.railway.app/api/users/<<ID>>

ADD favorite
POST https://firstmysqlapi-production.up.railway.app/api/favorite/<<user_id>>

DELETE favorite
DELETE https://firstmysqlapi-production.up.railway.app/api/favorite/<<fav_id>>

GET user favs
GET https://firstmysqlapi-production.up.railway.app/api/favorite/<<user_id>>
```

### TODO

- [ ] upload images
- [✅] Sign Up
- [✅] Login
- [✅] Fav shows
- [✅] create authentication and authorization
- [✅] add validation
- [ ] improve error handling
- [ ] complete the tests
- [ ] docker for production
