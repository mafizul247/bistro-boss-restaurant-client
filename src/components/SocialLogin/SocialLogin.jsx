import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);

                const saveUser = { name: loggedUser.displayName, photoURL: loggedUser.photoURL, email: loggedUser.email, role: 'user' };
                // console.log(saveUser);

                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        navigate(from, { replace: true });
                        toast.success(`${loggedUser.email} login successfully`);
                    })
            }).catch(error => {
                toast.error(error.message);
            })

    }

    return (
        <div className='text-center'>
            <div className="divider font-bold">Social Login</div>
            <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                <FaGoogle />
            </button>
        </div>
    );
};

export default SocialLogin;