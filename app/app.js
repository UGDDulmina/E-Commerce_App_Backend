const express = require('express');
const app = express();
const port = 3000;
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHander');
const bodyParser = require('body-parser');
const { mongoose } = require('mongoose');
const buyersRouter = require('./routes/buyer');
const adminRouter = require('./routes/admin');
const itemRouter = require('./routes/item');
const cartRouter = require('./routes/cart');
const sellerRouter = require('./routes/seller');
const authRouter = require('./routes/auth');
const cors = require('cors');

 
app.use(errorHandler);

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173', 
}));
// app.use(bodyParser.json())



// Middleware
app.use(express.json());


app.use('/buyers', buyersRouter);
app.use('/admin', adminRouter);
app.use('/items', itemRouter);
app.use('/carts', cartRouter);
app.use('/sellers', sellerRouter);
app.use('/auth', authRouter);


require('dotenv').config();
const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected to MongoDB')
}).catch(err => {
    console.error('Failde to connect to MongoDB', err)
})

app.listen(port, () => {
    console.log(`Server is running now!`);
});


