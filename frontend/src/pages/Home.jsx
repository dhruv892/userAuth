import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading';
import {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../store/atoms';

export function Home() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    const token = useRecoilValue(tokenAtom);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                setUsers(response.data.user)
            }).catch(err => {
                navigate("/signin");
                console.log(err);
            })
    }, [filter, navigate, token])

  return <div>
    <Heading label="Welcome to the home page" />
    <SubHeading label="List of Users" />
    
    <div>
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} type="text" placeholder="Search users..."></input>
    </div>

    <div>
        {users.map(user => <User key={user._id} user={user} />)}
    </div>

  </div>;
}

function User({user}) {
    return <div>
        {user.firstName} {user.lastName}
    </div>
}

User.propTypes = {
    user: PropTypes.object.isRequired
};