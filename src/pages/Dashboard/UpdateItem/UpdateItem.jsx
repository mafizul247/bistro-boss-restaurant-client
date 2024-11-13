import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useMenu from '../../../hooks/useMenu';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

const Image_Hosting_Token = import.meta.env.VITE_Image_Upload_Token;

const UpdateItem = () => {
    const { user } = useAuth();
    const [menu, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();
    // const loaddedItem = useLoaderData();
    const { id } = useParams();
    const loaddedItem = menu?.find(item => item._id == id);
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();
    const image_Hosting_URL = `https://api.imgbb.com/1/upload?key=${Image_Hosting_Token}`;
    const onSubmit = data => {
        // console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0]);
        fetch(image_Hosting_URL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(resData => {
                // console.log(resData)
                if (resData.success) {
                    const imageURL = resData.data.display_url;
                    const { name, recipe, price, category } = data;
                    const updateMenu = { name, recipe, category, image: imageURL, price: parseFloat(price), email: user?.email, updateDate: new Date() };

                    axiosSecure.patch(`/menu/${loaddedItem._id}`, updateMenu)
                        .then(resData => {
                            // console.log(resData.data)
                            if (resData.data.modifiedCount > 0) {
                                navigate('/dashboard/manage-items')
                                refetch();
                                reset();
                                toast.success('Item has updatd')
                            }
                        })
                }
            })
    };
    return (
        <div className='p-8'>
            <Helmet>
                <title>Bistro Boss || Update Item</title>
            </Helmet>
            <SectionTitle subHeading={"Revew Item"} heading={'Update Item'} />
            <div className='p-8 rounded-md bg-[#F6F6F6]'>
                <h3 className='text-xl font-bold text-center mb-4'>Update Item: <span className='text-purple-700 '>{loaddedItem.name}</span> </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-2'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold ">Recepie Name<span className='text-red-600'>*</span></span>
                            </div>
                            <input type="text" {...register("name", { required: true, maxLength: 120 })} placeholder="Tecepie Name" className="input input-bordered w-full" defaultValue={loaddedItem.name} />
                        </label>
                    </div>
                    <div className='md:flex gap-4 mb-2'>
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text font-bold ">Category<span className='text-red-600'>*</span></span>
                            </div>
                            <select defaultValue={loaddedItem.category} {...register("category", { required: true })} className="select select-bordered">
                                <option disabled>Select Category</option>
                                <option>dessert</option>
                                <option>pizza</option>
                                <option>salad</option>
                                <option>soup</option>
                                <option>drinks</option>
                                <option>offered</option>
                            </select>
                        </label>
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text font-bold ">Price<span className='text-red-600'>*</span></span>
                            </div>
                            <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" defaultValue={loaddedItem.price} />
                        </label>
                    </div>
                    <div className='mb-2'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold ">Recepie Details<span className='text-red-600'>*</span></span>
                            </div>
                            <textarea type="text"  {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details" defaultValue={loaddedItem.recipe} ></textarea>
                        </label>
                    </div>
                    <div className='mb-2'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-bold ">Upload Recepie Photo<span className='text-red-600'>*</span></span>
                            </div>
                            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className='pt-2'>
                        <input className="btn btn-success" type="submit" value="Update Item" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;