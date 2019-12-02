type Request = {
  properties: {
    [fieldCode: string]: {
      type: string;
      format?: string;
    };
  };
  required: string[];
  type: string;
};

type Parameters = Array<{
  in: "query";
  name: string;
  schema: {
    type: string;
  };
  required?: boolean;
}>;

/**
 * Convert kintone API Schema's `request` to OpenAPI's `parameters`
 */
export function convertRequestToParameters(request: Request): Parameters {
  const parameters: Parameters = [];
  Object.keys(request.properties).forEach(fieldCode => {
    const required = request.required.includes(fieldCode);
    parameters.push({
      in: "query",
      name: fieldCode,
      schema: {
        type: request.properties[fieldCode].type
      },
      required
    });
  });
  return parameters;
}
