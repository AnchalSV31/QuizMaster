import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Mock student data
    const mockStudents = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        joinDate: '2024-01-15',
        status: 'active',
        quizzesAttempted: 15,
        averageScore: 85,
        lastActive: '2024-02-10'
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        joinDate: '2024-01-20',
        status: 'active',
        quizzesAttempted: 12,
        averageScore: 78,
        lastActive: '2024-02-09'
      },
      {
        id: 3,
        name: 'Carol Williams',
        email: 'carol@example.com',
        joinDate: '2024-02-01',
        status: 'active',
        quizzesAttempted: 8,
        averageScore: 92,
        lastActive: '2024-02-11'
      },
      {
        id: 4,
        name: 'David Brown',
        email: 'david@example.com',
        joinDate: '2023-12-10',
        status: 'inactive',
        quizzesAttempted: 25,
        averageScore: 73,
        lastActive: '2024-01-15'
      },
      {
        id: 5,
        name: 'Emma Davis',
        email: 'emma@example.com',
        joinDate: '2024-01-25',
        status: 'active',
        quizzesAttempted: 10,
        averageScore: 88,
        lastActive: '2024-02-11'
      },
      {
        id: 6,
        name: 'Frank Miller',
        email: 'frank@example.com',
        joinDate: '2024-02-05',
        status: 'active',
        quizzesAttempted: 5,
        averageScore: 65,
        lastActive: '2024-02-10'
      }
    ];
    setStudents(mockStudents);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
      setSelectedStudent(null);
      alert('Student deleted successfully!');
    }
  };

  const handleToggleStatus = (studentId) => {
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
    ));
  };

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-5xl font-bold mb-4 gradient-text">
            Manage Students
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            View and manage student accounts and performance
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Students', value: students.length, icon: '👥', color: 'from-primary-500 to-primary-400' },
            { label: 'Active', value: students.filter(s => s.status === 'active').length, icon: '✅', color: 'from-green-500 to-emerald-400' },
            { label: 'Inactive', value: students.filter(s => s.status === 'inactive').length, icon: '⏸️', color: 'from-gray-500 to-gray-400' },
            { label: 'Avg. Score', value: Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length) + '%', icon: '📊', color: 'from-accent-cyan to-blue-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{stat.icon}</div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20`} />
              </div>
              <div className="font-display text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-primary-500'
                    : 'bg-dark-bg border-2 border-dark-border hover:border-primary-500/50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'active'
                    ? 'bg-green-500'
                    : 'bg-dark-bg border-2 border-dark-border hover:border-green-500/50'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  filterStatus === 'inactive'
                    ? 'bg-gray-500'
                    : 'bg-dark-bg border-2 border-dark-border hover:border-gray-500/50'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Quizzes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Avg. Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Last Active</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="border-t border-dark-border hover:bg-dark-bg/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-cyan to-primary-500 flex items-center justify-center">
                          <span className="font-bold">{student.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{student.name}</div>
                          <div className="text-sm text-gray-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{student.joinDate}</td>
                    <td className="px-6 py-4 text-sm">{student.quizzesAttempted}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        student.averageScore >= 80
                          ? 'text-green-400'
                          : student.averageScore >= 60
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}>
                        {student.averageScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{student.lastActive}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="text-accent-cyan hover:underline text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleToggleStatus(student.id)}
                          className="text-yellow-400 hover:underline text-sm"
                        >
                          {student.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-accent-coral hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No students found matching your criteria
            </div>
          )}
        </motion.div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold gradient-text">
                  Student Details
                </h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-cyan to-primary-500 flex items-center justify-center">
                    <span className="text-3xl font-bold">{selectedStudent.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-gray-400">{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-dark-bg rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Status</div>
                    <div className={`font-semibold ${
                      selectedStudent.status === 'active' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {selectedStudent.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="bg-dark-bg rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Join Date</div>
                    <div className="font-semibold">{selectedStudent.joinDate}</div>
                  </div>
                  <div className="bg-dark-bg rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Quizzes Attempted</div>
                    <div className="font-semibold text-2xl">{selectedStudent.quizzesAttempted}</div>
                  </div>
                  <div className="bg-dark-bg rounded-xl p-4">
                    <div className="text-gray-400 text-sm mb-1">Average Score</div>
                    <div className="font-semibold text-2xl text-accent-cyan">
                      {selectedStudent.averageScore}%
                    </div>
                  </div>
                  <div className="bg-dark-bg rounded-xl p-4 col-span-2">
                    <div className="text-gray-400 text-sm mb-1">Last Active</div>
                    <div className="font-semibold">{selectedStudent.lastActive}</div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="btn-primary flex-1">
                    View Quiz History
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(selectedStudent.id)}
                    className="btn-secondary flex-1"
                  >
                    {selectedStudent.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
