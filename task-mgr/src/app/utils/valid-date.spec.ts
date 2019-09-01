import { validDateCheck } from "./valid-date";

describe("ValidDate", () => {
  it("should detect non-date characters", () => {
    expect(validDateCheck()).toBe({ validDate: false });
  });
});
