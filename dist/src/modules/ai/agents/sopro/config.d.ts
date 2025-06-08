export interface IContact {
    id: number;
    name: string;
}
export declare const ConfigurableAnnotation: import("@langchain/langgraph").AnnotationRoot<{
    contact: import("@langchain/langgraph").BinaryOperatorAggregate<IContact, IContact>;
}>;
