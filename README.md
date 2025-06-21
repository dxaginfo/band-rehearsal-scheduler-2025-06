# Band Rehearsal Scheduler

A comprehensive web application to help musicians and bands efficiently schedule and manage their rehearsal sessions. It automates the process of finding suitable rehearsal times based on members' availability, sends reminders, tracks attendance, and suggests optimal rehearsal times based on historical data.

## 🎵 Features

### User Authentication and Group Management
- Create band profiles and invite members
- Join multiple bands with different roles
- Manage band member permissions

### Availability Management
- Set recurring availability schedules
- Mark specific dates/times as unavailable
- Sync with external calendars (Google, Apple, etc.)

### Rehearsal Scheduling
- View overlapping availability of all members
- Schedule rehearsals at optimal times
- Specify location, duration, and goals for each session

### Notifications and Reminders
- Receive alerts for new rehearsal schedules
- Get timely reminders before upcoming rehearsals
- Customize notification preferences (email, push, SMS)

### RSVP and Attendance Tracking
- Respond to rehearsal invitations
- Track attendance history
- Identify consistent attendance patterns

### Intelligent Scheduling Suggestions
- Get AI-powered suggestions for optimal rehearsal times
- Analyze patterns in attendance and availability
- Optimize scheduling for maximum participation

### Rehearsal Notes and Resources
- Attach setlists or music sheets to events
- Add and share rehearsal notes
- Access historical rehearsal information

## 🚀 Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI for consistent, responsive components
- Redux Toolkit for state management
- FullCalendar.js for interactive scheduling
- Formik with Yup validation

### Backend
- Node.js with Express
- RESTful API architecture
- JWT for authentication
- Socket.io for real-time notifications

### Database
- PostgreSQL for relational data
- Redis for caching and performance

### DevOps
- Docker containerization
- GitHub Actions for CI/CD
- AWS hosting (EC2, RDS, S3)
- Sentry for error tracking

## 🔧 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL
- Redis

### Setup Instructions
1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-2025-06.git
   cd band-rehearsal-scheduler-2025-06
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   ```bash
   # In the server directory, create a .env file
   cp .env.example .env
   # Edit the .env file with your database credentials and other configurations
   ```

4. Initialize the database
   ```bash
   cd server
   npm run db:migrate
   npm run db:seed # Optional: Add sample data
   ```

5. Start the development servers
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In a new terminal, start the frontend server
   cd client
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## 🐳 Docker Deployment

For production deployment, we provide Docker configuration:

```bash
# Build and start all services
docker-compose up -d

# To stop all services
docker-compose down
```

## 📱 Mobile Responsiveness

The application is designed to be fully responsive and works seamlessly on:
- Desktop browsers
- Tablets
- Mobile phones

## 🔒 Security Features

- Secure user authentication with JWT
- HTTPS encryption for all communications
- Role-based access control
- Input validation to prevent SQL injection
- Regular security audits

## 🔄 Integration Capabilities

- Calendar Services: Google Calendar, Apple Calendar, Outlook
- Music Industry Tools: Spotify, Soundcloud, Bandcamp
- Communication Tools: Discord, Slack, Email services

## 📊 Project Structure

```
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── api/            # API service calls
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux store setup
│   │   ├── styles/         # Global styles
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main app component
│   └── package.json        # Frontend dependencies
│
├── server/                 # Node.js backend
│   ├── src/                # Source code
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Express middlewares
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── app.js          # Express app setup
│   └── package.json        # Backend dependencies
│
├── docker-compose.yml      # Docker services configuration
├── .github/                # GitHub Actions workflows
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## 📝 Contributing

We welcome contributions to the Band Rehearsal Scheduler! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

Please make sure your code follows our coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Acknowledgments

- [FullCalendar.js](https://fullcalendar.io/) for the powerful calendar interface
- [Material-UI](https://material-ui.com/) for the beautiful React components
- All the musicians who provided valuable feedback during development