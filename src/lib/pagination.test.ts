import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodeCursor, encodeCursor, parseLimit } from "./pagination.js";

describe("pagination", () => {
  it("clamps limit", () => {
    assert.equal(parseLimit(0), 1);
    assert.equal(parseLimit(500), 100);
    assert.equal(parseLimit(undefined), 20);
  });

  it("roundtrips cursor", () => {
    const encoded = encodeCursor(40);
    assert.equal(decodeCursor(encoded), 40);
    assert.equal(decodeCursor(undefined), 0);
  });
});
