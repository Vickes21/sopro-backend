import { START, StateGraph, END, MessagesAnnotation } from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";
import { StateAnnotation } from "./state";
import { ChatOpenAI } from "@langchain/openai";
import * as hub from "langchain/hub";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ConfigurableAnnotation } from "./config";
import { SYSTEM_TEMPLATE } from "./templates/system.template";
import { createTask } from "src/modules/ai/agents/sopro/tools/create-task.tool";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TOOLS } from "src/modules/ai/agents/sopro/tools";

/** 
 * Define a node, these do the work of the graph and should have most of the logic.
 * Must return a subset of the properties set in StateAnnotation.
 * @param state The current state of the graph.
 * @param config Extra parameters passed into the state graph.
 * @returns Some subset of parameters of the graph state, used to update the state
 * for the edges and nodes executed next.
 */
const callModel = async (
  state: typeof MessagesAnnotation.State,
  _config: RunnableConfig<typeof ConfigurableAnnotation.State>,
): Promise<typeof MessagesAnnotation.Update> => {

  if (!_config.configurable?.contact) {
    throw new Error("Contact not found");
  }


  /**
   * Do some work... (e.g. call an LLM)
   * For example, with LangChain you could do something like:
   *
   * ```bash
   * $ npm i @langchain/anthropic
   * ```
   *
   * ```ts
   * import { ChatAnthropic } from "@langchain/anthropic";
   * const model = new ChatAnthropic({
   *   model: "claude-3-5-sonnet-20240620",
   *   apiKey: process.env.ANTHROPIC_API_KEY,
   * });
   * const res = await model.invoke(state.messages);
   * ```
   *
   * Or, with an SDK directly:
   *
   * ```bash
   * $ npm i openai
   * ```
   *
   * ```ts
   * import OpenAI from "openai";
   * const openai = new OpenAI({
   *   apiKey: process.env.OPENAI_API_KEY,
   * });
   *
   * const chatCompletion = await openai.chat.completions.create({
   *   messages: [{
   *     role: state.messages[0]._getType(),
   *     content: state.messages[0].content,
   *   }],
   *   model: "gpt-4o-mini",
   * });
   * ```
   */
  const model = new ChatOpenAI({
    model: "gpt-4.1",
    temperature: 0.75,
    topP: 0.9,

  }).bindTools(TOOLS);

  // const prompt = await hub.pull<ChatPromptTemplate>("orientai-parents");

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ['placeholder', '{messages}'],
  ]);

  const chain = prompt.pipe(model)

  const result = await chain.invoke({
    messages: [
      ...state.messages,
      // new HumanMessage({
      //   content: state.input,
      //   name: (_config.configurable.contact.firstName + "_" + _config.configurable.contact.lastName).toLowerCase().replace(" ", "_")
      // }),
    ],
    contact_name: _config.configurable.contact.name,
  });

  return { messages: [result] };
};

/**
 * Routing function: Determines whether to continue research or end the builder.
 * This function decides if the gathered information is satisfactory or if more research is needed.
 *
 * @param state - The current state of the research builder
 * @returns Either "callModel" to continue research or END to finish the builder
 */
export const route = (
  state: typeof MessagesAnnotation.State,
): typeof END | "callModel" | "tools" => {

  const messages = state.messages;
  const lastMessage = messages[messages.length - 1];

  // If the LLM is invoking tools, route there.
  if ((lastMessage as AIMessage)?.tool_calls?.length || 0 > 0) {
    return "tools";
  } else {
    // Otherwise end the graph.
    return END
  }
};

// Finally, create the graph itself.
const builder = new StateGraph(MessagesAnnotation, ConfigurableAnnotation)
  // Add the nodes to do the work.
  // Chaining the nodes together in this way
  // updates the types of the StateGraph instance
  // so you have static type checking when it comes time
  // to add the edges.
  .addNode("callModel", callModel)
  .addNode("tools", new ToolNode(TOOLS))
  // Regular edges mean "always transition to node B after node A is done"
  // The "__start__" and "__end__" nodes are "virtual" nodes that are always present
  // and represent the beginning and end of the builder.
  .addEdge(START, "callModel")
  // Conditional edges optionally route to different nodes (or end)
  .addConditionalEdges("callModel", route)
  // This means that after `tools` is called, `callModel` node is called next.
  .addEdge("tools", "callModel");

export const graph = builder.compile();

graph.name = "Sopro";
