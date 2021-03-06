const express = require('express')
const app = express()
const _env = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./src/routes/user')
const adminRoutes = require('./src/routes/admin/user')
const categoryRoutes = require('./src/routes/category')
const productRoutes = require('./src/routes/product')
const cartRoutes = require('./src/routes/cart')
const initialDataRoutes = require('./src/routes/admin/initialData')
const pageRoutes = require('./src/routes/admin/page')
const addressRoutes = require('./src/routes/address')
const orderRoutes = require('./src/routes/order')
const adminOrderRoutes = require('./src/routes/admin/order')
const reviewRoutes = require('./src/routes/review')
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const path = require('path')
const cors = require('cors')
_env.config();

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://pelagios.au.auth0.com/.well-known/jwks.json'
  }),
  audience: 'pelagiosart.com',
  issuer: 'https://pelagios.au.auth0.com/',
  algorithms: ['RS256']
}).unless(['/api/check']);



mongoose
  .connect(
    `mongodb://${process.env.DATABASE_IPADDRESSE}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex:true
    }
  )
  .then(() => {
    console.log("Local database connected");
  })
  .catch(async (err) => {
    console.log(err);
  });
  var db = mongoose.connection;
  db.on('error',()=>{
    console.error.bind(console, 'connection error:');
    mongoose
    .connect(
      `${process.env.DB_BACKUP}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      useCreateIndex:true
      }
    )
    .then(() => {
      console.log("Remote database connected");
    })
  });
  db.once('open', function callback() {
    console.log("Connected with Database Done.");
  });

  
app.use(cors())
// app.use(jwtCheck);
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', initialDataRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', pageRoutes)
app.use('/api', addressRoutes)
app.use('/api', orderRoutes)
app.use('/api', adminOrderRoutes)
app.use('/api', reviewRoutes)

app.get('/api/check', (req, res) => {
  res.send("you are logged in")
})


app.listen(process.env.PORT || 2000, `${process.env.IPADDRESS}` || `localhost`, () => {
  console.log(`server running pn port number http://${process.env.IPADDRESS}:${process.env.PORT}`)
})

