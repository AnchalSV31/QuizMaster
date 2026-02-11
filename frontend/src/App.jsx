import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuizList from './pages/QuizList';
import QuizAttempt from './pages/QuizAttempt';
import Result from './pages/Result';
import AdminDashboard from './pages/AdminDashboard';
import CreateQuiz from './pages/CreateQuiz';
import Settings from './pages/Settings';
import ManageStudents from './pages/ManageStudents';
import ViewAnalytics from './pages/ViewAnalytics';
import QuizDetails from './pages/QuizDetails';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl gradient-text font-display">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/quizzes" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <QuizList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/quiz/:id"
          element={
            <ProtectedRoute>
              <QuizAttempt />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute adminOnly>
              <Settings />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute adminOnly>
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute adminOnly>
              <ViewAnalytics />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/quiz/:id"
          element={
            <ProtectedRoute adminOnly>
              <QuizDetails />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
