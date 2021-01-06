import React from "react";
import {Link, withRouter} from "react-router-dom";
import {login} from "../../actions/session";
import './LoginComponent.css';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Jello from 'react-reveal/Jello';


import {connect} from "react-redux";

const mapStateToProps = ({errors}) => ({
    errors
});
const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

class LoginComponent extends React.Component {

    handleSubmit = (user) =>
        this.props.login(user);

    state = {
        user: {
            email: '',
            password: ''
        },

        err : ''
    }




    render() {
        return (

            <div>
                <br/>
                <br/>
                <div className="text-center login-bg">
                    <br/>
                    <br/>

                    <form className="form-signin login-box">
                        <br/>
                        <Fade left>
                            <i className="fas fa-bold fa-4x login-logo"></i>
                        </Fade>
                        <Fade right>
                            <i className="fas fa-cocktail fa-4x login-logo"></i>
                        </Fade>

                    <div><br/></div>
                    <Zoom left>
                    <h1 className="h3 mb-3 font-weight-normal login-logo">Log In</h1>
                    </Zoom>
                    <br/>
                    <Fade left>
                            <input type="email" className="form-control "

                                   onChange={(event => {
                                           const newEmail = event.target.value
                                           this.setState(prevState => ({
                                               user: {
                                                   ...prevState.user,
                                                   email: newEmail
                                               }
                                           }))
                                       }
                                   )}
                                   id="email" placeholder="Email Address"/>
                        </Fade>
                        <Fade right>
                            <input type="password" className="form-control"
                                   value={this.state.user.password}
                                   title="must be between 6-16 characters,have at least one capital letter, one lowercase letter, one digit, and one special character"
                                   onChange={(event => {
                                           const newPassword = event.target.value
                                           this.setState(prevState => ({
                                               user: {
                                                   ...prevState.user,
                                                   password: newPassword
                                               }
                                           }))
                                       }
                                   )}
                                   id="password" placeholder="Password"/>
                    <br />


                    {this.props.errors?<div className="rounded" style={{color:"red", textAlign:"center"}}> {this.props.errors}</div>: ''}


                    </Fade>
                                <br/>
                                <Fade clear>
                                <div className="col btn btn-primary"
                                     onClick={() => this.handleSubmit(this.state.user)}>
                                    Login
                                </div>
                                </Fade>
                                    {/*<Link to="/signUp"
                                          className="float-right login-logo">Sign Up</Link>*/}

                    </form>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginComponent));
