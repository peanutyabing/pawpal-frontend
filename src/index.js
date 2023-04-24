import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./Context/AuthProvider.js";
import { UserProvider } from "./Context/UserProvider.js";
import PersistLogin from "./Components/PersistLogin.js";
import RequireAuth from "./Components/RequireAuth.js";
import App from "./App.js";
import MyPets from "./Components/MyPets.js";
import Navigation from "./Components/Navigation.js";
import Events from "./Components/Events.js";
import PetForm from "./Components/PetForm.js";
import EventForm from "./Components/EventForm.js";
import Account from "./Components/Account.js";
import SignIn from "./Components/SignIn.js";
import SignUp from "./Components/SignUp.js";
import UserProfileForm from "./Components/UserProfileForm.js";
import AddPetExample from "./Tour/AddPetExample.js";
import PetFormExample from "./Tour/PetFormExample.js";
import PetExample from "./Tour/PetExample.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <Navigation />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<App />} />
          <Route path="/my-pets/add-pet-example" element={<AddPetExample />} />
          <Route
            path="/my-pets/pet-form-example"
            element={<PetFormExample />}
          />
          <Route path="/my-pets/view-pet-example" element={<PetExample />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<PersistLogin />}>
            <Route path="/account" element={<Account />} />
            {/* Protected routes that require auth */}
            <Route element={<RequireAuth />}>
              <Route path="/my-pets" element={<MyPets />} />
              <Route path="/my-pets/add-pet" element={<PetForm />} />
              <Route path="/my-pets/:petId" element={<Events />} />
              <Route
                path="/my-pets/:petId/add-activity"
                element={<EventForm />}
              />
              <Route
                path="/account/update-profile"
                element={<UserProfileForm />}
              />
            </Route>
          </Route>

          {/* Catch-all for invalid URLs */}
          {/* <Route path="*" element={}/> */}
        </Routes>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
