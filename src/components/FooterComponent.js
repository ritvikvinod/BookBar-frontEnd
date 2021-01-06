import React from "react";
import './FooterComponent.css';
import {Link} from "react-router-dom";

export default class FooterComponent extends React.Component {
    render() {
        return(
            <div className="mt-5 pt-5 pb-5 footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-xs-12 about-company">
                            <h2>BookBar</h2>
                            <p className="pr-5 text-white-50">An online bookstore with millions of books sold worldwide.</p>
                            <p>
                                <i className="fab fa-facebook-f"></i>
                                &nbsp;
                                <i className="fab fa-instagram"></i>
                                &nbsp;
                                <i className="fab fa-linkedin-in"></i></p>
                        </div>
                        <div className="col-lg-3 col-xs-12 links">
                            <h4 className="mt-lg-0 mt-sm-3">Links</h4>
                            <ul className="m-0 p-0">
                                <li> <Link to={"/privacy"}>Privacy Policy</Link></li>
                                <li> <Link to={"/about"}
                                           href="#">About</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-xs-12 location">
                            <h4 className="mt-lg-0 mt-sm-4">Location</h4>
                            <p>Snell Library, Northeastern University</p>
                            <p className="mb-0"><i className="fa fa-phone mr-3"></i>(541) 754-3010</p>
                            <p><i className="fa fa-envelope-o mr-3"></i>info@bookbar.com</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col copyright">
                            <p className=""><small className="text-white-50">BookBar © 2020. All Rights Reserved.</small></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
