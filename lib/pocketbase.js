import PocketBase from "pocketbase";

// const pb = new PocketBase("http://127.0.0.1:8090");
const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

export default pb;
