import React, { useContext, useEffect, useRef, useState } from 'react';
import LoginImage from './.././../assets/others/authentication1.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const captchRef = useRef(null)
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                navigate(from, { replace: true });
                toast.success(`${loggedUser.email} Login Successfully`);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const hangleChaptchValidate = () => {
        const user_captcha_value = captchRef.current.value;
        // console.log(user_captcha_value);

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <Helmet>
                <title>Bistro Boss || Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left lg:w-1/2 hidden lg:block">
                    <img className='w-full' src={LoginImage} alt="Login" />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl lg:w-1/2">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <h1 className="text-5xl font-bold">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={hangleChaptchValidate} ref={captchRef} type="text" name='captch' placeholder="type the above captch" className="input input-bordered" required />
                                {/* <button onClick={hangleChaptchValidate} className='btn btn-secondary btn-xs mt-2'>Validate Captch</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" disabled={disabled} />
                            </div>
                        </form>
                        <p className='text-orange-500'>New here? <Link to='/signup' state={location.state} className='hover:underline'>Create a New Account</Link> </p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;