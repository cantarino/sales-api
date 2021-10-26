import { addHours, isAfter } from "date-fns";

export class DateUtils {
  static addHours(date: Date, amount: number): Date {
    return addHours(date, amount);
  }
  static isAfter(date: Date | number, dateToCompare: Date): boolean {
    return isAfter(date, dateToCompare);
  }
}
