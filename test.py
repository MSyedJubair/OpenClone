# from google import genai
# import os
# from dotenv import load_dotenv

# load_dotenv() 

# api_key = os.getenv('GEMINI_API_KEY')
# client = genai.Client(api_key=api_key)

# response = client.models.generate_content(
#     model="gemini-2.5-flash",  # valid model for text generation
#     contents="Hello world"
# )

# print(response.text)

codeFiles = {
    "App.jsx": {
        "file": {
            "contents": "import React from 'react'; export default function App() { return <div>Hello</div>; }"
        }
    },
    "components": {
        "directory": {
            "layout": {
                "directory": {
                    "Header.jsx": {
                        "file": {
                            "contents": "export const Header = () => <header>Header</header>;"
                        }
                    },
                    "Footer.jsx": {
                        "file": {
                            "contents": "export const Footer = () => <footer>Footer</footer>;"
                        }
                    },
                    "Nav": {
                        "directory": {
                            "NavItem.jsx": {
                                "file": {
                                    "contents": "export const NavItem = () => <li>Item</li>;"
                                }
                            },
                            "Dropdown": {
                                "directory": {
                                    "Dropdown.jsx": {
                                        "file": {
                                            "contents": "export const Dropdown = () => <div>Dropdown</div>;"
                                        }
                                    },
                                    "DropdownItem.jsx": {
                                        "file": {
                                            "contents": "export const DropdownItem = () => <div>Item</div>;"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "ui": {
                "directory": {
                    "Button": {
                        "directory": {
                            "Button.jsx": {
                                "file": {
                                    "contents": "export const Button = () => <button>Click</button>;"
                                }
                            },
                            "Button.test.js": {
                                "file": {
                                    "contents": "test('button', () => {});"
                                }
                            },
                            "styles": {
                                "directory": {
                                    "button.css": {
                                        "file": {
                                            "contents": ".btn { color: red; }"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "Modal": {
                        "directory": {
                            "Modal.jsx": {
                                "file": {
                                    "contents": "export const Modal = () => <div>Modal</div>;"
                                }
                            },
                            "ModalHeader.jsx": {
                                "file": {
                                    "contents": "export const ModalHeader = () => <div>Header</div>;"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "hooks": {
        "directory": {
            "useAuth.js": {
                "file": {
                    "contents": "export const useAuth = () => {};"
                }
            },
            "useFetch.js": {
                "file": {
                    "contents": "export const useFetch = () => {};"
                }
            }
        }
    },
    "utils": {
        "directory": {
            "format.js": {
                "file": {
                    "contents": "export const format = () => {};"
                }
            },
            "math": {
                "directory": {
                    "add.js": {
                        "file": {
                            "contents": "export const add = (a,b)=>a+b;"
                        }
                    },
                    "deep": {
                        "directory": {
                            "nested": {
                                "directory": {
                                    "veryDeep.js": {
                                        "file": {
                                            "contents": "export const deep = true;"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "public": {
        "directory": {
            "index.html": {
                "file": {
                    "contents": "<!DOCTYPE html><html></html>"
                }
            },
            "assets": {
                "directory": {
                    "images": {
                        "directory": {
                            "logo.png": {
                                "file": {
                                    "contents": "<binary>"
                                }
                            }
                        }
                    },
                    "fonts": {
                        "directory": {
                            "Roboto.woff2": {
                                "file": {
                                    "contents": "<binary>"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "config": {
        "directory": {
            "env": {
                "directory": {
                    "dev.json": {
                        "file": {
                            "contents": '{"api": "localhost"}'
                        }
                    },
                    "prod.json": {
                        "file": {
                            "contents": '{"api": "prod"}'
                        }
                    }
                }
            },
            "webpack": {
                "directory": {
                    "webpack.config.js": {
                        "file": {
                            "contents": "module.exports = {};"
                        }
                    }
                }
            }
        }
    },
    "tests": {
        "directory": {
            "unit": {
                "directory": {
                    "App.test.js": {
                        "file": {
                            "contents": "test('app', () => {});"
                        }
                    }
                }
            },
            "integration": {
                "directory": {
                    "App.int.test.js": {
                        "file": {
                            "contents": "test('integration', () => {});"
                        }
                    }
                }
            }
        }
    },
    "package.json": {
        "file": {
            "contents": '{"name": "test-app", "version": "1.0.0"}'
        }
    },
    "README.md": {
        "file": {
            "contents": "# Test Project"
        }
    }
}


# files = {
#   "App.jsx": {
#     "file": {
#       "contents": "source code string",
#     },
#   },
#   "components": {
#     "directory": {
#       "header.jsx": {
#         "file": {
#           "contents": "source code string",
#         },
#       },
#     },
#   },
#   "package.json": {
#     "file": {
#       "contents": "add dependencies and versions",
#     },
#   },
# }

sandpackfiles = {}

{
  "src": {
    "directory": {
      "assets": {
        "directory": {
          "logo.svg": {
            "file": {
              "contents": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12 2L2 7V17L12 22L22 17V7L12 2Z\" stroke=\"#1D4ED8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M7 4.5L12 7.5L17 4.5\" stroke=\"#1D4ED8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M2 7L12 12L22 7\" stroke=\"#1D4ED8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22L12 12\" stroke=\"#1D4ED8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n"
            }
          }
        }
      },
      "App.jsx": {
        "file": {
          "contents": "import React from 'react';\n import Header from './components/Header';\nimport Hero from './components/Hero';\nimport FeaturedProperties from './components/FeaturedProperties';\nimport CallToAction from './components/CallToAction';\nimport Footer from './components/Footer';\n\nfunction App() {\n  return (\n    <div className=\"min-h-screen bg-white font-sans text-dark\">\n      <Header />\n      <main>\n        <Hero />\n        <FeaturedProperties />\n        <CallToAction />\n      </main>\n      <Footer />\n    </div>\n  );\n}\n\nexport default App;\n"
        }
      },
      "main.jsx": {
        "file": {
          "contents": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n"
        }
      },
      "index.css": {
        "file": {
          "contents": "@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n@import 'tailwindcss/utilities';\n\n/* Optional: Add custom fonts from Google Fonts */\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@400;700&display=swap');\n"
        }
      },
      "components": {
        "directory": {
          "Hero.jsx": {
            "file": {
              "contents": "import React from 'react';\n\nconst Hero = () => {\n  return (\n    <section id=\"hero\" className=\"relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32 lg:py-48 overflow-hidden\">\n      {/* Background shape/pattern */}\n      <div className=\"absolute inset-0 z-0 opacity-20\">\n        <svg className=\"w-full h-full\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\">\n          <polygon points=\"0,100 100,0 100,100\" fill=\"currentColor\" className=\"text-blue-700\" />\n          <circle cx=\"80\" cy=\"20\" r=\"15\" fill=\"currentColor\" className=\"text-blue-500\" />\n          <rect x=\"10\" y=\"70\" width=\"20\" height=\"20\" fill=\"currentColor\" className=\"text-blue-500\" />\n        </svg>\n      </div>\n\n      <div className=\"container mx-auto text-center relative z-10 px-4\">\n        <h1 className=\"text-4xl md:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-in-up\">\n          Find Your <span className=\"text-secondary\">Dream Home</span> Today\n        </h1>\n        <p className=\"text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90 animate-fade-in-up delay-200\">\n          Explore thousands of properties for sale and rent. Your perfect living space is just a click away.\n        </p>\n        <div className=\"flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-400\">\n          <button className=\"bg-secondary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition duration-300 shadow-lg\">\n            Browse Properties\n          </button>\n          <button className=\"bg-white text-primary px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition duration-300 shadow-lg\">\n            Contact an Agent\n          </button>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default Hero;\n"
            }
          },
          "Footer.jsx": {
            "file": {
              "contents": "import React from 'react';\n\nconst Footer = () => {\n  return (\n    <footer className=\"bg-dark text-white py-12\">\n      <div className=\"container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8\">\n        <div>\n          <h3 className=\"text-xl font-bold mb-4 text-primary\">DreamHomes</h3>\n          <p className=\"text-gray-400 text-sm\">\n            Your trusted partner in finding your dream home. We make real estate dreams a reality.\n          </p>\n        </div>\n        <div>\n          <h3 className=\"text-lg font-semibold mb-4\">Quick Links</h3>\n          <ul className=\"space-y-2\">\n            <li><a href=\"#hero\" className=\"text-gray-400 hover:text-white transition duration-300\">Home</a></li>\n            <li><a href=\"#properties\" className=\"text-gray-400 hover:text-white transition duration-300\">Properties</a></li>\n            <li><a href=\"#about\" className=\"text-gray-400 hover:text-white transition duration-300\">About Us</a></li>\n            <li><a href=\"#contact\" className=\"text-gray-400 hover:text-white transition duration-300\">Contact</a></li>\n          </ul>\n        </div>\n        <div>\n          <h3 className=\"text-lg font-semibold mb-4\">Services</h3>\n          <ul className=\"space-y-2\">\n            <li><a href=\"#\" className=\"text-gray-400 hover:text-white transition duration-300\">Buy a Home</a></li>\n            <li><a href=\"#\" className=\"text-gray-400 hover:text-white transition duration-300\">Sell a Home</a></li>\n            <li><a href=\"#\" className=\"text-gray-400 hover:text-white transition duration-300\">Rent a Home</a></li>\n            <li><a href=\"#\" className=\"text-gray-400 hover:text-white transition duration-300\">Property Management</a></li>\n          </ul>\n        </div>\n        <div>\n          <h3 className=\"text-lg font-semibold mb-4\">Contact Us</h3>\n          <p className=\"text-gray-400\">123 Dream Street, Suite 456</p>\n          <p className=\"text-gray-400\">Dreamville, CA 90210</p>\n          <p className=\"text-gray-400\">Email: info@dreamhomes.com</p>\n          <p className=\"text-gray-400\">Phone: (123) 456-7890</p>\n        </div>\n      </div>\n      <div className=\"border-t border-gray-700 mt-8 pt-8 text-center\">\n        <p className=\"text-gray-500 text-sm\">&copy; {new Date().getFullYear()} DreamHomes. All rights reserved.</p>\n      </div>\n    </footer>\n  );\n};\n\nexport default Footer;\n"
            }
          },
          "Header.jsx": {
            "file": {
              "contents": "import React, { useState } from 'react';\nimport Logo from '../assets/logo.svg';\n\nconst Header = () => {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <header className=\"bg-white shadow-md p-4 sticky top-0 z-50\">\n      <div className=\"container mx-auto flex justify-between items-center\">\n        <div className=\"flex items-center\">\n          <img src={Logo} alt=\"Logo\" className=\"h-8 w-8 mr-2\" />\n          <span className=\"text-2xl font-bold text-primary\">DreamHomes</span>\n        </div>\n\n        <nav className=\"hidden md:flex space-x-6\">\n          <a href=\"#hero\" className=\"text-dark hover:text-primary transition duration-300\">Home</a>\n          <a href=\"#properties\" className=\"text-dark hover:text-primary transition duration-300\">Properties</a>\n          <a href=\"#about\" className=\"text-dark hover:text-primary transition duration-300\">About Us</a>\n          <a href=\"#contact\" className=\"text-dark hover:text-primary transition duration-300\">Contact</a>\n        </nav>\n\n        <div className=\"hidden md:block\">\n          <button className=\"bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300\">\n            List Your Property\n          </button>\n        </div>\n\n        <div className=\"md:hidden\">\n          <button onClick={() => setIsOpen(!isOpen)} className=\"text-dark focus:outline-none\">\n            <svg className=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n              {isOpen ? (\n                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M6 18L18 6M6 6l12 12\"></path>\n              ) : (\n                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M4 6h16M4 12h16m-7 6h7\"></path>\n              )}\n            </svg>\n          </button>\n        </div>\n      </div>\n\n      {isOpen && (\n        <div className=\"md:hidden bg-white mt-4 space-y-2 p-4 border-t border-gray-200\">\n          <a href=\"#hero\" className=\"block text-dark hover:text-primary transition duration-300 py-2\">Home</a>\n          <a href=\"#properties\" className=\"block text-dark hover:text-primary transition duration-300 py-2\">Properties</a>\n          <a href=\"#about\" className=\"block text-dark hover:text-primary transition duration-300 py-2\">About Us</a>\n          <a href=\"#contact\" className=\"block text-dark hover:text-primary transition duration-300 py-2\">Contact</a>\n          <button className=\"w-full bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-2\">\n            List Your Property\n          </button>\n        </div>\n      )}\n    </header>\n  );\n};\n\nexport default Header;\n"
            }
          },
          "CallToAction.jsx": {
            "file": {
              "contents": "import React from 'react';\n\nconst CallToAction = () => {\n  return (\n    <section className=\"bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white\">\n      <div className=\"container mx-auto text-center px-4\">\n        <h2 className=\"text-4xl font-serif font-bold mb-6\">\n          Ready to Find Your Next Home?\n        </h2>\n        <p className=\"text-lg opacity-90 max-w-3xl mx-auto mb-10\">\n          Whether you're buying, selling, or renting, our expert agents are here to help you every step of the way. Contact us today for a free consultation!\n        </p>\n        <div className=\"flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6\">\n          <button className=\"bg-secondary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-600 transition duration-300 shadow-md\">\n            Get Started\n          </button>\n          <button className=\"border border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-primary transition duration-300 shadow-md\">\n            Learn More\n          </button>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default CallToAction;\n"
            }
          },
          "FeaturedProperties.jsx": {
            "file": {
              "contents": "import React from 'react';\n\nconst properties = [\n  {\n    id: 1,\n    image: 'https://via.placeholder.com/400x300/525252/ffffff?text=Modern+Villa',\n    title: 'Luxury Modern Villa',\n    location: 'Beverly Hills, CA',\n    price: '$2,500,000',\n    beds: 4,\n    baths: 3,\n    sqft: 3200,\n  },\n  {\n    id: 2,\n    image: 'https://via.placeholder.com/400x300/6b7280/ffffff?text=Family+House',\n    title: 'Spacious Family House',\n    location: 'Suburbia, TX',\n    price: '$450,000',\n    beds: 3,\n    baths: 2,\n    sqft: 2100,\n  },\n  {\n    id: 3,\n    image: 'https://via.placeholder.com/400x300/4b5563/ffffff?text=City+Apartment',\n    title: 'Downtown Apartment',\n    location: 'New York, NY',\n    price: '$850,000',\n    beds: 2,\n    baths: 2,\n    sqft: 1100,\n  },\n  {\n    id: 4,\n    image: 'https://via.placeholder.com/400x300/374151/ffffff?text=Beachfront+Home',\n    title: 'Beachfront Paradise',\n    location: 'Malibu, CA',\n    price: '$3,800,000',\n    beds: 5,\n    baths: 4,\n    sqft: 4500,\n  },\n  {\n    id: 5,\n    image: 'https://via.placeholder.com/400x300/1f2937/ffffff?text=Cozy+Cottage',\n    title: 'Cozy Country Cottage',\n    location: 'Rural Area, VT',\n    price: '$320,000',\n    beds: 2,\n    baths: 1,\n    sqft: 1500,\n  },\n  {\n    id: 6,\n    image: 'https://via.placeholder.com/400x300/111827/ffffff?text=Luxury+Penthouse',\n    title: 'Luxury City Penthouse',\n    location: 'Miami, FL',\n    price: '$1,200,000',\n    beds: 3,\n    baths: 3,\n    sqft: 2800,\n  },\n];\n\nconst PropertyCard = ({ property }) => (\n  <div className=\"bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group\">\n    <img \n      src={property.image} \n      alt={property.title} \n      className=\"w-full h-56 object-cover object-center transform group-hover:scale-105 transition-transform duration-500\"\n    />\n    <div className=\"p-6\">\n      <h3 className=\"text-xl font-bold text-dark mb-2\">{property.title}</h3>\n      <p className=\"text-gray-600 mb-3 flex items-center\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" className=\"h-5 w-5 mr-2 text-primary\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n          <path fillRule=\"evenodd\" d=\"M5.05 4.05A7 7 0 1110 18.15V21a1 1 0 11-2 0v-2.85a7 7 0 01-2.95-12.25zM10 11a3 3 0 100-6 3 3 0 000 6z\" clipRule=\"evenodd\" />\n        </svg>\n        {property.location}\n      </p>\n      <p className=\"text-2xl font-bold text-primary mb-4\">{property.price}</p>\n      <div className=\"flex justify-between text-gray-700 text-sm mb-4\">\n        <span className=\"flex items-center\"><i className=\"fas fa-bed mr-1 text-primary\"></i> {property.beds} Beds</span>\n        <span className=\"flex items-center\"><i className=\"fas fa-bath mr-1 text-primary\"></i> {property.baths} Baths</span>\n        <span className=\"flex items-center\"><i className=\"fas fa-ruler-combined mr-1 text-primary\"></i> {property.sqft} sqft</span>\n      </div>\n      <button className=\"w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300\">\n        View Details\n      </button>\n    </div>\n  </div>\n);\n\nconst FeaturedProperties = () => {\n  return (\n    <section id=\"properties\" className=\"py-16 bg-light\">\n      <div className=\"container mx-auto px-4\">\n        <h2 className=\"text-4xl font-serif font-bold text-center text-dark mb-12\">\n          Our Featured Properties\n        </h2>\n        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">\n          {properties.map((property) => (\n            <PropertyCard key={property.id} property={property} />\n          ))}\n        </div>\n        <div className=\"text-center mt-12\">\n          <button className=\"bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md\">\n            View All Properties\n          </button>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default FeaturedProperties;\n"
            }
          }
        }
      }
    }
  },
  "index.html": {
    "file": {
      "contents": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Dream Homes</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.jsx\"></script>\n  </body>\n</html>\n"
    }
  },
  "package.json": {
    "file": {
      "contents": "{\n  \"name\": \"real-estate-landing\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\"\n  },\n  \"devDependencies\": {\n    \"@types/react\": \"^18.2.15\",\n    \"@types/react-dom\": \"^18.2.7\",\n    \"@vitejs/plugin-react\": \"^4.0.3\",\n    \"autoprefixer\": \"^10.4.16\",\n    \"eslint\": \"^8.45.0\",\n    \"eslint-plugin-react\": \"^7.32.2\",\n    \"eslint-plugin-react-hooks\": \"^4.6.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.3\",\n    \"postcss\": \"^8.4.31\",\n    \"tailwindcss\": \"^3.3.3\",\n    \"vite\": \"^4.4.5\"\n  }\n}\n"
    }
  },
  "postcss.config.js": {
    "file": {
      "contents": "export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n"
    }
  },
  "tailwind.config.js": {
    "file": {
      "contents": "/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    \"./index.html\",\n    \"./src/**/*.{js,ts,jsx,tsx}\",\n  ],\n  theme: {\n    extend: {\n      fontFamily: {\n        sans: ['Inter', 'sans-serif'],\n        serif: ['Merriweather', 'serif'],\n      },\n      colors: {\n        primary: '#1D4ED8', // Blue\n        secondary: '#D97706', // Orange\n        dark: '#1F2937', // Dark Gray\n        light: '#F3F4F6', // Light Gray\n      }\n    },\n  },\n  plugins: [],\n};\n"
    }
  }
}

def crawlFiles(files, path=""):
    for name, node in files.items():
        if "directory" in node:
            # go deeper into directory
            crawlFiles(node["directory"], path + name + "/")
        elif "file" in node:
            # build full path
            full_path = path + name
            sandpackfiles[full_path] = node["file"]["contents"]

# run it
crawlFiles(codeFiles)

# debug output
print(sandpackfiles)