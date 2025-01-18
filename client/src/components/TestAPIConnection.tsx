import {useEffect, useState} from 'react';

export default function TestAPIConnection() {

    const [users, setUsers] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/get_all')
            .then((resp) => resp.json())
            .then((json) => setUsers(json))
    }, []);

    return <>
        <h1>TEST</h1>
        <pre>{JSON.stringify(users, null, 2)}</pre>
        </>
}