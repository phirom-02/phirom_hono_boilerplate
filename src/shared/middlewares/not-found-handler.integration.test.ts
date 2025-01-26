import { Hono } from "hono";
import { describe, expect, it } from "vitest";

import HttpStatusCode from "../enums/http-status-codes";
import HttpStatusPhrase from "../enums/http-status-phrase";
import notFoundHandler from "./not-found-handler";

describe("notFoundHandler", () => {
  it("should return 404 with the correct message", async () => {
    const reqPath = "/non-existent-path";
    const app = new Hono();
    app.notFound(notFoundHandler());

    const response = await app.request("/non-existent-path");
    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);

    const json = await response.json();
    expect(json).toEqual({
      message: `${HttpStatusPhrase.NOT_FOUND} - ${reqPath}`,
    });
  });
});
