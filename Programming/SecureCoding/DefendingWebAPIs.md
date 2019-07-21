# Defending Web API's
by SecurityCompass  
Date: Feb 18th 2019

# Index
<!-- TOC depthTo:3 -->

- [Defending Web API's](#defending-web-apis)
- [Index](#index)
- [Authentication and Authorization](#authentication-and-authorization)
    - [Learning Objectives:](#learning-objectives)
    - [REST vs. SOAP](#rest-vs-soap)
    - [Public vs. Private](#public-vs-private)
    - [Types of web API weaknesses](#types-of-web-api-weaknesses)
        - [Public vulnerability](#public-vulnerability)
        - [Common vulnerability](#common-vulnerability)
        - [Private vulnerability](#private-vulnerability)
    - [Centralized and decentralized authentication](#centralized-and-decentralized-authentication)
    - [Design safe RESTful services](#design-safe-restful-services)
        - [Client side](#client-side)
        - [Server side](#server-side)
    - [Token-based authentication (vs. Cookie-based)](#token-based-authentication-vs-cookie-based)
        - [How does it work?](#how-does-it-work)
    - [JSON Web Tokens (JWTs)](#json-web-tokens-jwts)

<!-- /TOC -->

# Authentication and Authorization
## Learning Objectives:
1. Describe *authentication* and *authorization* vulnerabilities that exist in public and private web APIs.
2. Describe *recommended security features* of a RESTful web service.
3. Explain and compare implementations of *token-based authentication* with API keys, OAuth and JSON web tokens.

## REST vs. SOAP
There are 2 basic kinds of Application Programming Interfaces (APIs) used for accessing web services:
* REST (REpresentational State Transfer);
* SOAP (Simple Object Access Protocol);

REST advantages:
* Don't need as many constraints;
* More applicable to communicating with services through HTTP.

## Public vs. Private
* It is important to highlight that not all weaknesses affect both types.

## Types of web API weaknesses
* Public vulnerability
* Common vulnerability
* Private vulnerability

### Public vulnerability
* Public REST services that are not protected can be *farmed*;
* Farmed: 3rd parties collecting and aggregating the API for their own purposes.
* This is how services that track the lowest prices on flight tickets work.
* This makes the REST service susceptible to *high bandwidth* usage and *low service quality*.
* Solution: *API keys* - codes that link users to API services. They enable tracking of abuse and charging for high service usage.
* API keys allow *token-based* authentication (*JSON Web Tokens* or *OAuth*).

**Best practices for API keys:**
* Ensure they are required for every request to a protected endpoint (that's why we usually need to add the key to the request header, but would it make it vulnerable to network sniffing even if the traffic was HTTPS?)
* Revoke keys that violate terms of usage.
* Don't hard code keys into an application (that's why I created *pykeys*).
* Don't include keys in URL or HTTP GET methods as they can be sniffed.
* Don't rely solely on the key to protect sensitive information
* Protect keys in transit and at rest (use keystores and SSL).
* On their own, API keys are more an identification than a security feature.

### Common vulnerability
* Both public and private RESTful web services support HTTP methods such as (GET, POST, DELETE, HEAD, PUT, PATCH etc).
* Changing the method alone can change the behavior of the endpoint even if it was not originally intended to be used as such.
* To solve this, one needs to ensure *authorization controls* are in place.

**Best practices for authorization checks:**
* Ensure the caller has permission to both *access the endpoint* AND to the provided *HTTP verb*.
* Apply *whitelisting* techniques for permitted *HTTP verbs*.
* Authorize clients.
* Limit administrative and management functions.
* Do not expose *management endpoints* through the internet.
* Use multi-factor authentication for admin functions.
* Use different hosts or ports for management endpoints.
* Use a secure authentication mechanism for 3rd parties that access the API.

### Private vulnerability
The change of monolithic to micro-services based deployments create the need to change the method of doing access control. So it comes the *Identity Provider (IdP)*. One login == multiple services.

## Centralized and decentralized authentication
* Decentralized: one identity trusted by everyone.
* Centralized: each service keeps a list of users.

* Decentralized identity providers, like OpenID, are known as *Relying Parties* that trust one another.
* Delegation is when one website delegates its authentication to a preselected site.
* Federation is when a site can use any compatible account to authenticate.

* *OpenID Connect (OIDC)* is an authentication layer on top of the *Open Standard Authorization OAuth2.0*. Using OAuth for authentication is a misuse of technology as it was built for authorization only.

## Design safe RESTful services
### Client side
* Handles user interfaces and states.
* Developed independently from the server side.
* Use client certificate authentication with TLS for critical web services (like financial apps).
* Ensure session tokens are protected on both client and server side.

### Server side
* Handles data storage, database connections and business logic.
* Authenticate and authorize requests on the server side.
* Use timestamps (sent request vs. current) to reduce change of replay attacks.
* Use HTTP access control to allow access only from trusted URLs.
* Design secure session management and use session tokens to protect session state.

## Token-based authentication (vs. Cookie-based)
Advantages of token-based:
* Cookie-based tends to create overhead -> scalability issues.
* *Cross-Origin Resource Sharing (CORS)* uses AJAX calls to fetch resources from different places and can have issues with cookie-based auth.
* Token-based is stateless >> no need to store authentication information on the server >> higher scalability.
* Token generation and verification can be decoupled (generation handled by an IdP).
* Fine-grained access control for roles, permissions and resources: JWT token and OAuth.
* CORS: with user information embedded in a JWT token and transmitted inside an authorization header, you can perform AJAX calls for any to any server, on any domain, securely.
* CSRF resistant: since we don't use a session cookie, it's more difficult to forge a request.
* Content Delivery Network (CDN): all resources of the app, including HTML, JavaScript and images can be served using CDNs. The authenticated part of the application, including user data, can be served using the Web API on your server.
* Performance: finding a session on a database takes longer than calculating the signature (HMAC with SHA256) on a JWT token.
* Standardization: JWT is a standard so your API can be used by others designed to work with JWTs.

### How does it work?
1. User enters login/password.
2. Web API server validates credentials and issues a signed token.
3. Each user request is sent with the signed token.
4. Server responds each request after validating token.

## JSON Web Tokens (JWTs)
To be continued...
