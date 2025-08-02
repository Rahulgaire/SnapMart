import React, { useContext, useEffect } from 'react'
import { HeroSectionOne } from './HeroSectionOne'
import { ProductsContext } from '../context/ProductsContext.jsx'
import { AnimatedTestimonialsDemo } from '../components/Testimonials.jsx';

const Home = () => {
  const {fetchProducts,products} = useContext(ProductsContext);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <HeroSectionOne/>
      <div className="container mx-auto px-4 py-8"  >
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
              aria-label={`Add ${product.title} to cart`}
            >
              Explore More
            </button>
            </div>
          ))}
        </div>
      </div>
           <section className="mt-20">
        <AnimatedTestimonialsDemo />
      </section>
    </>
  )
}

export default Home
