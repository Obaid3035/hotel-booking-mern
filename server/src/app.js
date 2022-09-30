import express from 'express';
import cors from 'cors';
import router from "./config/routes";

const app = express();

app.use(cors({ origin: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOCAL
//"mongodb://localhost/trip-advisor"



app.use(router)


export default app;
