import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Note from './components/Note';
import SearchFilter from './components/SearchFilter';
import "bootstrap-css-only/css/bootstrap.min.css";
import NavBarPage from "./components/NavBarPage";




ReactDOM.render(
    <Router>
        <div>
            <Route exact path ='/' component={App}/>
            <Route path ='/edit/:id' component={Edit}/>
            <Route path ='/create' component={Create}/>
            <Route path ='/show/:id' component={Show}/>
            <Route path='/note/' component={Note}/>
            <Route path='/create' component={NavBarPage}/>
            <Route path='/searchFilter/' component={SearchFilter}/>

        </div>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
