import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { PiBuildingOfficeLight } from "react-icons/pi";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/stateful-button";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("https://snapmart-backend.onrender.com/api/contact", form);
      toast.success(data.message || "Message sent successfully!");
      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send message.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 bg-gradient-to-tr from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Info */}
        <div className="lg:w-1/2 flex flex-col gap-10 bg-white shadow-lg p-8 rounded-xl border border-blue-100">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-semibold text-blue-700">
              <FaPhoneAlt /> Contact SnapMart
            </h1>
            <p className="text-gray-600 mt-2">
              We’re here to help with all your shopping or platform-related queries.
              Reach out to the SnapMart team — we’ll get back to you promptly.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-3 text-xl font-semibold text-blue-700">
              <PiBuildingOfficeLight /> SnapMart Office
            </h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              <span className="font-medium">SnapMart Private Ltd.</span>
              <br />
              207, IInd Floor, K-10 Tower,
              <br />
              Feroze Gandhi Market, Ludhiana – 141001, Punjab
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">📱 Phone & Email</h2>
            <p className="flex items-center gap-3 text-gray-600 mb-2">
              <FaPhoneAlt className="text-blue-700" />
              <span className="text-sm sm:text-base">+91 73473 49556</span>
            </p>
            <p className="flex items-center gap-3 text-gray-600 text-sm sm:text-base break-words">
              <FaEnvelope className="text-blue-700" />
              <span>gairerahul334@gmail.com</span>
            </p>
            <p className="flex items-center gap-3 text-gray-600 text-sm sm:text-base break-words">
              <FaEnvelope className="text-blue-700" />
              <span>support@snapmart.com</span>
            </p>

            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md mt-4 border border-blue-100">
              <iframe
                title="SnapMart Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.021370924425!2d75.85155637495656!3d30.902205674457335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83f0b720f7c3%3A0x9072bc1605537202!2sFeroze%20Gandhi%20Market%2C%20Ludhiana%2C%20Punjab%20141001!5e0!3m2!1sen!2sin!4v1691321406102!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-lg w-full border border-blue-100">
          <h1 className="text-xl font-semibold text-blue-700  flex items-center gap-3 mb-3">
            <PiBuildingOfficeLight className="text-blue-700 text-4xl" />
            <span className="inline-block">Support </span>
          </h1>
            <p className="text-gray-600 block mb-10">Have questions or need assistance? We're here to help!</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {[
              { label: "Name", id: "name", type: "text", required: true },
              { label: "Email", id: "email", type: "email", required: true },
              { label: "Mobile (optional)", id: "mobile", type: "tel" },
              { label: "Subject", id: "subject", type: "text", required: true },
            ].map(({ label, id, type, required }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={form[id]}
                  onChange={handleChange}
                  required={required}
                  placeholder={label}
                  className="w-full mt-2 rounded-md bg-gray-50 px-4 py-2.5 text-base shadow-sm border border-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                className="w-full mt-2 rounded-md bg-gray-50 px-4 py-2.5 text-base shadow-sm border border-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <Button disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
