<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <h1>World Disease Tracking Web Application</h1>
  <p>
    A full-stack, microservices-based platform to track global disease data, maintain user watchlists, and manage authentication—all accessible through a web application.
  </p>

  <hr />

  <h2>Table of Contents</h2>
  <ol>
    <li><a href="#project-overview">Project Overview</a></li>
    <li><a href="#architecture--tech-stack">Architecture & Tech Stack</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#repository-structure">Repository Structure</a></li>
    <li>
      <a href="#setup--installation">Setup & Installation</a>
      <ol type="a">
        <li><a href="#1-clone-the-repository">1. Clone the Repository</a></li>
        <li>
          <a href="#2-backend-services-spring-boot-microservices">2. Backend Services (Spring Boot Microservices)</a>
          <ol type="i">
            <li><a href="#21-eureka-discovery-server">2.1 Eureka Discovery Server</a></li>
            <li><a href="#22-mysql--mongodb-configuration">2.2 MySQL & MongoDB Configuration</a></li>
            <li><a href="#23-running-individual-microservices">2.3 Running Individual Microservices</a></li>
          </ol>
        </li>
        <li><a href="#3-frontend-application-angular">3. Frontend Application (Angular)</a></li>
      </ol>
    </li>
    <li><a href="#using-the-application">Using the Application</a></li>
    <li><a href="#common-troubleshooting">Common Troubleshooting</a></li>
  </ol>

  <hr />

  <h2 id="project-overview">Project Overview</h2>
  <p><strong>World Disease Tracking</strong> is designed to:</p>
  <ul>
    <li>Fetch and display global disease statistics (via an external-API microservice).</li>
    <li>Allow users to register, log in, and manage a “watchlist” of diseases/countries.</li>
    <li>Provide a responsive Angular UI (maps, charts, tables).</li>
    <li>Use Eureka for service discovery, with a Gateway routing layer for all HTTP traffic.</li>
    <li>Store user data in MySQL and watchlist/disease records in MongoDB.</li>
  </ul>

  <hr />

  <h2 id="architecture--tech-stack">Architecture & Tech Stack</h2>

  <img width="573" alt="Screenshot 2025-06-06 at 5 16 44 AM" src="https://github.com/user-attachments/assets/41b73147-afe4-415a-8e40-ab806b955d16" />


  <h3>Backend (Java - Spring Boot)</h3>
  <ul>
    <li><strong>Eureka Discovery Server:</strong> Manages service registration/lookup.</li>
    <li><strong>API Gateway:</strong> Spring Cloud Gateway routes traffic to downstream services.</li>
    <li><strong>Authentication Service:</strong> Handles user registration, login (JWT tokens), password resets, backed by MySQL.</li>
    <li><strong>External-API Service:</strong> Fetches global disease data from a public source (e.g., third-party API) and caches in MongoDB.</li>
    <li><strong>Watchlist Service:</strong> Manages user-specific watchlist entries in MongoDB.</li>
  </ul>
  <p><strong>Tech Stack:</strong></p>
  <ul>
    <li>Spring Boot 2.7.0</li>
    <li>Spring Cloud 2021.0.3</li>
    <li>Spring Data JPA (MySQL)</li>
    <li>Spring Data MongoDB</li>
    <li>Netflix Eureka</li>
    <li>Spring Cloud Gateway</li>
  </ul>

  <h3>Frontend (Angular 13)</h3>
  <ul>
    <li><strong>UI Framework:</strong> Angular, PrimeNG, Angular Material</li>
    <li><strong>State Management:</strong> Angular services + localStorage</li>
    <li><strong>Charts & Maps:</strong> Leaflet, Chart.js</li>
    <li><strong>Notifications:</strong> ngx-toastr</li>
    <li><strong>Routing:</strong> Angular Router with lazy-loaded modules</li>
  </ul>

  <hr />

  <h2 id="prerequisites">Prerequisites</h2>
  <p>Ensure the following software is installed:</p>
  <ul>
    <li>Java JDK 11 or higher</li>
    <li>Maven 3.6+</li>
    <li>Node.js 14+ & npm 6+</li>
    <li>Angular CLI 13+ (optional but recommended)</li>
    <li>MySQL 8.x</li>
    <li>MongoDB 6.x</li>
    <li>Git</li>
  </ul>

  <hr />

  <h2 id="repository-structure">Repository Structure</h2>
  <pre><code>world_disease_tracking_app/
├── covid19-app-frontend/        # Angular frontend application
├── covid19-project/             # Backend microservices
│   ├── authentication-service/  # User authentication service
│   ├── external-api-service/    # External API integration service
│   ├── watchlist-service/       # User watchlist management service
│   ├── api-gateway/             # API Gateway for routing
│   └── discovery-service/       # Eureka Discovery Server
</code></pre>

  <hr />

  <h2 id="setup--installation">Setup & Installation</h2>

  <h3 id="1-clone-the-repository">1. Clone the Repository</h3>
  <pre><code>git clone https://github.com/Jayanth-reflex/world_disease_tracking_app.git
cd world_disease_tracking_app</code></pre>

  <h3 id="2-backend-services-spring-boot-microservices">2. Backend Services (Spring Boot Microservices)</h3>

  <h4 id="21-eureka-discovery-server">2.1 Eureka Discovery Server</h4>
  <pre><code>cd covid19-project/discovery-service
mvn clean install
mvn spring-boot:run</code></pre>

  <h4 id="22-mysql--mongodb-configuration">2.2 MySQL & MongoDB Configuration</h4>
  <ul>
    <li>Create a MySQL database named <code>userdb</code>.</li>
    <li>Update MySQL credentials in <code>application.properties</code> inside <code>authentication-service</code>.</li>
    <li>Ensure MongoDB is running on the default port.</li>
  </ul>

  <h4 id="23-running-individual-microservices">2.3 Running Individual Microservices</h4>
  <pre><code>cd covid19-project/&lt;service-name&gt;
mvn clean install
mvn spring-boot:run</code></pre>

  <h3 id="3-frontend-application-angular">3. Frontend Application (Angular)</h3>
  <pre><code>cd covid19-app-frontend
npm install
ng serve</code></pre>
  <p>Visit: <a href="http://localhost:4200">http://localhost:4200</a></p>

  <hr />

  <h2 id="using-the-application">Using the Application</h2>
  <ol>
    <li>Register a new account.</li>
    <li>Log in using your credentials.</li>
    <li>View global disease data on maps and charts.</li>
    <li>Add/remove countries or diseases to/from your personal watchlist.</li>
  </ol>

  <hr />

  <h2 id="common-troubleshooting">Common Troubleshooting</h2>
  <ul>
    <li><strong>Port Conflicts:</strong> Make sure default ports (e.g., 8080, 8761) are not occupied.</li>
    <li><strong>DB Connections:</strong> Check that MySQL and MongoDB are running and credentials are valid.</li>
    <li><strong>CORS Issues:</strong> Verify API Gateway allows frontend origin (adjust CORS settings if needed).</li>
  </ul>

  <hr />

  <hr />

  <hr />
</body>
</html>
