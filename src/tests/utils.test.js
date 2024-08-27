import { act, render, waitFor } from "@testing-library/react";
import { sortBy, debounce, useDebouncedState } from "../utils";

describe("sortBy", () => {
  it("should pass empty array", () => {
    const a = [];
    a.sort((x, y) => sortBy(x, y, "xField"));
    expect(a).toEqual([]);
  });

  it("should pass array with objects", () => {
    const a = [
      { year: 1997, branch: "nissan", model: "toyota", drive: "manual" }, // 1997
      { year: 2019, branch: "tesla", model: "x", drive: "automatic" }, // 2019
      { year: 2010, branch: "ford", model: "ranger", drive: "manual" }, // 2010
      { year: 1995, branch: "honda", model: "civic", drive: "manual" }, // 1995
      { year: 2015, branch: "mazda", model: "6", drive: "automatic" }, // 2015
    ];

    a.sort((x, y) => sortBy(x, y, "branch"));
    expect(a[0].branch).toEqual("ford");
    expect(a[4].branch).toEqual("tesla");

    a.sort((x, y) => sortBy(x, y, "model"));
    expect(a[0].model).toEqual("6");
    expect(a[4].model).toEqual("x");

    a.sort((x, y) => sortBy(x, y, "year"));
    expect(a[0].year).toEqual(1995); // null goes first
    expect(a[4].year).toEqual(2019);

    a.sort((x, y) => sortBy(x, y, "drive", "model"));
    expect(a[0].model).toEqual("6");
    expect(a[4].model).toEqual("toyota");
  });
});

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it("should respect the delay", () => {
    const func = jest.fn();
    const debounceHandler = debounce(func, 500);

    debounceHandler();
    expect(func).not.toBeCalled();
    expect(func).toHaveBeenCalledTimes(0);
    expect(func).toBeCalledTimes(0);

    jest.advanceTimersByTime(500); // Move on the timer
    // jest.runAllTimers(); // Fast-forward time

    expect(func).toBeCalled();
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toBeCalledTimes(1);
  });
});

describe("useDebouncedState", () => {
  beforeEach(() => jest.useFakeTimers("modern"));
  afterEach(() => jest.useRealTimers());
  it("should work propertly", async () => {
    const func = jest.fn();
    let clickCount = 0;
    function TestComponent() {
      const [foo, setFoo] = useDebouncedState("bar", 500);
      func();
      return (
        <div
          data-testid="elem"
          onClick={() => {
            ++clickCount;
            setFoo("click " + clickCount);
          }}
        >
          {foo}
        </div>
      );
    }
    const { getByTestId } = render(<TestComponent />);
    const elem = getByTestId("elem");

    expect(func).toBeCalledTimes(1);
    expect(elem.textContent).toEqual("bar");

    jest.advanceTimersByTime(200);
    elem.click();
    expect(func).toBeCalledTimes(1);
    expect(elem.textContent).toEqual("bar");

    jest.advanceTimersByTime(299);
    expect(func).toBeCalledTimes(1);
    expect(elem.textContent).toEqual("bar");

    act(() => jest.advanceTimersByTime(1));

    await waitFor(() => {
      expect(func).toBeCalledTimes(2);
      expect(elem.textContent).toEqual("click 1");
    });

    elem.click();
    await waitFor(() => {
      expect(func).toBeCalledTimes(2);
      expect(elem.textContent).toEqual("click 1");
    });
    act(() => jest.advanceTimersByTime(500));
    await waitFor(() => {
      expect(func).toBeCalledTimes(3);
      expect(elem.textContent).toEqual("click 2");
    });
  });
});
