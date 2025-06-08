import { BaseMessage, BaseMessageLike } from "@langchain/core/messages";
export declare const StateAnnotation: import("@langchain/langgraph").AnnotationRoot<{
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<BaseMessage[], BaseMessageLike[]>;
}>;
