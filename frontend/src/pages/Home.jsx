import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading';
import {Button} from '../components/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { tokenAtom } from '../store/atoms';

export function Home() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    // const token = useRecoilValue(tokenAtom);

    useEffect(()=>{
        
    })


    useEffect(() => {
        // axios.defaults.withCredentials = true;
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{
            // headers: {"Access-Control-Allow-Origin": "*"},
            withCredentials: true,
            // credentials: 'include'
        })
        .then(response => {
            setUsers(response.data.user)
        }).catch(err => {
            navigate("/signin");
            console.log(err);
        })
    }, [filter, navigate])

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

    <div>
        <Button label="Sign out" onClick={async () => {
            await axios.get("http://localhost:3000/api/v1/user/signout", {
                withCredentials: true,
                // credentials: 'include'
            })
            .then(() => navigate("/signin"))
            .catch(err => console.log(err));
        }} />
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