export interface Course {
  id: string;
  title: string;
  level: 'Novice' | 'Apprentice' | 'Master' | 'Grandmaster';
  duration: string;
  price: string;
  tags: string[];
  description: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}

export enum TerminalStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface CommandLog {
  command: string;
  output: string[];
}