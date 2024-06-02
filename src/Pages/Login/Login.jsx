import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigation = useNavigation();
    if (navigation.state === 'loading') {
        return <LoadingSpinner />
    }
    const { logIn } = useContext(AuthContext);
    const captchRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        logIn(email, password)
        .then(result => {
            const logedUser = result.user;
            // console.log(logedUser);
            navigate(from, {replace: true})
            event.target.reset();
            toast(`${logedUser.displayName} login succeffully`);
        })
        .catch(error => {
            console.log(error.message);
            toast.error(error.message)
        })
    }


    const handleValidateCaptcha = (e) => {
        // const user_captcha_value = captchRef.current.value;
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse md:gap-12">
                <div className="text-center lg:text-left md:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className='card-body'>
                        <form onSubmit={handleLogin} >
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
                                {/* TODO  */}
                                {/* <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha" className="input input-bordered" required />
                                {/* <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-3'>Validate</button> */}
                            </div>
                            <div className="form-control mt-6" >
                                <input disabled={disabled} type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                        <div >
                            <p className='text-center'>New here? <Link to='/signup' className='text-blue-500 hover:text-blue-800 hover:underline'>Create a New Account</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;