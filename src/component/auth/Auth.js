import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionType from '../../store/action/index';
import './Auth.css';

import Spinner from '../spinner/Spinner'

const Auth = React.memo(props => {
    const username = React.createRef();
    const password = React.createRef();
    const [unameError, setUnameError] = useState("");
    const [passError, setPassError] = useState("");

    const validation = () => {
        setUnameError("");
        setPassError("");
        const name = username.current.value;
        const pass = password.current.value;
        if (name === null || name.trim() === "") {
            setUnameError("user name is required")
        }
        else if (pass === null || pass.trim() === "") {
            setPassError("password is required");
        }
        else {
            props.login({
                loginId: name,
                password: pass
            })
        }
    }
    return (
        <div>
            {props.loading ? <Spinner /> : <div className="login">
                <img src="data:image/png;base64,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" alt="tweet logo" />
                <h2>Log in to tweet app</h2>
                {props.error &&
                    <div className="err_msg">
                        {props.error}
                    </div>
                }
                <div className="form_ele">
                    <input ref={username} type="text" placeholder="user name" />
                    <span className="error">{unameError}</span>
                </div>
                <div className="form_ele">
                    <input ref={password} type="password" placeholder="password" />
                    <span className="error">{passError}</span>
                </div>
                <button onClick={() => validation()} className="btn">Login</button>
                <div className="login_footer">
                    <Link className="link" to="/reset">Forget Password ?</Link>
                    <Link className="link" to="/signup">Sign up for tweet app</Link>
                </div>
            </div>}
        </div>
    )
});

const mapDispatchToprops = dispatch => {
    return {
        login: (userData) => dispatch(actionType.login(userData))
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Auth);