import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import googleIcon from './../../assets/icon/google-icon.png'
import { AuthContext } from '../../Providers/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                navigate(from, { replace: true });
                toast(`${logedUser.displayName} Login Succefully`)
                const savedUser = { name: logedUser.displayName, email: logedUser.email, photo: logedUser.photoURL }
                fetch('http://localhost:5000/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            }).catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className='text-center'>
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    {/* <FaGoogle className='h-6 w-6 text-red-500' /> */}
                    <img className='w-8 h-8 rounded-full' src={googleIcon} alt="Google" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;