import axiosSecure from '../hooks/useAxiosSecure'
export const saveUser = async user => {
    const currentUser = {
        email: user.email,
        role: 'user',
        status: 'verified',
    }
    const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser)
    return data ;
};

export const getRole = async email => {
    const { data } = await axiosSecure(`/user/${email}`)
    return data.role ;
}