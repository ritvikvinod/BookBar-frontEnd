import React from "react";
import {getUserDetails, updateProfile} from "../../services/UserService";
import Fade from "react-reveal/Fade";
import Jello from "react-reveal/Jello";
import {withRouter} from "react-router-dom";
import {SESSION} from "../../common/constants";

class ProfileComponent extends React.Component {
    session = JSON.parse(localStorage.getItem(SESSION))
    userId = this.session.userId
    constructor(props) {
        super(props);
        window.scrollTo(0,0);
        this.state = {
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            userType: '',
            address: {
                street: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
            }
        }

        getUserDetails(this.userId)
            .then(user => {
                let localAddress = {
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                }
                if (user.address) {
                    localAddress = user.address
                }
                this.setState({
                                  password: user.password,
                                  firstName: user.firstName,
                                  lastName: user.lastName,
                                  email: user.email,
                                  userType: user.userType,
                                  address: localAddress
                              }
                )
            })
    }

    updateProfile = (user,userId) => updateProfile(user,userId).then(res => {
        if (res.ok) {
            const response = res.json()
            this.props.history.push("/")
            return response
        } else {
            window.alert("Invalid information entered. Please try again!")
        }
    })

    render() {
        return (
            <div className='container'>
                <br/>
                <br/>
                <br/>
                <div className={'form-signin'}>
                    <h1 className={"text-center carousel-style"}>Profile</h1>
                    <Fade left>
                        <label htmlFor="firstName"
                               className="col-sm-6 col-form-label">
                            <span className="font-weight-bold">Name:</span> </label>
                    </Fade>
                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.firstName}
                               defaultValue={this.state.firstName}
                               onChange={(event => {
                                       const newFirstName = event.target.value
                                       this.setState(prevState => ({
                                           ...prevState,
                                           firstName: newFirstName
                                       }))
                                   }
                               )}
                               id="firstName" placeholder="First Name"/>
                    </Fade>

                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.lastName}
                               onChange={(event => {
                                       const newLastName = event.target.value
                                       this.setState(prevState => ({
                                           ...prevState,
                                           lastName: newLastName
                                       }))
                                   }
                               )}
                               id="lastName" placeholder="Last Name"/>
                    </Fade>
                    <br />

                    {/*<Fade left>
                        <label htmlFor="password"
                               className="col-sm-6 col-form-label float-left text-left">
                            <span className="font-weight-bold">Password:</span> </label>
                    </Fade>
                    <Fade right>
                        <input type="password"
                               className="form-control wbdv-field wbdv-password text-center"
                               value={this.state.password}
                               title="must be between 6-16 characters,have at least one capital letter, one lowercase letter, one digit, and one special character"
                               onChange={(event => {
                                       const newPassword = event.target.value
                                       this.setState(prevState => ({
                                           ...prevState,
                                           password: newPassword
                                       }))
                                   }
                               )}
                               id="password" placeholder="Password"/>
                    </Fade>*/}
                    <br />

                    <Fade left>
                        <label htmlFor="email"
                               className="col-sm-6 col-form-label float-left text-left">
                            <span className="font-weight-bold">Email:</span> </label>
                    </Fade>
                    <Fade right>
                        <input type="email" className="form-control text-center"
                               value={this.state.email}
                               onChange={(event => {
                                       const newEmail = event.target.value
                                       this.setState(prevState => ({
                                           ...prevState,
                                           email: newEmail
                                       }))
                                   }
                               )}
                               id="email" placeholder="Email"/>
                    </Fade>
                    <br />

                    <Fade left>
                        <label htmlFor="userType"
                               className="col-sm-6 col-form-label float-left text-left">
                            <span className="font-weight-bold">User Type:</span> </label>
                    </Fade>
                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.userType}
                               disabled
                               id="userType" placeholder="User Type"/>
                    </Fade>
                    <br />

                    <Fade left>
                        <label htmlFor="street"
                               className="col-sm-6 col-form-label float-left text-left">
                            <span className="font-weight-bold">Address:</span> </label>
                    </Fade>
                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.address.street}
                               onChange={(event => {
                                       const newStreet = event.target.value
                                       this.setState(prevState => ({
                                           address: {
                                               ...prevState.address,
                                               street: newStreet
                                           }
                                       }))
                                   }
                               )}
                               id="street" placeholder="Street"/>
                    </Fade>

                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.address.city}
                               onChange={(event => {
                                       const newCity = event.target.value
                                       this.setState(prevState => ({
                                           address: {
                                               ...prevState.address,
                                               city: newCity
                                           }
                                       }))
                                   }
                               )}
                               id="city" placeholder="City"/>
                    </Fade>

                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.address.state}
                               onChange={(event => {
                                       const newState = event.target.value
                                       this.setState(prevState => ({
                                           address: {
                                               ...prevState.address,
                                               state: newState
                                           }
                                       }))
                                   }
                               )}
                               id="state" placeholder="State"/>
                    </Fade>

                    <Fade right>
                        <input type="text" className="form-control text-center"
                               value={this.state.address.country}
                               onChange={(event => {
                                       const newCountry = event.target.value
                                       this.setState(prevState => ({
                                           address: {
                                               ...prevState.address,
                                               country: newCountry
                                           }
                                       }))
                                   }
                               )}
                               id="country" placeholder="Country"/>
                    </Fade>

                    <Fade right>
                        <input type="email" className="form-control text-center"
                               value={this.state.address.pincode}
                               onChange={(event => {
                                       const newPinCode = event.target.value
                                       this.setState(prevState => ({
                                           address: {
                                               ...prevState.address,
                                               pincode: newPinCode
                                           }
                                       }))
                                   }
                               )}
                               id="pincode" placeholder="Pincode"/>
                    </Fade>
                    <br/>
                    <Fade clear>
                        <div
                            className={' col-form-label float-left text-left text-center btn'
                                       + ' btn-primary btn-block'}
                            onClick={() => this.updateProfile(this.state,this.userId)}>
                            Update Profile
                        </div>
                    </Fade>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileComponent);

