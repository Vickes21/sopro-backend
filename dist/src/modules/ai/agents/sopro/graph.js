"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = exports.route = void 0;
const langgraph_1 = require("@langchain/langgraph");
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const config_1 = require("./config");
const system_template_1 = require("./templates/system.template");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const tools_1 = require("./tools");
const callModel = async (state, _config) => {
    if (!_config.configurable?.contact) {
        throw new Error("Contact not found");
    }
    const model = new openai_1.ChatOpenAI({
        model: "gpt-4.1",
        temperature: 0.75,
        topP: 0.9,
    }).bindTools(tools_1.TOOLS);
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        ["system", system_template_1.SYSTEM_TEMPLATE],
        ['placeholder', '{messages}'],
    ]);
    const chain = prompt.pipe(model);
    const result = await chain.invoke({
        messages: [
            ...state.messages,
        ],
        contact_name: _config.configurable.contact.name,
    });
    return { messages: [result] };
};
const route = (state) => {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.tool_calls?.length || 0 > 0) {
        return "tools";
    }
    else {
        return langgraph_1.END;
    }
};
exports.route = route;
const builder = new langgraph_1.StateGraph(langgraph_1.MessagesAnnotation, config_1.ConfigurableAnnotation)
    .addNode("callModel", callModel)
    .addNode("tools", new prebuilt_1.ToolNode(tools_1.TOOLS))
    .addEdge(langgraph_1.START, "callModel")
    .addConditionalEdges("callModel", exports.route)
    .addEdge("tools", "callModel");
exports.graph = builder.compile();
exports.graph.name = "Sopro";
//# sourceMappingURL=graph.js.map