import { ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content: ReactNode;
  icon?: ReactNode;
  type: 'browser' | 'system' | 'chat';
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export enum AppId {
  TRACKING = 'tracking',
  RETURNS = 'returns',
  EDD = 'edd',
  PRICING = 'pricing',
  SOLUTIONS = 'solutions',
  BLOG = 'blog',
  README = 'readme'
}