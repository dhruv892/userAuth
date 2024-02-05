import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading';
import {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export function Home() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

  return <div>
    <Heading label="Welcome to the home page" />
    <SubHeading label="List of Users" />
    
    <div className="my-2">
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