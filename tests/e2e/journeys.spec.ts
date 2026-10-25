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
  await expect(
    page.getByRole("heading", { name: "Problem statement" }),
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

test("public pages have no account or management controls", async ({
  page,
}) => {
  for (const route of [
    "home",
    "learn",
    "tasks",
    "projects",
    "project/build-scratch",
    "explore",
    "cp",
    "resources",
    "task/first-contribution",
  ]) {
    await page.goto("/#/" + route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(
      page.getByRole("button", {
        name: /sign in|sign up|approve|assign|submit for review|create task/i,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Maintainer Workspace" }),
    ).toHaveCount(0);
  }
  await page.goto("/");
  await page.screenshot({
    path: `test-results/home-${test.info().project.name}.png`,
    fullPage: true,
  });
});

test("all learning tracks, blueprints, labs and resources are open", async ({
  page,
}) => {
  await page.goto("/#/learn");
  for (const name of [
    "Developer Foundations",
    "Software Development",
    "Competitive Programming",
    "Engineering Experiments",
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await page.goto("/#/explore");
  await expect(
    page.getByRole("heading", { name: "Advanced Engineering Labs." }),
  ).toBeVisible();
  await page.goto("/#/project/build-scratch");
  await expect(
    page.getByRole("heading", { name: "Architecture & folder structure" }),
  ).toBeVisible();
  await page.goto("/#/resources");
  await expect(
    page.getByRole("heading", { name: "Resources for every path." }),
  ).toBeVisible();
  await page.getByLabel("Search resources").fill("no such resource");
  await expect(page.getByRole("status")).toContainText("No matching resources");
  await page.goto("/#/maintainer");
  await expect(
    page.getByRole("heading", { name: "Resources for every path." }),
  ).toBeVisible();
});
