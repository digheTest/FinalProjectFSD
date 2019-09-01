import { AbstractControl } from "@angular/forms";

export function validDateCheck({ value }: AbstractControl) {
  if (value && isNaN(+value)) {
    const parts = value.split("/");
    const [year, month, date] = parts;
    if (parts.length === 3) {
      const isValid = !isNaN(+new Date(year, parseInt(month) + 1, date));
      if (isValid) {
        return null;
      } else {
        return { validDate: false };
      }
    } else {
      return { validDate: false };
    }
  }
}

export function validDateRange({ value: formObj }: AbstractControl) {
  if (formObj.setDate) {
    const { startDate, endDate } = formObj;
    const isValid = +endDate - +startDate >= 0;
    if (isValid) {
      return null;
    } else {
      return { validRange: false };
    }
  }
}

export function validDateRangeUnconditional({
  value: formObj
}: AbstractControl) {
  const { startDate, endDate } = formObj;
  const isValid = +endDate - +startDate >= 0;
  if (isValid) {
    return null;
  } else {
    return { validRange: false };
  }
}
