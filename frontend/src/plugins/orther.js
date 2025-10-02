import flatpickr from "flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/plugins/monthSelect/style.css";

flatpickr("#monthPicker", {
  plugins: [new monthSelectPlugin({ shorthand: true, dateFormat: "m/Y" })],
});