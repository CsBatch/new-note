const connectToMongo = async () => {
    // const mongoURI = "mongodb+srv://shikhar:shikhar@cluster0.renerks.mongodb.net/iNoteBook"; //new note defines the database name
    const mongoURI = "mongodb://localhost:27017/new-note"; //new note defines the database name
    try {
      const conn = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };
  
  module.exports = connectToMongo;