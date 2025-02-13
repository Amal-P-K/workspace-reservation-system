 **Workspace Reservation System**  

A backend system built with Express.js and MySQL that allows employees to book a meeting room with a multi-level approval process (Manager → Admin).  



Features
✔ Employees can request a booking.  
✔ Team Manager approves or rejects the request.  
✔ Admin makes the final approval.  
✔ Uses MySQL as the database.  



Tech Stack  
Backend: Node.js, Express.js  
Database: MySQL  
Authentication: User ID-based access control  


API Endpoints 

| Method | Endpoint         | Description                               |
|--------|----------------- |------------------------------------------ |
| POST   | `/api/register`  | Register a new Employee, Manager, or Admin|
| POST   | `/api/login`     | Login and get a token (User ID)           |
| POST   | `/api/bookings`  | Employee requests a room booking          |
| GET    | `/api/bookings`  | List all booking requests                 |
| PATCH  | `/api/approve`   | Manager/Admin approves/rejects booking    |

Demo Videos



Uploading demo.mp4…


Setup & Installation  
To run the project locally, follow these steps:  

# Clone the repository
git clone https://github.com/your-username/workspace-reservation-system.git

# Navigate to the project directory
cd workspace-reservation-system

# Install dependencies
npm install

# Start the server
node src/app.js

