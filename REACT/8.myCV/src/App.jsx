import { useState } from "react";
import "./App.css";
import { cv } from "./CV/cv";
import { About, Education, Experience, Hero, More } from "./components";

const { hero, education, experience, languages, habilities, volunteer } = cv;

const App = () => {
  const [showEducation, setShowEducation] = useState(true);
  return (
    <div className="App">
      <Hero heroProps={hero} />
      <About aboutProps={hero} />

      <button
        className="custom-btn btn-4"
        onClick={() => setShowEducation(true)}
      >
        EDUCATION
      </button>
      <button
        className="custom-btn btn-4"
        onClick={() => setShowEducation(false)}
      >
        EXPERIENCE
      </button>
      <div>
        {showEducation ? (
          <Education educationProps={education} />
        ) : (
          <Experience experienceProps={experience} />
        )}
      </div>

      <More
        languagesProps={languages}
        habilitiesProps={habilities}
        volunteerProps={volunteer}
      />
    </div>
  );
};

export default App;
