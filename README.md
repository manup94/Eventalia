# PROYECTO SEGUNDO MODULO DE: MANUEL PEREZ PRADO & ANA GUARDADO FLORES


## Introduction
In this proyect we are going to make a web about events and festivals near you. 

You can look for the nearest events in the maps, you can also book them or save them in your profile. There will be a page with a list of all the events were you can see them and also you can open it in detail.

You can only book those events if you are logged in. Only the 'admin' can make new events, delete the events and edit them. We are going to use CRUD , middlewares, routes and models for this proyect. The APIs we are going to use are an event api call PredictHQ and Google Maps.


## Endpoints we are going to use

Theres are the endpoints that we are going to use in our proyect:

| METHOD | PATH | Description | JSON |
| ---    | ---  | -----       | ---  |
| GET    | `/`    | Index |     |      |
| GET    | `/user/profile`    | Profile |     |      |
| GET    | `/auth/signup` | Sign up | |
| POST   | `/auth/signup` | Sign up | |
| GET    | `/auth/login` | Log in | |
| POST   | `/auth/login` | Log in | |
| GET    | `/auth/logout` | Log out | |
| GET    | `/event/list` | Event list | |
| GET    | `/event/event-create` | New event render | |
| POST   | `/event/event-create` | New event handler | |
| GET    | `/event/:_id` | Event details | |
| GET    | `/event/:_id/edit` | Edit event render | |
| POST   | `/event/:_id/edit` | Edit event handler | |
| POST   | `/event/:_id/delete` | Delete event | |
| GET    | `/api/event` | Event list | X |
| POST   | `/api/event/:_id` | Event details | X |