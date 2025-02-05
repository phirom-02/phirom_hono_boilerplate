import { Hono } from "hono";
import { describe, expect, it } from "vitest";

import { HttpStatusPhrases, HttpStatusCodes } from "../constants";
import notFoundHandler from "./not-found-handler";

describe("notFoundHandler", () => {
  it("should return 404 with the correct message", async () => {
    const reqPath = "/non-existent-path";
    const app = new Hono();
    app.notFound(notFoundHandler());

    const response = await app.request("/non-existent-path");
    expect(response.status).toBe(HttpStatusCodes.NOT_FOUND);

    const json = await response.json();
    expect(json).toEqual({
      message: `${HttpStatusPhrases.NOT_FOUND} - ${reqPath}`,
    });
  });
});
