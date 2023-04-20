import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, USERID } from "../Constants.js";
import Carousel from "react-bootstrap/Carousel";
import { calculateAge } from "../Utils.js";
import { PlusCircleFill } from "react-bootstrap-icons";
import Reminders from "./Reminders.js";

export default function MyPets() {
  const PLACEHOLDER_PIC =
    "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

  const [myPets, setMyPets] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    retrievePets();
  }, []);

  const retrievePets = async () => {
    const pets = await axios.get(`${BACKEND_URL}/users/${USERID}/pets/`);
    setMyPets(pets.data);
  };

  const displayPets = () => {
    if (!myPets.length) {
      return;
    }
    return myPets.map((pet) => (
      <Carousel.Item
        key={pet.id}
        onClick={() => {
          navigate(`./${pet.id}`);
        }}
      >
        <img
          className="profile-lg"
          src={pet.imageUrl ? pet.imageUrl : PLACEHOLDER_PIC}
          alt={pet.name}
        />
        <Carousel.Caption>
          <h2 className="large bold">{pet.name}</h2>
          <h3 className="medium">{calculateAge(pet.dateOfBirth)}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Reminders />
        {/* Note: authenticated users see a summary of pet profiles */}
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={myPets.length > 1 ? true : false}
          indicators={myPets.length > 1 ? true : false}
        >
          {displayPets()}
        </Carousel>
        <div className="bottom-btn-container">
          <PlusCircleFill
            className="custom-btn"
            onClick={() => {
              navigate("/my-pets/add-pet");
            }}
          />
        </div>
      </header>
    </div>
  );
}
