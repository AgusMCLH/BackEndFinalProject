import express from 'express';
import config from './config/config.js';
import { realTimeProducts } from './router/realtimeproduct.js';
import { testRouter } from './router/test.router.js';
import { notFoundPage } from './router/404.router.js';
import SessionRouter from './router/session.router.js';
import ProductsRouter from './router/products.Router.js';
import CartRouting from './router/carts.Router.js';
import UserRouter from './router/users.router.js';
import ChatRouter from './router/chat.Router.js';
import HomeRouter from './router/home.Router.js';
import MockingRouter from './router/moking.Router.js';
import LoggerRouter from './router/loggerTest.Router.js';
import OwnerMenuRouter from './router/ownerMenu.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import compression from 'express-compression';
import { loggerMiddleware } from './middleware/logger.middleware.js';
import { logger } from './middleware/logger.middleware.js';
import errorManagerMiddleware from './middleware/errorManager.middleware.js';

let messages = [];

const app = express();

app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(cookieParser(config.SECRET));
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: config.MONGOURL,
      mongoOptions: { useNewUrlParser: true },
      ttl: 6000,
    }),
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: { title: 'Delilah Resto', version: '0.7.3', description: 'Delilah Resto API Information' },
  },
  apis: ['./docs/**/*.yaml'],
};
const specs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', new HomeRouter().getRouter());
app.use('/api/test', testRouter);
app.use('/api/products', new ProductsRouter().getRouter());
app.use('/api/chat', new ChatRouter().getRouter());
app.use('/api/carts', new CartRouting().getRouter());
app.use('/api/realtimeproducts', realTimeProducts);
app.use('/users', new UserRouter().getRouter());
app.use('/api/sessions', new SessionRouter().getRouter());
app.use('/mockingproducts', new MockingRouter().getRouter());
app.use('/loggerTest', new LoggerRouter().getRouter());
app.use('/ownermenu', new OwnerMenuRouter().getRouter());
app.use('*', notFoundPage);

app.use(errorManagerMiddleware);

// 👇 Export default para Vercel
export default app;
