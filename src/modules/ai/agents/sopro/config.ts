import { Annotation } from "@langchain/langgraph";

export interface IContact {
  id: number;
  name: string;
  phone: string;
}

const contact = {
  id: 1,
  name: "Rodrigo Souza",
  phone: "5511999999999"
}


export const ConfigurableAnnotation = Annotation.Root({
  contact: Annotation<IContact>({
    default: () => contact,
    reducer: (x, y) => y ?? x,
  }),
})
