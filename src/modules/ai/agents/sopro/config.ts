import { Annotation } from "@langchain/langgraph";

export interface IContact {
  id: number;
  name: string;
}

const contact = {
  id: 1,
  name: "Rodrigo Souza",
}


export const ConfigurableAnnotation = Annotation.Root({
  contact: Annotation<IContact>({
    default: () => contact,
    reducer: (x, y) => y ?? x,
  }),
})
