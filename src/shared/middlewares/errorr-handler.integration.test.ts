import { Hono } from "hono";
import { describe, expect, it, vi } from "vitest";

import { BUN_ENV } from "@/env";

import errorHandler from "./error-handler";

describe("onError", () => {
  const mockController = vi.fn().mockImplementation(() => {
    throw new Error("Mock error");
  });
  const app = new Hono();
  app.onError(errorHandler());
  app.use("/", mockController);

  it("should use BUN_ENV from the context if defined", async () => {
    // Made an HTTP request
    const response = await app.request("http://localhost/", undefined, {
      BUN_ENV: BUN_ENV.production,
    });
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json).toEqual({
      message: "Mock error",
      stack: undefined,
    });
  });

  it("should use BUN_ENV from process.env otherwise", async () => {
    process.env.BUN_ENV = BUN_ENV.production;
    const response = await app.request("http://localhost/");
    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json).toEqual({
      message: "Mock error",
    });
  });
});
