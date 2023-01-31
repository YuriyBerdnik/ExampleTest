interface IEnv {
    NODE_ENV: string;
    PORT: string | number;
}


const env: IEnv = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 4100,
}

export default env;
