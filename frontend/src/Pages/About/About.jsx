import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import owner from "../../../assets/owner.jpg";

const TEAM = [
  {
    name: "Rahul Gaire",
    role: "Founder & CEO",
    image: owner,
    bio: "E-commerce enthusiast, passionate about building seamless shopping experiences.",
  },
  {
    name: "Jane Doe",
    role: "Head of Operations",
    image: "https://i.pravatar.cc/150?img=7",
    bio: "Drives SnapMart’s growth and ensures operations run smoothly.",
  },
  {
    name: "Arjun Singh",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/150?img=15",
    bio: "Loves scalable code and innovative user interfaces.",
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen text-gray-800 p-4 md:p-0">

      {/* Main heading */}
      <div className="max-w-4xl mx-auto text-center py-14 px-4">
        <h1 className="text-4xl font-black text-blue-700 mb-4 tracking-tight">About SnapMart</h1>
        <p className="text-lg text-gray-600">
          Your modern online market for hassle-free, delightful shopping.
        </p>
      </div>

      {/* Mission */}
      <section className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mb-8 border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold text-blue-700 mb-3">Our Mission</h2>
        <p>
          Empower everyone to shop smarter and easier, wherever they are. We aim to deliver exceptional products and service, making shopping an enjoyable and effortless experience for all.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mb-8 border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold text-blue-600 mb-3">Our Story</h2>
        <p>
          SnapMart was founded with a simple idea: <span className="text-blue-700 font-semibold">make online shopping a joy</span>. What started as a team of two in a small office is now a fast-growing marketplace. We’re constantly evolving, listening, and learning from our customers to make SnapMart your go-to shopping destination.
        </p>
      </section>

      {/* Meet our team */}
      <section className="mx-auto max-w-5xl py-10">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="w-60 bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col items-center"
            >
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full border-4 border-blue-200 mb-4 object-cover" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-700">{member.name}</h3>
                <p className="text-gray-500 mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ready to join */}
      <section className="max-w-2xl mx-auto text-center mt-14 mb-10 p-10 bg-blue-600 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-black text-white mb-2">Ready to Join?</h2>
        <p className="text-blue-100 mb-6">
          Whether you’re a passionate shopper, skilled vendor, or want to build with us—there’s a place for you at SnapMart. Let’s grow together!
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-blue-600 font-bold text-lg px-7 py-3 rounded-xl shadow hover:bg-blue-50 hover:text-blue-700 transition"
        >
          Get Started
        </Link>
      </section>
      
    </div>
  );
};

export default About;
