import React from "react";
import { useParams } from "react-router-dom";
import hackathonStore from "../../store/hackathonStore";

const Hackathon = () => {
  const params = useParams();
  const { id } = params;

  console.log(id);

  const hackStore = hackathonStore((state) => state);
  const { hackathons } = hackStore;

  console.log(hackathons);

  const filteredHackathon = hackathons.filter(
    (hackathon) => hackathon.id === parseInt(id)
  );

  console.log(filteredHackathon);

  return (
    <div>
      {filteredHackathon.map((hackathon) => (
        <h1>{hackathon.name}</h1>
      ))}
    </div>
  );
};

export default Hackathon;
