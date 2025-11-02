# 🚗 Smart Parking Backend

A simple and efficient backend system for managing smart parking operations.

##  Installation & Setup Guide
https://github.com/shariar-rootdevs/smart-parking-backend.git
cd smart-parking-backend

##  create an .env file exactly like .env.example and give values to these 
MONGO_URI=
PORT=


##  Install dependencies
npm install

## Seed initial data
npm run seed

## Start the server
npm start

🚀 API Endpoints
1. Get Parking Status
Method: GET
URL: http://localhost:8080/parking/status

2. Allocate Parking Spot
Method: POST
URL: http://localhost:8080/parking/allocate

Sample Request Body:

{
  "vehicleType": "standard",
  "customerType": "handicapped",
  "preferredLevel": 1
}

3. Release Parking Spot
Method: PUT
URL: http://localhost:8080/parking/:id/release

Path Parameter:
id → Parking spot ID to be released

Example:
http://localhost:8080/parking/12/release


