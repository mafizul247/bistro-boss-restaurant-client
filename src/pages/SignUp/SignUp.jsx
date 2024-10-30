import React, { useContext } from 'react';
import LoginImage from './.././../assets/others/authentication1.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    const { createUser, userProfileUpdate, setControl } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const name = data.name;
        const photo = data.photo;
        const email = data.email;
        const password = data.password;

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);

                userProfileUpdate(name, photo)
                    .then(() => {
                        const saveUser = { name: name, photoURL: photo, email: email, role: 'user' };
                        fetch('http://localhost:5000/users', {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    setControl(true);
                                    navigate(from, { replace: true });
                                    toast.success(`${email} Registration successfully`);
                                    reset();
                                }
                            })
                    })
            })
            .catch(error => {
                console.log(error);
            })
    };

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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h1 className="text-5xl font-bold">Sign Up now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: "Name field is required" })} name='name' placeholder="Full Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("photo", { required: "Photo URL is required" })} name='photo' placeholder="Photo URL" className="input input-bordered" />
                                {errors.name && <span className='text-red-500'>{errors.photo.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email field is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                    name='email'
                                    placeholder="email"
                                    className="input input-bordered"
                                />

                                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: "Password field is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Password must not exceed 20 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,  // Updated regex
                                        message: "Password must contain at least one lowercase, one uppercase & one digit & one special character !@#$%^&*"
                                    }
                                })} name='password' placeholder="password" className="input input-bordered" />
                                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-orange-500'>Already registered? <Link to='/login' className='hover:underline'>Go to log in</Link> </p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;