import axios from "axios";

export const fetchListOfHackathons = async (API_URL) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
