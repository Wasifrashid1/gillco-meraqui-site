import { describe, expect, it } from "vitest";
import { leadInputSchema } from "./routers";

describe("leadInputSchema", () => {
  it("accepts a valid popup lead", () => {
    expect(leadInputSchema.parse({ name: "Aman Gill", phone: "+91 97797 99705", configuration: "4 BHK", budget: "₹3 Cr" })).toMatchObject({ configuration: "4 BHK", budget: "₹3 Cr" });
  });

  it("rejects a lead without a valid phone number", () => {
    expect(() => leadInputSchema.parse({ name: "Aman Gill", phone: "invalid", configuration: "3 BHK", budget: "₹1 Cr" })).toThrow();
  });
});
