import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ResidentsList from "./components/tables/ResidentsList";
import ProgramsList from './components/tables/ProgramsList';
import ApolloAppProvider from './ApolloProvider';
import Header from './components/common/Header';

function App() {
    return (
        <div className="App">
            <ApolloAppProvider>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/residents" element={<ResidentsList/>}/>
                        <Route path="/programs" element={<ProgramsList/>}/>
                        <Route path="/" element={<ResidentsList/>}/>
                    </Routes>
                </Router>
            </ApolloAppProvider>
        </div>
    );
}

export default App;
