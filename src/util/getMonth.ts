import moment from "moment";

export const getMonth = (date: Date) => {
  return moment(date).format("MMMM");
};
