## World Disease Tracking Web Application

A full-stack, microservices-based platform to track global disease data, maintain user watchlists, and manage authentication—all accessible through an Angular single-page application.

---

### Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Prerequisites](#prerequisites)
4. [Repository Structure](#repository-structure)
5. [Setup & Installation](#setup--installation)
   1. [Clone the Repository](#1-clone-the-repository)
   2. [Backend Services (Spring Boot Microservices)](#2-backend-services-spring-boot-microservices)
      1. [Eureka Discovery Server](#21-eureka-discovery-server)
      2. [MySQL & MongoDB Configuration](#22-mysql--mongodb-configuration)
      3. [Running Individual Microservices](#23-running-individual-microservices)
   3. [Frontend Application (Angular)](#3-frontend-application-angular)
6. [Using the Application](#using-the-application)
7. [Common Troubleshooting](#common-troubleshooting)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

**World Disease Tracking** is designed to:

- Fetch and display global disease statistics (via an external-API microservice).
- Allow users to register, log in, and manage a “watchlist” of diseases/countries.
- Provide a responsive Angular UI (maps, charts, tables).
- Use Eureka for service discovery, with a Gateway routing layer for all HTTP traffic.
- Store user data in MySQL and watchlist/disease records in MongoDB.

---

## Architecture & Tech Stack

1. **Backend (Java - Spring Boot)**  
   - **Eureka Discovery Server**: Manages service registration/lookup.  
   - **API Gateway**: Spring Cloud Gateway routes traffic to downstream services.  
   - **Authentication Service**: Handles user registration, login (JWT tokens), password resets, backed by MySQL.  
   - **External-API Service**: Fetches global disease data from a public source (e.g., third-party API) and caches in MongoDB.  
   - **Watchlist Service**: Manages user-specific watchlist entries in MongoDB.  
   - **(Optional) Discovery Service**: If included, handles service discovery endpoints.  
   - **Tech**: Spring Boot 2.7.0, Spring Cloud 2021.0.3, Spring Data JPA (MySQL), Spring Data MongoDB, Netflix Eureka, Spring Cloud Gateway.

2. **Frontend (Angular 13)**  
   - **UI Framework**: Angular, PrimeNG for tables/forms, Angular Material for navigation components.  
   - **State Management**: Built-in Angular services + localStorage (for JWT).  
   - **Charts & Maps**: Leaflet (for world maps), Chart.js (for line/bar charts).  
   - **Notifications**: ngx-toastr.  
   - **Routing**: Angular Router with lazy-loaded modules.

---

## Prerequisites

Before you begin, make sure you have the following installed locally:

- **Java JDK 11** (or higher)  
- **Maven 3.6+**  
- **Node.js 14+ & npm 6+**  
- **Angular CLI 13+** (optional, but recommended)  
- **MySQL 8.x** (or compatible)  
- **MongoDB 6.x Community Edition**  
- **Git** (for cloning)

---

## Repository Structure


