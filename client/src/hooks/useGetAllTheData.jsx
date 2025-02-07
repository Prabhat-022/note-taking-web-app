import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setNote } from '../redux/userSlice';
import { useEffect } from 'react';

const useGetAllTheData = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()

    useEffect(() => {
        const getAllNotes = async () => {

            try {

                const res = await axios.post('/api/v1/note/get-all-notes', { user: user._id });
                console.log('Note fetched res:', res.data)
                dispatch(setNote(res.data.data))

            } catch (error) {

                console.log(`Error fetching notes: ${error}`)
            }
        }
        getAllNotes()
    }, [])
}

export default useGetAllTheData