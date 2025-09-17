# Vacation Management System

This is a **full-stack vacation management system** for employees and managers. Employees can submit vacation requests, and managers can view, approve, or deny these requests. Additionally, managers can view a calendar of all approved vacations.

The system uses **PostgreSQL** for the database, **PgAdmin** for database management, and **Apache Kafka** for managing the queue of pending vacation requests.

---

## Features

### Employee Dashboard

* Submit vacation requests (start date & end date).
* View all their vacation requests and statuses.
* Logout functionality.

### Manager Dashboard

* View all pending vacation requests.
* Approve or deny vacation requests.
* View a calendar of approved vacations filtered by date range.
* Logout functionality.

### System Architecture

* **Backend:** FastAPI
* **Frontend:** React + Material-UI
* **Database:** PostgreSQL
* **Queue:** Apache Kafka (for handling pending vacation requests)
* **Admin UI for DB:** PgAdmin

---

## Prerequisites

Make sure you have the following installed on your machine:

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

---

## Running the System Locally

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/vacation-management.git
cd vacation-management
```

2. **Prepare the `.env` file** (optional) for custom configuration of database credentials and Kafka settings.

3. **Docker Compose Setup:**

* We use Docker Compose to run all services: PostgreSQL, PgAdmin, Kafka, Zookeeper, and the app backend/frontend.
* Example `docker-compose.yml` structure:

```yaml
version: "3.8"

services:
  db:
    image: postgres:15
    container_name: vacation_db
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
      POSTGRES_DB: vacations
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: vacation_pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - db

  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.0
    container_name: vacation_zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:7.4.0
    container_name: vacation_kafka
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"

volumes:
  postgres_data:
```

4. **Start all services:**

```bash
docker-compose up -d
```

This will start:

* **PostgreSQL** at `localhost:5432`
* **PgAdmin** at `http://localhost:5050` (Login with `admin@admin.com` / `admin`)
* **Kafka** at `localhost:9092`
* **Zookeeper** at `localhost:2181`

5. **Backend & Frontend**

* Start backend FastAPI server (adjust ports as needed):

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* Start frontend React app:

```bash
cd frontend
npm install
npm start
```

Frontend should be available at `http://localhost:3000`.

---

## How Kafka is Used

* **Topic:** `pending-vacations`
* **Producers:** Employee API sends new vacation requests to Kafka.
* **Consumers:** Manager API reads pending requests from Kafka for approval or denial.
* **Goal:** Ensures that vacation requests are queued and processed in order.

---

## Accessing the Database

* **PostgreSQL:** `localhost:5432`, user: `admin`, password: `admin123`, database: `vacations`
* **PgAdmin:** `http://localhost:5050`, use the same credentials. Connect to `vacation_db` inside PgAdmin.

---

## Important Notes

* Make sure ports `5432`, `5050`, `9092`, and `2181` are free. Adjust them in `docker-compose.yml` if needed.
* Docker Compose runs all services in detached mode with `-d`.
* Kafka setup is minimal for local development; in production, you may want a cluster and persistent volumes.

---

This README gives you all the steps to run the system locally and understand its architecture.

---
