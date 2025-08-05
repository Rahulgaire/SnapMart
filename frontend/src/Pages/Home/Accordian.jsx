import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

// Updated FAQ content for a grocery website named Snap Mart
const faqData = [
  {
    question: "What is Snap Mart?",
    answer: "Snap Mart is your one-stop online grocery store, offering fresh fruits, vegetables, dairy, snacks, and more delivered to your doorstep.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes! We provide same-day delivery for orders placed before 5 PM in select cities.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is placed, you’ll receive a tracking link via SMS and email to monitor your delivery in real-time.",
  },
  {
    question: "Can I return or exchange products?",
    answer: "Absolutely. If you're not satisfied with a product, you can request a return or replacement within 24 hours of delivery.",
  },
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center px-4 py-4 text-left text-lg font-medium bg-white hover:bg-gray-50 transition"
      >
        <span>{question}</span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`px-4 overflow-hidden transition-all duration-300 text-gray-600 ${
          isOpen ? "max-h-40 py-2" : "max-h-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-5xl bg-amber-50 mx-auto my-10 shadow-md rounded-lg overflow-hidden p-6 md:flex md:gap-10">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.wuJSgHr-n6kAFAyhv3wokgHaFj?pid=Api&P=0&h=180"
          alt="Snap Mart Illustration"
          className="max-w-full h-auto rounded-lg w-[500px]"
        />
      </div>

      {/* Right: Accordion */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-center md:text-left py-6 text-green-900">
          Snap Mart - Frequently Asked Questions
        </h2>
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => toggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
