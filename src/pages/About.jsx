import React from 'react';
import AboutSection from '../components/AboutUs/Information';
import MissionSection from '../components/AboutUs/MissionSection';
import IntroSection from '../components/AboutUs/TeamSection';
import PeopleSection from '../components/AboutUs/Team';
import ContactSection from '../components/AboutUs/ContactUs';

const About = () => {
  return (
    <main>
      <AboutSection/>
      <IntroSection/>
      <MissionSection/>
      <PeopleSection/>
      <ContactSection/>
    </main>
  );
};

export default About;