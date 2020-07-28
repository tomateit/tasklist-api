//---------MONGO DB SETUP -------
const MONGODB_CONNECTION_ENV: string | undefined = process.env.MONGODB_URI;
let MONGODB_CONNECTION_STRING: string;

if(isUndefined(MONGODB_CONNECTION_ENV)) {
    throw new Error("NO MONGODB CONNECTION PROVIDED")
}
MONGODB_CONNECTION_STRING = MONGODB_CONNECTION_ENV;

mongoose.connection.on("connecting", () => {
    console.log("Connecting to db...")
})

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to db.")
})

mongoose.connection.on("error", (error) => {
    console.error("DB connection failure:", error)
})

await mongoose.connect(MONGODB_CONNECTION_STRING, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log("Listing collections: ", mongoose.connection.modelNames())

// this.model.user = connection.model<IUserModel>("User", UserSchema);