# Nodejs MYSQL REST API

### Documentation

```
SignUp
POST baseUrl/api/signUp {name,lastname,email,password, profilepic, username}

Login
POST baseUrl/api/login {email,password}

Get user data
GET baseUrl/api/user

ADD favorite
POST baseUrl/api/favorite { media_type, media_id, backdrop,showname,year,duration,score,poster,}

DELETE favorite
DELETE baseUrl/api/favorite/<<fav_id>>

GET user favs
GET baseUrl/api/favorite
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
