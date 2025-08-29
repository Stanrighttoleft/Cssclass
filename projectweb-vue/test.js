  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/localhost-cert.pem')),
    },
    host: 'localhost',
    port: 5173,
  },

  //用來把vite改成https的字串段