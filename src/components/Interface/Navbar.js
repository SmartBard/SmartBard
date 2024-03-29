import React, {useContext, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {API_URL} from "../../common/constants";
import {Button, Container, Navbar} from "react-bootstrap";
import ThemeContext from "../Settings/Theme-Context";
import useAuth from "../../hooks/UseAuth";
import axios from "axios";
import logo from "../../images/smartbard.png";
import "./Style.css";

export default function NavBar() {

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {isAdmin, userID, setIsAdmin, setUserID, logout, validateLogin} = useAuth();
    const theme = useContext(ThemeContext);

    const LoginPage = pathname === "/" ? true : false;

    const handleLogout = function () {
        navigate("/");
        logout();
        localStorage.removeItem("id_token");
        localStorage.removeItem("refresh_token");
    };

    const fetchAdmin = async () => {
        try {
            await validateLogin();
            const response = await axios.get(`${API_URL}/users/self`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("id_token")}`,
                },
            });
            setIsAdmin(response.data.admin);
            setUserID(response.data.userid);
        } catch (error) {
            console.error("Failed to fetch user info", error);
            logout(); // Logout if there's an error
        }
    };
    useEffect(() => {
        fetchAdmin();
    }, [isAdmin]);

    return (
        <Navbar style={{backgroundColor: theme.background}} className="custom-navbar" variant="light" expand="lg"
                expanded={true}>
            <Container>
                <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => navigate(LoginPage ? '/' : '/home')}>
                    <img src={logo} alt="overbrook logo" height="80px" width="80px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {!LoginPage && (
                        <React.Fragment>
                            {isAdmin ? (
                                <Button onClick={() => navigate('/admin')} id='admin-button' style={{
                                    backgroundColor: theme.foreground,
                                    color: theme.text,
                                    border: theme.foreground,
                                    padding: "10px",
                                    margin: "10px"
                                }}>Admin</Button>
                            ) : (
                                <Button onClick={() => navigate('/request')} id='request-button' style={{
                                    backgroundColor: theme.foreground,
                                    color: theme.text,
                                    border: theme.foreground,
                                    padding: "10px",
                                    margin: "10px"
                                }}>Request</Button>
                            )}
                            <Button onClick={handleLogout} id='logout-button' style={{
                                backgroundColor: theme.foreground,
                                color: theme.text,
                                border: theme.foreground,
                                padding: "10px",
                                margin: "10px"
                            }}>Logout</Button>
                        </React.Fragment>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
