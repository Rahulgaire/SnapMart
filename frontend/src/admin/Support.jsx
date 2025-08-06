import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaHeadset } from "react-icons/fa";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order in your account dashboard under the 'My Orders' section. You'll also receive updates via email/SMS.",
  },
  {
    question: "What is SnapMart's return policy?",
    answer: "We offer a 7-day return policy for most items. Please visit the Returns & Refunds section to initiate a return.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact us via email at support@snapmart.com or call us at +91 73473 49556.",
  },
  {
    question: "Do you offer express delivery?",
    answer: "Yes, we offer same-day or next-day delivery in selected cities. Delivery options will be shown at checkout.",
  },
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

const Support = () => {
  const [openIndex, setOpenIndex] = useState(null);

  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50  min-h-screen px-4 sm:px-6 lg:px-16 py-16 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">SnapMart Support</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Need help? We’re here for you.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <FaHeadset className="mx-auto text-3xl text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Live Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Available Mon–Sat, 10am–6pm</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <FaEnvelope className="mx-auto text-3xl text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p className="text-sm">support@snapmart.com</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
            <FaPhoneAlt className="mx-auto text-3xl text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg">Call Us</h3>
            <p className="text-sm">+91 73473 49556</p>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.slice(0,4).map((faq, index) => (
              <div key={index} className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left font-medium flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
            {
              faqs.length > 4 && (
                <button
                  onClick={() => toggleFAQ(4)}
                  className="text-blue-600 dark:text-blue-400 hover:underline mt-4"
                >
                  {openIndex === 4 ? "Show Less" : "Show More"}
                </button>
              )
            }
          </div>
        </div>

        {/* Contact Form */}
        {/* <div>
          <h2 className="text-2xl font-semibold mb-6">Still need help? Send us a message</h2>
          <form className="grid gap-4 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-2 rounded bg-gray-50 dark:bg-zinc-700 text-black dark:text-white outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-2 rounded bg-gray-50 dark:bg-zinc-700 text-black dark:text-white outline-none"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              required
              className="w-full p-2 rounded bg-gray-50 dark:bg-zinc-700 text-black dark:text-white outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div> */}

      </div>
    </div>
  );
};

export default Support;
