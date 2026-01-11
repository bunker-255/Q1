import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';
import { CommandLog, TerminalStatus } from '../types';

const COMMANDS = [
  { cmd: 'nmap -sV target.corp', label: 'Network Scan' },
  { cmd: 'sqlmap -u "target.corp/id=1"', label: 'SQL Injection' },
  { cmd: 'hydra -l admin -P pass.txt ssh', label: 'Brute Force' },
];

const TerminalDemo: React.FC = () => {
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [status, setStatus] = useState<TerminalStatus>(TerminalStatus.IDLE);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runCommand = (cmd: string) => {
    if (status === TerminalStatus.RUNNING) return;

    setStatus(TerminalStatus.RUNNING);
    setLogs(prev => [...prev, { command: cmd, output: [] }]);

    let outputLines: string[] = [];
    let duration = 0;

    if (cmd.includes('nmap')) {
      outputLines = [
        'Starting Nmap 7.92 ( https://nmap.org )',
        'Nmap scan report for target.corp (192.168.1.10)',
        'Host is up (0.0023s latency).',
        'PORT    STATE SERVICE VERSION',
        '22/tcp  open  ssh     OpenSSH 8.2p1',
        '80/tcp  open  http    Apache httpd 2.4.41',
        '443/tcp open  ssl/http Apache httpd 2.4.41',
        'Service detection performed.',
      ];
      duration = 2000;
    } else if (cmd.includes('sqlmap')) {
      outputLines = [
        '[INFO] testing connection to the target URL',
        '[INFO] testing if the target URL is stable',
        '[INFO] testing if GET parameter "id" is dynamic',
        '[WARNING] heuristic (basic) test shows that GET parameter "id" might not be injectable',
        '[INFO] testing for SQL injection',
        '[CRITICAL] parameter "id" appears to be vulnerable to SQL injection!',
        'Type: boolean-based blind',
        'Title: AND boolean-based blind - WHERE or HAVING clause',
      ];
      duration = 2500;
    } else if (cmd.includes('hydra')) {
      outputLines = [
        '[DATA] attacking ssh://192.168.1.10:22/',
        '[Attempt 1] login: admin   password: 123456',
        '[Attempt 2] login: admin   password: password',
        '[Attempt 3] login: admin   password: qwerty',
        '[SUCCESS] login: admin   password: masterkey123',
        '1 of 1 target successfully completed',
      ];
      duration = 3000;
    }

    // Simulate async output
    let currentLine = 0;
    const interval = setInterval(() => {
        if (currentLine < outputLines.length) {
            const line = outputLines[currentLine];
            setLogs(prev => {
                const newLogs = [...prev];
                const lastLog = newLogs[newLogs.length - 1];
                lastLog.output = [...lastLog.output, line];
                return newLogs;
            });
            currentLine++;
        } else {
            clearInterval(interval);
            setStatus(TerminalStatus.SUCCESS);
        }
    }, duration / outputLines.length);
  };

  const clearTerminal = () => {
    setLogs([]);
    setStatus(TerminalStatus.IDLE);
  };

  return (
    <div className="w-full max-w-3xl mx-auto border border-slate-800 bg-slate-950/80 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-green-500" />
          <span className="text-xs font-mono text-slate-400">root@kali:~</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>

      {/* Output Area */}
      <div 
        ref={scrollRef}
        className="h-80 overflow-y-auto p-4 font-mono text-sm space-y-2 scroll-smooth"
      >
        <div className="text-slate-500 mb-4">
          ZeroDay OS v1.0.4 <br/>
          Type 'help' for available commands or use the shortcuts below.
        </div>
        
        {logs.map((log, i) => (
          <div key={i} className="space-y-1 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-green-500">➜</span>
              <span className="text-blue-400">~</span>
              <span>{log.command}</span>
            </div>
            {log.output.map((line, j) => (
              <div key={j} className={`pl-6 ${line.includes('[CRITICAL]') || line.includes('[SUCCESS]') ? 'text-green-400 font-bold' : 'text-slate-400'}`}>
                {line}
              </div>
            ))}
          </div>
        ))}

        {status === TerminalStatus.RUNNING && (
             <div className="pl-6 text-green-500 animate-pulse">_</div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-500 w-full mb-1 uppercase tracking-wider">Quick Actions:</span>
            {COMMANDS.map((c) => (
                <button
                    key={c.label}
                    onClick={() => runCommand(c.cmd)}
                    disabled={status === TerminalStatus.RUNNING}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-green-900/30 border border-slate-700 hover:border-green-500/50 text-slate-300 hover:text-green-400 text-xs font-mono transition-all rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Play size={10} />
                    {c.label}
                </button>
            ))}
            <button
                onClick={clearTerminal}
                className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-400 text-xs font-mono transition-all rounded"
            >
                <RotateCcw size={10} />
                Clear
            </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalDemo;