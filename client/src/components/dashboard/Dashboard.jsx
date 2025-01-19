import { useEffect, useState } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/test");

    const fetchData = async () => {
      const userId = window.prompt("Give user id");

      if (userId) {
        try {
          // Step 1: Fetch the array of user IDs
          const response = await fetch(
            `http://localhost:5000/match/${userId}`,
            {
              method: "GET",
              origin: "no-cors",
            }
          );

          if (response.ok) {
            const userIdArray = await response.json();

            console.log(userIdArray);

            // Step 2: Create an array to hold the user details
            const userPromises = userIdArray.map(async (userArray) => {
              const [, id] = userArray; // Extract the user ID (second index)

              const userResponse = await fetch(
                `http://localhost:5000/get_user/${id}`
              );

              if (userResponse.ok) {
                return await userResponse.json();
              } else {
                console.error(`Failed to fetch user with ID: ${id}`);
                return null;
              }
            });

            // Step 3: Wait for all user details to be fetched
            const usersData = await Promise.all(userPromises);

            console.log(usersData);

            // Step 4: Filter out any null values (in case of fetch failures)
            setUsers(usersData.filter((user) => user !== null));
          } else {
            console.error("Failed to fetch user ID array", response);
          }
        } catch (error) {
          console.error("Error occurred while fetching user data", error);
        }
      } else {
        console.error("User ID is required");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index}>
              <h2>User {index + 1}</h2>
              <p>Age: {user.age}</p>
              <p>Name: {user.username}</p>
              <p>Proficiency In: {user.languages[0]}</p>
            </div>
          ))
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
