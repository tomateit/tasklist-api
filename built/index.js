"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dontenv = require("dotenv");
const app_1 = require("./server/app");
dontenv.config();
const port = process.env.PORT;
console.log(port);
const s = new app_1.default();
s.app.listen(port, () => {
    console.log("listening...");
});
//# sourceMappingURL=index.js.map