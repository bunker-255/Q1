import React from 'react';
import { Clock, Shield, BarChart, ChevronRight } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group relative bg-slate-900/50 border border-slate-800 hover:border-green-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col h-full">
      {/* Image Overlay */}
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
        <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur border border-green-500/30 px-2 py-1 rounded text-xs font-mono text-green-400">
            {course.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-20">
        <div className="flex gap-2 mb-3 flex-wrap">
            {course.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-slate-800 text-slate-400 group-hover:bg-green-900/30 group-hover:text-green-400 transition-colors">
                    {tag}
                </span>
            ))}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
            {course.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
            {course.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 mb-4">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
                <BarChart size={14} className="text-fuchsia-500" />
                <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Clock size={14} className="text-blue-500" />
                <span>{course.duration}</span>
            </div>
        </div>

        <button className="w-full py-3 bg-slate-800 hover:bg-green-600 text-white hover:text-black font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4 rounded">
            <span>Доступ к данным</span>
            <ChevronRight size={16} />
        </button>
      </div>

      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  );
};

export default CourseCard;