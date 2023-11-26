import { useEffect, useRef, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useProfile from "../../hooks/useProfile";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";


// other imports...

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {

    const inputRef = useRef(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [profile, refetch] = useProfile();
    const [uploadedImage, setUploadedImage] = useState('');

    useEffect(() => {
        if (profile.length > 0) {
            setUploadedImage(profile[0].image);
        }
    }, [profile]);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('image', file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            };
            const res = await axiosPublic.post(image_hosting_api, formData, { headers });
            if (res.data.success) {
                const profileimage = {
                    image: res.data.data.display_url,
                    email: user.email
                }
                const profileRes = await axiosSecure.post('/profiles', profileimage);
                if (profileRes.data.insertedId) {
                    refetch();
                    setUploadedImage(res.data.data.display_url); 
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleUpdate = async (e) => {
        const file = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('image', file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            };
            const res = await axiosPublic.post(image_hosting_api, formData, { headers });
            console.log(res)
            if (res.data.success) {
                const updateData = {
                    image: res.data.data.display_url,
                    email: user.email
                }
                console.log(updateData)
                axiosPublic.patch(`/profiles/${profile[0]._id}`, updateData)
                .then(res => {
                    setUploadedImage(res.data.data.display_url); 
                })
              
            }
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <SectionTitle heading={'My Profile'} subHeading={'Watch your history'}></SectionTitle>

            <div>
                <div className="flex justify-center mb-20">
                    {uploadedImage ? (
                        <img src={uploadedImage} className="w-64 rounded-full h-64" alt="user profile" />
                    ) : (
                        <div>
                            <div className="w-64 bg-lime-200 rounded-full h-64"></div>
                            <p className="mt-5 font-semibold text-lg">Upload your profile picture</p>
                        </div>
                    )}
                </div>

                <div>
                    {!uploadedImage && (
                        <div>
                            <button className="btn btn-outline btn-warning" onClick={handleClick}>
                                Upload Profile Picture
                            </button>
                            <input type="file" ref={inputRef} onChange={handleChange} className="hidden" />
                        </div>
                    )}

                    {uploadedImage && (
                        <div>
                            <button className="btn btn-outline btn-success" onClick={handleClick}>
                                Update Profile Picture
                            </button>
                            <input type="file" ref={inputRef} onChange={handleUpdate} className="hidden" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;