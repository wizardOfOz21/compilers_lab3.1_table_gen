import { ExternalVertex, InternalVertex } from "../parse";

export const calculate = (vertex: InternalVertex) => {
  switch (vertex.nterm) {
    case "E": {
      const t = calculate(vertex.childs[0] as InternalVertex);
      const e1 = calculate(vertex.childs[1] as InternalVertex);

      return t + e1;
    }
    case "E1": {
      if (vertex.childs.length === 0) {
        return 0;
      }

      const t = calculate(vertex.childs[1] as InternalVertex);
      const e1 = calculate(vertex.childs[2] as InternalVertex);
      return t + e1;
    }
    case "T": {
      const f = calculate(vertex.childs[0] as InternalVertex);
      const t1 = calculate(vertex.childs[1] as InternalVertex);
      return f * t1;
    }
    case "T1": {
      if (vertex.childs.length === 0) {
        return 1;
      }

      const f = calculate(vertex.childs[1] as InternalVertex);
      const t1 = calculate(vertex.childs[2] as InternalVertex);
      return f * t1;
    }
    case "F": {
      if (vertex.childs.length === 1) {
        return (vertex.childs[0] as ExternalVertex).val.attr;
      }

      const e = calculate(vertex.childs[1] as InternalVertex);
      return e;
    }
    default:
      break;
  }
};
