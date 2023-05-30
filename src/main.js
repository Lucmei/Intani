import './styles/main.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ThreeSidedLayout from './threeSidedView.js';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(<ThreeSidedLayout />);

// hotfixes true
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}


