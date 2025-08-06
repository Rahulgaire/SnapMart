import React, { useContext, useEffect } from 'react'
import { HeroSectionOne } from './HeroSectionOne.jsx'
import { ProductsContext } from '../../context/ProductsContext.jsx'
import { AnimatedTestimonialsDemo } from './Testimonials.jsx';
import { InfiniteMovingCardsDemo } from './InfiniteMovingCardsDemo.jsx';
import Accordian from './Accordian.jsx';
import Support from '../../admin/Support.jsx';
import QuoteOfTheDay from '../../components/RandomQuote/QuoteOfTheDay.jsx';
import { TypewriterEffectSmoothDemo } from './TypewriterEffectSmoothDemo.jsx';
import { Link } from 'react-router-dom';
import { ExpandableCardDemo } from '../Blogs/ExpandableCardDemo.jsx';

const Home = () => {
  const { fetchProducts, products } = useContext(ProductsContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  return (
    <>
      <TypewriterEffectSmoothDemo />
      <HeroSectionOne />
      <div className="container mx-auto px-4 py-8"  >
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>

      {/* {products.slice(0, 8).map((product, index) => (
  <div
    key={index}
    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-200"
  >
    <div className="relative overflow-hidden">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4 flex flex-col justify-between min-h-[170px]">
      <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-blue-600 text-xl font-semibold mt-1">
        ₹{product.price}
      </p>
        <Link to="/products">
      
      <button
        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
        aria-label={`Explore more about ${product.title}`}
      >
        Explore More
      </button>
        </Link>
    </div>
  </div>
))} */}
<ExpandableCardDemo />
      </div>
      <InfiniteMovingCardsDemo />
      <section >
        <AnimatedTestimonialsDemo />
      </section>
      <Accordian />
      {/* <Support /> */}
      <QuoteOfTheDay/>
    </>
  )
}

export default Home
