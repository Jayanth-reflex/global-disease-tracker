# World Disease Tracking Web Application

A full-stack, microservices-based platform to track global disease data, maintain user watchlists, and manage authentication—all accessible through an Angular single-page application.

---

### Table of Contents

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Section</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><a href="#project-overview">Project Overview</a></td>
    </tr>
    <tr>
      <td>2</td>
      <td><a href="#architecture--tech-stack">Architecture & Tech Stack</a></td>
    </tr>
    <tr>
      <td>3</td>
      <td><a href="#prerequisites">Prerequisites</a></td>
    </tr>
    <tr>
      <td>4</td>
      <td><a href="#repository-structure">Repository Structure</a></td>
    </tr>
    <tr>
      <td>5</td>
      <td><a href="#setup--installation">Setup & Installation</a></td>
    </tr>
    <tr>
      <td>5.1</td>
      <td><a href="#1-clone-the-repository">1. Clone the Repository</a></td>
    </tr>
    <tr>
      <td>5.2</td>
      <td><a href="#2-backend-services-spring-boot-microservices">2. Backend Services (Spring Boot Microservices)</a></td>
    </tr>
    <tr>
      <td>5.2.1</td>
      <td><a href="#21-eureka-discovery-server">2.1 Eureka Discovery Server</a></td>
    </tr>
    <tr>
      <td>5.2.2</td>
      <td><a href="#22-mysql--mongodb-configuration">2.2 MySQL &amp; MongoDB Configuration</a></td>
    </tr>
    <tr>
      <td>5.2.3</td>
      <td><a href="#23-running-individual-microservices">2.3 Running Individual Microservices</a></td>
    </tr>
    <tr>
      <td>5.3</td>
      <td><a href="#3-frontend-application-angular">3. Frontend Application (Angular)</a></td>
    </tr>
    <tr>
      <td>6</td>
      <td><a href="#using-the-application">Using the Application</a></td>
    </tr>
  </tbody>
</table>

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
