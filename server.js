
const dotenv = require('dotenv');
const mongoose = require('mongoose');
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLER REJECTION 🛬 shutting down....');
    console.log(err);

    server.close(() => {
        process.exit(1);
    });
});
dotenv.config({ path: './config.env' });
const app = require('./app');
const db = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB connection successful'));
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`App is running on port:${port}`);
});
