import { PartConstant } from "../helpers/constant/parts";

// import Cookies from 'js-cookie';
export const isLogin = () => {
  if (localStorage.getItem("isLogin")) {
    return true;
  } else {
    return false;
  }
};

const computeLevenshteinDistance = (s, t) => {
  const dp = Array.from(Array(s.length + 1), () => Array(t.length + 1));

  for (let i = 0; i <= s.length; dp[i][0] = i++);
  for (let j = 0; j <= t.length; dp[0][j] = j++);

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[s.length][t.length];
};

export const findRelevantPart = (paragraph) => {
  return PartConstant.find((x) =>
    (paragraph || "").toLowerCase().includes((x.partName || "").toLowerCase()),
  );

  // const wordsInParagraph = paragraph.split(/[\s,.;-\\n\\r]/);

  // const allParts = PartConstant;

  // let mostRelevantPart = null;
  // let minDistance = 2;

  // allParts.forEach((part) => {
  //   const partStrings = [part.partNumber, part.partName, part.partDescription];

  //   wordsInParagraph.forEach((word) => {
  //     partStrings.forEach((partString) => {
  //       const distance = computeLevenshteinDistance(word, partString);
  //       if (distance < minDistance) {
  //         console.log(
  //           `New min distance is: ${distance} for part: ${part.partName}`,
  //         );
  //         minDistance = distance;
  //         mostRelevantPart = part;
  //       }
  //     });
  //   });
  // });
  // console.log(mostRelevantPart);

  // return mostRelevantPart;
};
