import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../layout/Alert';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            // this is used to redirect in React
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        nusnetID: '',
        password: ''
    });

    const { nusnetID, password } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (nusnetID === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                nusnetID,
                password
            });
        }
    };

    return (
        <div>
            <div id='login-spacer' />
            <Alert />
            <div className='form-container'>
                <h1>
                    ModReg <span className='text-primary'>Login</span>
                </h1>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='nusnetID'>NUSNET ID</label>
                        <input
                            type='text'
                            name='nusnetID'
                            value={nusnetID}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <input
                        type='submit'
                        value='Login'
                        className='btn btn-primary btn-block'
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
