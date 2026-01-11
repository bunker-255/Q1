import React, { useState } from 'react';
import { Shield, Lock, Terminal, Cpu, Ghost, Menu, X, Github, Twitter } from 'lucide-react';
import GlitchHeader from './components/GlitchHeader';
import CourseCard from './components/CourseCard';
import TerminalDemo from './components/TerminalDemo';
import AiMentor from './components/AiMentor';
import { Course } from './types';

// Mock Data
const COURSES: Course[] = [
  {
    id: '1',
    title: 'Web Penetration Testing',
    level: 'Apprentice',
    duration: '45 часов',
    price: '₽24,900',
    tags: ['OWASP Top 10', 'Burp Suite', 'SQLi'],
    description: 'Полное погружение в безопасность веб-приложений. Научитесь находить и эксплуатировать уязвимости до того, как это сделают злоумышленники.',
    image: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Network Security Master',
    level: 'Master',
    duration: '60 часов',
    price: '₽32,000',
    tags: ['Wireshark', 'Nmap', 'Active Directory'],
    description: 'Взлом и защита корпоративных сетей. Анализ трафика, атаки на Active Directory и построение защищенной архитектуры.',
    image: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    title: 'Python for Ethical Hackers',
    level: 'Novice',
    duration: '30 часов',
    price: '₽19,900',
    tags: ['Scripting', 'Automation', 'Exploits'],
    description: 'Напишите свои собственные инструменты для взлома. От простых сканеров портов до сложных бэкдоров и кейлоггеров.',
    image: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: '4',
    title: 'Social Engineering Ops',
    level: 'Grandmaster',
    duration: '25 часов',
    price: '₽45,000',
    tags: ['OSINT', 'Phishing', 'Psychology'],
    description: 'Самое слабое звено — человек. Искусство манипуляции, сбор информации из открытых источников и создание убедительных фишинговых кампаний.',
    image: 'https://picsum.photos/800/600?random=4'
  }
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans relative">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 group cursor-pointer">
              <Shield className="text-green-500 group-hover:animate-pulse" size={32} />
              <span className="text-2xl font-bold font-mono tracking-tighter text-white">
                ZERO<span className="text-green-500">DAY</span>
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 font-mono text-sm uppercase tracking-widest">
                <a href="#hero" className="hover:text-green-400 transition-colors">Главная</a>
                <a href="#courses" className="hover:text-green-400 transition-colors">Курсы</a>
                <a href="#terminal" className="hover:text-green-400 transition-colors">Терминал</a>
                <a href="#" className="px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 rounded-sm">
                  Войти
                </a>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-green-500">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-b border-green-900 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-mono">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-green-400">Главная</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-green-400">Курсы</a>
              <a href="#terminal" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-green-400">Терминал</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-mono text-xs md:text-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                НОВЫЙ НАБОР ОТКРЫТ: SPRING 2025
            </div>
            
            <GlitchHeader text="Become The" subtext="System Override Initiated..." />
            <GlitchHeader text="Architect" size="xl" />
            
            <p className="mt-8 max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed font-light">
                Мы не учим защищаться. Мы учим <span className="text-white font-bold">мыслить как атакующий</span>. 
                Погрузись в мир этичного хакинга и кибербезопасности на платформе нового поколения.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-black font-bold text-lg uppercase tracking-wider rounded shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1">
                    Начать обучение
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/20 hover:border-green-500 text-white hover:text-green-400 font-bold text-lg uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 group">
                    <Terminal size={20} className="group-hover:text-green-400" />
                    Демо режим
                </button>
            </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: 'Студентов', value: '12,403', icon: Ghost },
                { label: 'Курсов', value: '42+', icon: Lock },
                { label: 'Лабораторок', value: '850+', icon: Cpu },
                { label: 'Трудоустроено', value: '94%', icon: Shield },
            ].map((stat, i) => (
                <div key={i} className="text-center group">
                    <stat.icon className="mx-auto mb-4 text-slate-600 group-hover:text-green-500 transition-colors duration-500" size={32} />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Terminal Demo Section */}
      <section id="terminal" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    <span className="text-green-500">PRACTICE</span> MAKES PERFECT
                </h2>
                <p className="text-slate-400">Наш виртуальный полигон доступен прямо в браузере. Попробуй сейчас.</p>
            </div>
            <TerminalDemo />
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        ELITE <span className="text-fuchsia-500">PROGRAMS</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl">От основ безопасности до продвинутого Red Teaming. Выбери свой путь.</p>
                </div>
                <button className="hidden md:flex items-center gap-2 text-green-500 hover:text-green-400 font-mono uppercase tracking-widest border-b border-green-500/50 hover:border-green-500 pb-1 transition-all">
                    Все курсы <ChevronRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COURSES.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
                <button className="text-green-500 font-bold uppercase tracking-widest">
                    Показать все программы
                </button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="text-white" size={24} />
                        <span className="text-xl font-bold font-mono tracking-tighter text-white">
                            ZERO<span className="text-green-500">DAY</span>
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                        ZeroDay Academy — это не просто курсы. Это сообщество профессионалов, меняющих ландшафт цифровой безопасности. Взламывай системы, чтобы сделать их безопаснее.
                    </p>
                </div>
                
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Навигация</h4>
                    <ul className="space-y-4 text-slate-500 text-sm font-mono">
                        <li><a href="#" className="hover:text-green-500 transition-colors">О нас</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Карьера</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">Блог</a></li>
                        <li><a href="#" className="hover:text-green-500 transition-colors">CTF Турниры</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Legal</h4>
                    <ul className="space-y-4 text-slate-500 text-sm font-mono">
                        <li><a href="#" className="hover:text-fuchsia-500 transition-colors">Условия использования</a></li>
                        <li><a href="#" className="hover:text-fuchsia-500 transition-colors">Политика конфиденциальности</a></li>
                        <li><a href="#" className="hover:text-fuchsia-500 transition-colors">Этический кодекс</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-600 text-xs font-mono">
                    © 2025 ZeroDay Academy Inc. Все права защищены.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                </div>
            </div>
        </div>
        
        {/* Footer Glitch Elements */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </footer>

      {/* AI Mentor Widget */}
      <AiMentor />
    </div>
  );
};

export default App;

function ChevronRight({ size = 24, className = "" }: { size?: number, className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m9 18 6-6-6-6"/>
        </svg>
    );
}