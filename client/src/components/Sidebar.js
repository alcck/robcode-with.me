import React from 'react';

const Sidebar = ({ lessons = [], currentLessonId, onSelectLesson }) => {
  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col h-[calc(100vh-73px)] p-4">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
        Curriculum Lessons
      </div>
      
      <div className="space-y-1.5 overflow-y-auto flex-1 pr-1">
        {lessons.length > 0 ? (
          lessons.map((lesson) => {
            const isActive = lesson._id === currentLessonId;
            return (
              <button
                key={lesson._id}
                onClick={() => onSelectLesson(lesson._id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="truncate">{lesson.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold shrink-0 ml-2 ${
                  lesson.difficulty === 'Beginner' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                  lesson.difficulty === 'Intermediate' ? 'bg-yellow-950 text-yellow-400 border border-yellow-800' :
                  'bg-red-950 text-red-400 border border-red-800'
                }`}>
                  {lesson.difficulty}
                </span>
              </button>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 px-2 py-4 italic">No lessons loaded yet.</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;