import { rest } from "msw";

export const handlers = [
  rest.post("https://api.productboard.com/notes", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          id: "123",
        },
      })
    );
  }),
];
