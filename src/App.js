import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Container, Modal,} from 'react-bootstrap'

import AuthProvider from './components/Authentication/AuthProvider';
import PrivateRoute from './components/Authentication/PrivateRoute.js';

import NavBar from './components/Navbar/Navbar';
import FontContext from './components/Settings/Font-Context.js';
import FontSize from './components/Settings/FontSize';
import ThemeContext, {Themes} from './components/Settings/Theme-Context';
import Theme from './components/Settings/Theme';

import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Post from './pages/Post.js';
import Request from './pages/Request.js';
import RequestCreate from './pages/RequestCreate.js';
import RequestDetails from './pages/RequestDetails.js';
import Admin from './pages/Admin.js';
import AdminRequestDetails from './pages/AdminRequestDetails.js';

import settingsCog from "./images/settings-cog.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

    const [theme, setTheme] = useState(Themes.main);
    const [show, setShow] = useState(false);
    const [fontSize, setFontSize] = useState(24);
    const [isLoading, setIsLoading] = useState(true);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    useEffect(() => {
        if ((JSON.parse(localStorage.getItem('theme'))) == null) {
            localStorage.setItem('theme', JSON.stringify(Themes.main));
        }
        if ((JSON.parse(localStorage.getItem('fontSize'))) == null) {
            localStorage.setItem('fontSize', JSON.stringify(fontSize));
        }
        const retrievedTheme = JSON.parse(localStorage.getItem('theme'));
        const retrievedFontSize = localStorage.getItem('fontSize');
        setTheme(retrievedTheme);
        setFontSize(parseInt(retrievedFontSize));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 10);
    }, []);


    return (
        <div className="app-div">
            <AuthProvider>
                <FontContext.Provider value={fontSize}>
                    <ThemeContext.Provider value={theme}>
                        <NavBar/>
                        {isLoading ? (<div>Loading. . .</div>) : (
                            <Routes>
                                <Route index element={<Login/>}/>
                                <Route path='/home' element={
                                    <PrivateRoute>
                                        <Home/>
                                    </PrivateRoute>}/>
                                <Route path='/home' element={<Home/>}/>
                                <Route path='/home/:postID' element={<Post/>}/>
                                <Route path='/request' element={<Request/>}/>
                                <Route path='/request/:postID' element={<RequestDetails/>}/>
                                <Route path='/create' element={<RequestCreate/>}/>
                                <Route path='/admin' element={<Admin/>}/>
                                <Route path='/adminrequest/:status/:postID' element={<AdminRequestDetails/>}/>
                            </Routes>
                        )}

                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Accessibility Settings
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <h4>Content Settings</h4>
                                    <FontSize
                                        fontSize={fontSize}
                                        setFontSize={(number) => {
                                            localStorage.setItem('fontSize', number);
                                            setFontSize(number);
                                            }
                                        }
                                    />
                                </Container>
                                <Container>
                                    <Theme
                                        theme={theme}
                                        setTheme={(newTheme) => {
                                            localStorage.setItem('theme', newTheme);
                                            setTheme(newTheme);
                                        }
                                        }
                                    />
                                </Container>
                            </Modal.Body>
                        </Modal>

                        <img className='accessibility-button' src={settingsCog} alt="accessibility button" onClick={handleShow} />
                    </ThemeContext.Provider>
                </FontContext.Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
