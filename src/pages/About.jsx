import React from 'react';
import AboutSection from './About/components/Information';
import MissionSection from './About/components/MissionSection';
import IntroSection from './About/components/TeamSection';
import PeopleSection from './About/components/Team';
import ContactSection from './About/components/ContactUs';

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