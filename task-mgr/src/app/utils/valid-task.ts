import { AbstractControl } from "@angular/forms";

export function validTask({ value: formObj }: AbstractControl) {
  if (!formObj.isParentTask) {
    const { priority, parentTask, startDate, endDate } = formObj;
    if (priority >= 0 && parentTask && startDate && endDate) {
      return null;
    } else {
      return { validTask: false };
    }
  }
}
