const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const admissionRoutes = require("./routes/admissionRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require('./routes/courseRoutes');
const blogRoutes = require('./routes/blogRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.json("gello");
})



// Routes
app.use("/api/admissions", admissionRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/blogs', blogRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
