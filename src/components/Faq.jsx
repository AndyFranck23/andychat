import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NOM_DE_DOMAIN } from "../App";

const Faq = () => {
  const location = useLocation()
  // Données des FAQ
  const [faqData, setFaqData] = useState([])
  const [showFaq, setShowFaq] = useState(false)

  useEffect(() => {
    classements()
  }, [])


  const classements = async () => {
    const path = location.pathname
    const slug = path.split('/').pop();
    try {
      const response = await axios.get(`${NOM_DE_DOMAIN}/allClassement`)
      const { classements } = response.data
      const tab = []
      classements.map((item) => {
        slug == item.title && JSON.parse(item.faq) != null ?
          JSON.parse(item.faq).map((elt, index) => {
            tab.push({ id: index, question: elt.question, answer: elt.answer })
          }) : null
      })
      // console.log(tab)
      if (tab.length != 0) setShowFaq(true)
      setFaqData(tab)
    } catch (e) {
      console.log(e)
    }
  }


  // État pour suivre la question active
  const [activeId, setActiveId] = useState(null);

  // Fonction pour ouvrir ou fermer une FAQ
  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id); // Toggle active FAQ
  };

  return (
    <>
      {showFaq &&
        <div className="min-h-screen  flex items-center justify-center py-10">
          <div className="max-w-3xl w-full p-6 bg-white rounded-lg ">
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
              Questions fréquemment posées
            </h1>
            <div className="space-y-4 ">
              {faqData.map((faq) => (
                <div key={faq.id} className=" rounded-md overflow-hidden  ">
                  {/* Question */}
                  <button
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-100 focus:outline-none "
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <span className="text-lg font-medium ">
                      {faq.question}
                    </span>

                    <span className="mt-1 text-xs">{activeId === faq.id ? <i className="fa-solid fa-chevron-down"></i>
                      : <i className="fa-solid fa-chevron-up"></i>}
                    </span>
                  </button>

                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-300 ${activeId === faq.id ? "max-h-[500px] p-4 bg-gray-50" : "max-h-0"}`}>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                  <hr className="border-black" />
                </div>
              ))}
            </div>
          </div>
        </div>}
    </>
  );
};

export default Faq;
