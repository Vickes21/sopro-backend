"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurableAnnotation = void 0;
const langgraph_1 = require("@langchain/langgraph");
const contact = {
    id: 1,
    name: "Rodrigo Souza",
};
exports.ConfigurableAnnotation = langgraph_1.Annotation.Root({
    contact: (0, langgraph_1.Annotation)({
        default: () => contact,
        reducer: (x, y) => y ?? x,
    }),
});
//# sourceMappingURL=config.js.map