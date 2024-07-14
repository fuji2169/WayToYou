import Hero from "../components/Hero.js";
import React, { useState } from 'react';
import { useEffect } from "react";
import Navbar from "../components/Navbar.js";
import HomeImg from "../assets/road.jpg";
import ContactForm from "../components/ContactForm.js";
import AboutUs from "../components/AboutUs.js";
import Footer from "../components/Footer.js";
import DestinationMap from "../components/DestinationMap.js";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  // useEffect(() => {
  //   console.log("username : ", user);
  // }, [user]);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>
      <Hero
        cName="hero"
        title="Your Way Your Story"
        text="Chose The Fattest Way To Your Destination."
        url="#destination-map"
        btnClass="show"
        btnText="Find Path"
        heroImg={HomeImg}
      />
      <DestinationMap isAuthenticated={isAuthenticated} user={user} />
      <AboutUs />
      <ContactForm />
      <Footer />
    </>
  );
}
export default Home;
