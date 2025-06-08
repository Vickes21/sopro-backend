"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateAnnotation = void 0;
const langgraph_1 = require("@langchain/langgraph");
exports.StateAnnotation = langgraph_1.Annotation.Root({
    messages: (0, langgraph_1.Annotation)({
        reducer: langgraph_1.messagesStateReducer,
        default: () => [],
    }),
});
//# sourceMappingURL=state.js.map