import ReactDOM from 'react-dom';
import React from 'react';
import Party from './components/Party'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';


ReactDOM.render(<Router><Party /></Router>, document.getElementById('root'));
