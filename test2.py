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

# codeFiles = {
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

newFile = {}

def crawlFiles(files):
    results = {}
    for name, content in files.items():
        if 'directory' in content:
            results[name] = crawlFiles(content['directory'])
        else:
            results[name] = content['file']['contents']

    return results

newFile = crawlFiles(codeFiles)

import pprint
pprint.pprint(newFile)