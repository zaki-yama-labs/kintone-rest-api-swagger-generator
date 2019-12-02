import { convertRequestToParameters } from "../request-converter";

describe("convertRequestToParameters", () => {
  it("should convert request to parameters", () => {
    const request = {
      properties: { app: { format: "long", type: "string" } },
      required: ["app"],
      type: "object"
    };

    const expected = [
      {
        in: "query",
        name: "app",
        schema: {
          type: "string"
        },
        required: true
      }
    ];

    expect(convertRequestToParameters(request)).toStrictEqual(expected);
  });
});
