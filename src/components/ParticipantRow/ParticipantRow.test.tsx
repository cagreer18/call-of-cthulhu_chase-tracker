import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ParticipantRow from ".";

describe("Collapse/Expand detailed data", () => {
  test("should render participant information properly when collapsed", () => {
    const name = "Test Participant";

    render(<ParticipantRow defaultParticipantName={name} />);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();

    expect(
      screen.queryByText(ParticipantRow.WARNING_MESSAGE)
    ).not.toBeVisible();

    expect(screen.getByLabelText(ParticipantRow.DEX_TITLE)).toBeInTheDocument();
    expect(screen.getByLabelText(ParticipantRow.MOV_TITLE)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /expand/i })).toBeInTheDocument();

    expect(
      screen.getByRole("spinbutton", { name: /speed/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /speed stats/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.CON_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.DRIVE_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.RIDE_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.AIR_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.SEA_TITLE)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /add speed stat/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /hazard stats/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText(ParticipantRow.STR_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.CLIMB_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.SWIM_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.DODGE_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.BRAWL_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.HANDGUN_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(ParticipantRow.RIFLE_TITLE)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /add hazard stat/i })
    ).not.toBeInTheDocument();
  });

  test("should render participant information properly when expanded", () => {
    const name = "Test Participant";

    render(<ParticipantRow defaultParticipantName={name} />);

    const buttonEl = screen.getByRole("button", { name: /expand/i });
    userEvent.click(buttonEl);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();

    expect(
      screen.queryByText(ParticipantRow.WARNING_MESSAGE)
    ).not.toBeVisible();

    expect(screen.getByLabelText(ParticipantRow.DEX_TITLE)).toBeInTheDocument();
    expect(screen.getByLabelText(ParticipantRow.MOV_TITLE)).toBeInTheDocument();

    expect(
      screen.getByRole("spinbutton", { name: /speed/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /speed stats/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(ParticipantRow.CON_TITLE)).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.DRIVE_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.RIDE_TITLE)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(ParticipantRow.AIR_TITLE)).toBeInTheDocument();
    expect(screen.getByLabelText(ParticipantRow.SEA_TITLE)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add speed stat/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /hazard stats/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(ParticipantRow.STR_TITLE)).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.CLIMB_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.SWIM_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.DODGE_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.BRAWL_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.HANDGUN_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(ParticipantRow.RIFLE_TITLE)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add hazard stat/i })
    ).toBeInTheDocument();
  });
});

describe("Participant name rendering", () => {
  test("should render given name when changed from default name", () => {
    const defaultName = "Default Name";
    const newName = "Test Name";

    render(<ParticipantRow defaultParticipantName={defaultName} />);

    const inputEl = screen.getByRole("textbox", { name: /name/i });
    userEvent.clear(inputEl);
    userEvent.type(inputEl, newName);

    expect(inputEl).toHaveValue(newName);
  });

  test("should render the last valid name when name changed to empty string", () => {
    const defaultName = "Default Name";
    const validName = "Valid";
    const invalidName = "";

    render(<ParticipantRow defaultParticipantName={defaultName} />);

    const inputEl = screen.getByRole("textbox", { name: /name/i });

    userEvent.clear(inputEl);
    userEvent.type(inputEl, validName);

    userEvent.clear(inputEl);
    userEvent.type(inputEl, invalidName);

    inputEl.blur();

    expect(inputEl).toHaveDisplayValue(validName);
  });

  test("should render the last valid name when name changed to invalid value with trailing and/or leading spaces", () => {
    const defaultName = "Default Name";
    const validName = "Valid";
    const invalidName = "    ";

    render(<ParticipantRow defaultParticipantName={defaultName} />);

    const inputEl = screen.getByRole("textbox", { name: /name/i });

    userEvent.clear(inputEl);
    userEvent.type(inputEl, validName);
    userEvent.clear(inputEl);

    expect(
      screen.getByText(ParticipantRow.WARNING_MESSAGE)
    ).toBeInTheDocument();

    userEvent.type(inputEl, invalidName);
    inputEl.blur();

    expect(
      screen.queryByText(ParticipantRow.WARNING_MESSAGE)
    ).not.toBeVisible();

    expect(inputEl).toHaveDisplayValue(validName);
  });

  test("should render with a warning message when an invalid name is displayed and hide the message upon receiving a valid character", () => {
    const defaultName = "Default Name";
    const validName = "valid";

    render(<ParticipantRow defaultParticipantName={defaultName} />);

    const inputEl = screen.getByRole("textbox", { name: /name/i });
    userEvent.clear(inputEl);

    expect(
      screen.getByText(ParticipantRow.WARNING_MESSAGE)
    ).toBeInTheDocument();

    expect(inputEl).toHaveDisplayValue("");

    userEvent.type(inputEl, validName);

    expect(
      screen.queryByText(ParticipantRow.WARNING_MESSAGE)
    ).not.toBeVisible();

    expect(inputEl).toHaveDisplayValue(validName);
  });
});

describe("Stat manipulation", () => {
  test("should add speed stat when 'add speed stat' clicked", () => {
    const name = "TEST";
    render(<ParticipantRow defaultParticipantName={name} />);

    userEvent.click(screen.getByRole("button", { name: /expand/i }));

    expect(screen.queryByLabelText(/new stat #6/i)).not.toBeInTheDocument();

    const addButtonEl = screen.getByRole("button", { name: /add speed stat/i });
    userEvent.click(addButtonEl);

    expect(screen.getByLabelText(/new stat #6/i)).toBeInTheDocument();
  });

  test("should add hazard stat when 'add hazard stat' clicked", () => {
    const name = "TEST";
    render(<ParticipantRow defaultParticipantName={name} />);

    userEvent.click(screen.getByRole("button", { name: /expand/i }));

    expect(screen.queryByLabelText(/new stat #8/i)).not.toBeInTheDocument();

    const addButtonEl = screen.getByRole("button", {
      name: /add hazard stat/i,
    });
    userEvent.click(addButtonEl);

    expect(screen.getByLabelText(/new stat #8/i)).toBeInTheDocument();
  });
});
