import React from 'react';
import heroImg from '../assets/SJ_screenshot_V5.jpg'; // Replace with your actual image file

const testimonials = [
  {
    name: 'Amit Sharma',
    text: 'StonkJournal has made tracking my trades effortless. The interface is clean and the features are exactly what I need.'
  },
  {
    name: 'Priya Singh',
    text: 'I love how fast and easy it is to log my trades. The best part is it’s free and ad-free! Highly recommended.'
  },
  {
    name: 'Rahul Verma',
    text: 'The journal fits perfectly into my daily routine. The testimonials section is a nice touch and the FAQ answers all my questions.'
  }
];

const faqs = [
  {
    question: 'What is StonkJournal?',
    answer: 'StonkJournal is a trading journal that started as a personal project and has grown to thousands of users. It provides users a free comprehensive, easy and fast journaling experience with zero barriers to entry. Our journal revolves around quickness, a short learning curve, and an overall journaling flow that is easy to integrate into your daily trading workflow.'
  },
  {
    question: 'Is our trading journal free?',
    answer: 'YES. While we can’t promise that all future features will be free, the goal is to provide a free trading journal that is comprehensive enough to satisfy majority of traders.'
  },
  {
    question: 'Do you sell any user data?',
    answer: 'No, and never will. Not only that, but we don’t require you to verify your email address in order to use our platform, so that you can stay as anonymous as possible.'
  },
  {
    question: 'What assets are supported?',
    answer: 'Stocks, Options, Futures, Crypto and Forex.'
  }
];

const Landing = () => {
  return (
    <div className="bg-[#0f1624] min-h-screen w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-10 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Trading Journal for the people.</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">Looking for a free and ad free trading journal that's fast, easy to use and comprehensive enough to seamlessly integrate into your daily routine? Look no further!</p>
        <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-3 rounded-full font-semibold text-lg transition mb-12">Get Started</button>
        <img src={heroImg} alt="Trading Journal" className="w-full max-w-3xl rounded-xl shadow-lg mb-20" />
      </section>

      {/* Testimonials Section (plain white background) */}
      <section className="w-full bg-white py-16 px-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#3b82f6'}}>Testimonials</h2>
          <p className="text-black font-semibold mb-8">What our users say</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                <div className="flex items-center mb-3">
                  <span className="text-amber-400 text-xl mr-1">★</span>
                  <span className="text-amber-400 text-xl mr-1">★</span>
                  <span className="text-amber-400 text-xl mr-1">★</span>
                  <span className="text-amber-400 text-xl mr-1">★</span>
                  <span className="text-amber-400 text-xl">★</span>
                </div>
                <span className="text-black font-bold text-lg mb-3">{t.name}</span>
                <p className="text-gray-800 text-base text-center">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with its own background (condensed) */}
      <section className="w-full py-12 px-4" style={{background: '#2C303A'}}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">FAQ</h2>
          <p className="text-gray-300 text-base mb-8">StonkJournal is a trading journal that started as a personal project and has grown to thousands of users. It provides users a free comprehensive, easy and fast journaling experience with zero barriers to entry. Our journal revolves around quickness, a short learning curve, and an overall journaling flow that is easy to integrate into your daily trading workflow.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {faqs.slice(0,3).map((faq, idx) => (
              <div key={idx} className="bg-[#23262f] rounded-lg p-6 text-left">
                <h3 className="text-white font-bold text-md mb-3">{faq.question}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mb-6 text-white text-base font-medium">Have Questions? Get in touch!</div>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2 rounded-full font-semibold text-base transition">Contact Us</button>
        </div>
      </section>

      {/* Return to main background for rest of page */}
      <div className="bg-[#0f1624] w-full h-32"></div>
    </div>
  );
}

export default Landing;