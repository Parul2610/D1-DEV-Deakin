import Navigation from "./Navigation";
import Banner from "./Banner";
import Profile from "./Profile";
import Projects from "./Projects";
import FeaturedSection from "./FeaturedSection";
import Gallery from "./Gallery";
import Subscribe from "./Subscribe";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import PostPage from "./post/PostPage";
import Pricing from "./pricing/Pricing";

import "./App.css";

function App() {

    // Article data
    const articles = [
        {
            id: 1,
            title: "Getting Started with React",
            description: "Learn the basics of React components and JSX.",
            image: "/React.png",
            rating: 5,
            person: "Parul"
        },

        {
            id: 2,
            title: "Understanding JavaScript",
            description: "Learn important JavaScript concepts for web development.",
            image: "/Java.png",
            rating: 4,
            person: "Parul"
        },

        {
            id: 3,
            title: "Introduction to Web Development",
            description: "Learn how HTML, CSS and JavaScript work together.",
            image: "/web.jpg",
            rating: 5,
            person: "Parul"
        }
    ];


    // Tutorial data
    const tutorials = [
        {
            id: 1,
            title: "HTML Basics",
            description: "Learn the basic structure of an HTML webpage.",
            image: "/html.jpg",
            rating: 5,
            person: "Parul"
        },

        {
            id: 2,
            title: "CSS Fundamentals",
            description: "Learn how to style webpages using CSS.",
            image: "/css.jpg",
            rating: 4,
            person: "Parul"
        },

        {
            id: 3,
            title: "JavaScript Basics",
            description: "Learn the fundamentals of JavaScript programming.",
            image: "/js.jpg",
            rating: 5,
            person: "Parul"
        }
    ];


   




return (
  <BrowserRouter>
    <div className="App">
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Profile />
              <Projects />
              <Gallery />

              <FeaturedSection
                title="Latest Articles"
                items={articles}
                personLabel="Author"
                buttonText="Read More"
              />

              <FeaturedSection
                title="Popular Tutorials"
                items={tutorials}
                personLabel="Instructor"
                buttonText="Start Learning"
              />

              <Subscribe />
            </>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      
       <Route
          path="/postpage"
          element={<PostPage />}
        />

        <Route
    path="/pricing"
    element={<Pricing />}
/>

      </Routes>

      <Footer />
    </div>
  </BrowserRouter>
);



}

export default App;



