import React, { useState, useEffect } from 'react';
import API from '../services/api';

const TeacherView = () => {
  const [lessons, setLessons] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' or 'submissions'
  
  // New lesson form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [language, setLanguage] = useState('javascript');
  const [starterCode, setStarterCode] = useState('// Write your code here\n');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch lessons and submissions on load
  useEffect(() => {
    fetchLessons();
    fetchSubmissions();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await API.get('/lessons');
      setLessons(res.data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await API.get('/submissions');
      setSubmissions(res.data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await API.post('/lessons', { title, description, difficulty, language, starterCode });
      setMessage('Lesson created successfully!');
      setTitle('');
      setDescription('');
      setStarterCode('// Write your code here\n');
      fetchLessons();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create lesson.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header & Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Teacher Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your coding curriculum and review student submissions.</p>
        </div>
        
        <div className="flex space-x-2 bg-gray-900 p-1 rounded-xl border border-gray-800 self-start">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'lessons'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Curriculum Lessons
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'submissions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            Student Submissions
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-xl text-sm">
          {message}
        </div>
      )}

      {activeTab === 'lessons' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Lesson Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4 lg:col-span-1">
            <h2 className="text-lg font-bold text-white">Create New Lesson</h2>
            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Lesson Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g., Arrays and Loops"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description / Instructions</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Describe the coding challenge..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Starter Code</label>
                <textarea
                  value={starterCode}
                  onChange={(e) => setStarterCode(e.target.value)}
                  rows={4}
                  className="w-full font-mono bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-md text-sm cursor-pointer"
              >
                {loading ? 'Publishing...' : 'Publish Lesson'}
              </button>
            </form>
          </div>

          {/* Existing Lessons List */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-white">Existing Curriculum ({lessons.length})</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <div key={lesson._id} className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{lesson.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{lesson.description}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-lg uppercase font-bold shrink-0 ml-4 ${
                      lesson.difficulty === 'Beginner' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-950 text-yellow-400 border border-yellow-800' :
                      'bg-red-950 text-red-400 border border-red-800'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm py-12 text-center italic">No lessons created yet. Use the form to add one.</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Submissions View */
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white">Student Submissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs font-semibold text-gray-400 uppercase">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Lesson</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Output / Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-gray-950/50">
                      <td className="py-3 px-4 font-medium text-white">{sub.student?.name || 'Anonymous'}</td>
                      <td className="py-3 px-4 text-gray-300">{sub.lesson?.title || 'Coding Exercise'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                          sub.status === 'Passed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          'bg-red-950 text-red-400 border border-red-800'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-gray-400 truncate max-w-xs">{sub.output}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-gray-500 italic">No student submissions recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherView;