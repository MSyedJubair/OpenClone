// const files = {
//   "package.json": {
//     file: {
//       contents:
//         '{   "name": "framer-motion-demo",   "private": true,   "version": "0.0.0",   "type": "module",   "scripts": {     "dev": "vite",     "build": "vite build",     "preview": "vite preview"   },   "dependencies": {     "react": "^18.2.0",     "react-dom": "^18.2.0",     "framer-motion": "^11.0.0"   },   "devDependencies": {     "vite": "^5.0.0",     "@vitejs/plugin-react": "^4.0.0"   } }',
//     },
//   },
//   "vite.config.js": {
//     file: {
//       contents:
//         "import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react';  export default defineConfig({   plugins: [react()] });",
//     },
//   },
//   "index.html": {
//     file: {
//       contents:
//         '<!DOCTYPE html> <html lang="en">   <head>     <meta charset="UTF-8" />     <meta name="viewport" content="width=device-width, initial-scale=1.0" />     <title>Framer Motion Demo</title>   </head>   <body>     <div id="root"></div>     <script type="module" src="/main.jsx"></script>   </body> </html>',
//     },
//   },
//   "main.jsx": {
//     file: {
//       contents:
//         "import React from 'react'; import { createRoot } from 'react-dom/client'; import App from './App';  createRoot(document.getElementById('root')).render(   <React.StrictMode>     <App />   </React.StrictMode> );",
//     },
//   },
//   "App.jsx": {
//     file: {
//       contents:
//         "import React, { useState } from 'react'; import { motion } from 'framer-motion';  export default function App() {   const [expanded, setExpanded] = useState(false);    return (     <div style={styles.container}>       <h1>Framer Motion Demo 🚀</h1>        <motion.div         style={styles.box}         animate={{           scale: expanded ? 1.5 : 1,           rotate: expanded ? 180 : 0,           borderRadius: expanded ? '50%' : '10%'         }}         transition={{ duration: 0.6 }}       />        <button onClick={() => setExpanded(!expanded)} style={styles.button}>         Toggle Animation       </button>        <div style={styles.cardContainer}>         {[1, 2, 3].map((item) => (           <motion.div             key={item}             style={styles.card}             whileHover={{ scale: 1.1, y: -10 }}             whileTap={{ scale: 0.95 }}           >             Card {item}           </motion.div>         ))}       </div>        <div style={{ marginTop: 40 }}>         {[1, 2, 3, 4].map((item) => (           <motion.div             key={item}             initial={{ opacity: 0, y: 20 }}             animate={{ opacity: 1, y: 0 }}             transition={{ delay: item * 0.2 }}             style={styles.listItem}           >             Item {item}           </motion.div>         ))}       </div>     </div>   ); }  const styles = {   container: {     fontFamily: 'sans-serif',     textAlign: 'center',     padding: 40   },   box: {     width: 100,     height: 100,     background: 'linear-gradient(135deg, #6e8efb, #a777e3)',     margin: '20px auto'   },   button: {     padding: '10px 20px',     marginBottom: 30,     cursor: 'pointer'   },   cardContainer: {     display: 'flex',     justifyContent: 'center',     gap: 20   },   card: {     width: 100,     height: 100,     background: '#eee',     display: 'flex',     alignItems: 'center',     justifyContent: 'center',     borderRadius: 10,     cursor: 'pointer'   },   listItem: {     background: '#ddd',     margin: '10px auto',     padding: 10,     width: 200,     borderRadius: 8   } };",
//     },
//   },
// };

const files = {
  "App.jsx": {
    file: {
      contents: "source code string",
    },
  },
  components: {
    directory: {
      "header.jsx": {
        file: {
          contents: "source code string",
        },
      },
    },
  },
  "package.json": {
    file: {
      contents: "add dependencies and versions",
    },
  },
};

let sandpackfile = {};

function crawlFiles(files, path = "") {
  for (const name in files) {
    const node = files[name];

    if (node.directory) {
      // go deeper into directory
      crawlFiles(node.directory, path + name + "/");
    } else if (node.file) {
      // build full path
      const fullPath = path + name;
      sandpackfile[fullPath] = node.file.contents;
    }
  }
}

crawlFiles(files)
console.log(sandpackfile)