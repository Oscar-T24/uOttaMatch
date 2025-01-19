import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import styles from "../../modules/dashboard/Dashboard.module.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = window.prompt("User ID: ");

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

            setUsers(usersData);

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
    <div className={styles.parentGridWrapper}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div className={styles.gridContainer}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div className={styles.personContainer} key={index}>
              <h2> {user.username}</h2>
              <h3>University: {user.university}</h3>
              {user.languages.map((language) => (
                <h3>{language}</h3>
              ))}
              <button>Contact</button>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
