import { dbConnect, dbDisconnect } from "../src/database";
import AppController from "../src/apps/controllers";

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});

describe("App Retreival Tests", () => {
  test("Get all apps", async () => {
    const allApps = await AppController.getApps();
    expect(allApps.length).toBeGreaterThan(0);
    for (let app of allApps) {
      expect(app.name).toBeDefined();
      expect(app.slug).toBeDefined();
    }
  });
});
