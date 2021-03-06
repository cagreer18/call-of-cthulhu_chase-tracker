import React from "react";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import StatisticTable from ".";

const DEFAULT_PROPS = {
  title: "TEST_TITLE",
  data: [
    { title: "title1", currentValue: "1", validValue: 1, key: 1 },
    { title: "title2", currentValue: "2", validValue: 2, key: 2 },
  ],
};

test("should render properly", () => {
  const [first, second] = DEFAULT_PROPS.data;
  render(
    <StatisticTable title={DEFAULT_PROPS.title} data={DEFAULT_PROPS.data} />
  );

  expect(
    screen.getByRole("heading", { name: DEFAULT_PROPS.title })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /create statistic/i })
  ).toBeInTheDocument();

  expect(screen.getByLabelText(first.title)).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: new RegExp(`delete: ${first.title}`),
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: new RegExp(`rename: ${first.title}`),
    })
  ).toBeInTheDocument();

  expect(screen.getByLabelText(second.title)).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: new RegExp(`delete: ${second.title}`),
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: new RegExp(`rename: ${second.title}`),
    })
  ).toBeInTheDocument();
});

test("should use provided callback", () => {
  const [first] = DEFAULT_PROPS.data;
  const handleCreateClick = jest.fn();
  const handleDeleteClick = jest.fn();
  const handleRenameClick = jest.fn();
  render(
    <StatisticTable
      title={DEFAULT_PROPS.title}
      data={DEFAULT_PROPS.data}
      onCreateClick={handleCreateClick}
      onDeleteClick={handleDeleteClick}
      onRenameStatistic={handleRenameClick}
    />
  );

  userEvent.click(screen.getByRole("button", { name: /create statistic/i }));

  expect(handleCreateClick).toBeCalledTimes(1);

  userEvent.click(
    screen.getByRole("button", { name: new RegExp(`delete: ${first.title}`) })
  );

  expect(handleDeleteClick).toBeCalledTimes(1);

  userEvent.click(
    screen.getByRole("button", { name: new RegExp(`rename: ${first.title}`) })
  );
  userEvent.click(screen.getByRole("button", { name: /^rename$/i }));

  expect(handleRenameClick).toBeCalledTimes(1);
});

test("should properly display modal", () => {
  const [first] = DEFAULT_PROPS.data;
  render(
    <StatisticTable title={DEFAULT_PROPS.title} data={DEFAULT_PROPS.data} />
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  userEvent.click(
    screen.getByRole("button", { name: new RegExp(`rename: ${first.title}`) })
  );

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("should close modal when cancel button is pressed", () => {
  const [first] = DEFAULT_PROPS.data;
  render(
    <StatisticTable title={DEFAULT_PROPS.title} data={DEFAULT_PROPS.data} />
  );

  userEvent.click(
    screen.getByRole("button", { name: new RegExp(`rename: ${first.title}`) })
  );
  userEvent.click(screen.getByRole("button", { name: /cancel/i }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("should close modal when accept button is pressed", () => {
  const [first] = DEFAULT_PROPS.data;
  render(
    <StatisticTable title={DEFAULT_PROPS.title} data={DEFAULT_PROPS.data} />
  );

  userEvent.click(
    screen.getByRole("button", { name: new RegExp(`rename: ${first.title}`) })
  );
  userEvent.click(screen.getByRole("button", { name: /^rename$/i }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
