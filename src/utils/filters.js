import { convertToNumber } from "./general.js";
import _ from "lodash";

const wordsCount = (title) => title.split(" ").length;

export const partitionByFiveWords = (arr) =>
  _.partition(arr, (item) => wordsCount(item.title) > 5);

export const filterByCommentsDesc = (arr) =>
  _.orderBy(arr.map(convertToNumber), ["comments"], ["desc"]);

export const filterByPointsAsc = (arr) =>
  _.orderBy(arr.map(convertToNumber), ["points"], ["asc"]);
