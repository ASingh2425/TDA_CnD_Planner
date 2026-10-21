import { test, expect } from "@playwright/test";
test("four entry points lead to actionable destinations", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Your next step starts here." }),
  ).toBeVisible();
  for (const [label, heading] of [
    ["I’m new to development.", "Learn with a purpose."],
    ["I know the basics.", "Find your next task."],
    ["I want to compete.", "Your problem-solving space."],
    ["I’m ready to contribute.", "Find your next task."],
  ]) {
    await page.goto("/");
    await page.getByRole("link").filter({ hasText: label }).click();
    await expect(
      page.getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
});
test("tasks filter, show empty states and expose deliverables", async ({
  page,
}) => {
  await page.goto("/#/tasks");
  await page.getByLabel("Search tasks").fill("no such task");
  await expect(page.getByText("No matching tasks yet.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Search tasks").fill("first pull");
  await page
    .getByRole("link")
    .filter({ hasText: "Make your first pull request" })
    .click();
  await expect(
    page.getByRole("heading", { name: "What you’ll deliver" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What success looks like" }),
  ).toBeVisible();
});
test("visualizer handles steps reset and input errors", async ({ page }) => {
  await page.goto("/#/cp");
  await page.getByRole("button", { name: "Step forward" }).click();
  await expect(page.getByText("Step 2 /")).toBeVisible();
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page
    .getByLabel("Algorithm", { exact: true })
    .selectOption("Binary Search");
  await page.getByLabel("Values (up to").fill("1, 3, 5");
  await page.getByLabel("Target", { exact: true }).fill("4");
  for (let i = 0; i < 4; i++) {
    const b = page.getByRole("button", { name: "Step forward" });
    if (await b.isEnabled()) await b.click();
  }
  await expect(
    page.getByText("4 is not present.", { exact: false }),
  ).toBeVisible();
  await page.getByLabel("Values (up to").fill("bad");
  await expect(page.getByRole("alert")).toContainText("Enter 1–20");
});
test("no page overflow; maintainer actions are unavailable publicly", async ({
  page,
}) => {
  for (const route of [
    "home",
    "learn",
    "tasks",
    "projects",
    "cp",
    "maintainer",
  ]) {
    await page.goto("/#/" + route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await expect(page.getByText("Authorized access required")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Create task", exact: true }),
  ).toHaveCount(0);
  await page.goto("/");
  await page.screenshot({
    path: `test-results/home-${test.info().project.name}.png`,
    fullPage: true,
  });
});
test("account dialog supports keyboard exit", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Member sign in" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
