# REST

REST stands for 'Representational State Transfer'
REST is an architectural style for distributed hypermedia systems.
It's basically a set of guidelines for how a client + server should communicate and perform CRUD operations on a given resource. 

### The main idea of REST is treating data on the server-side as resources that can be CRUDed

The most common ways of approaching REST is in formatting the URLs and HTTP verbs in your applications. 

A resources is some entity that we are going to provide access to via HTTP. 

https://en.wikipedia.org/wiki/Representational_state_transfer

https://www.ics.uci.edu/~fielding/pubs/dissertation/top.html

## An example of using comments as a resource

| NAME | PATH | VERB | PURPOSE | 
| --- | --- | --- | --- |
| Index | /comments | GET | Display all comments |
| New | /comments/new | GET | Form to create new comment | 
| Create | /comments | POST | Creates new comment on server | 
| Show | /comments/:id | GET | Details for one specific comment | 
| Edit | /comments/:id/edit | GET | Form to edit specific comment | 
| Update | /comments/:id | PATCH | Updates specific comment on server | 
| Destroy | /comments/:id | DELETE | Deletes specific item on server | 

## `index.ejs`
'index' is just a term generally used. Every resource can have an index, the goal is to show ALL of a resource (not literally ALL) but the overall purpose for a given resource is to render MULTIPLE of that resource.

---
##### *from Colt Steele's Web Development Bootcamp 2021*