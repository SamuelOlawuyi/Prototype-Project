
export function trimContent(content: string, n:number) {
  const words = content.split(" ");
  if (words.length < n) return content;
  const trimmed = words.slice(0, n).join(" ") + " ...";
  return trimmed;
}

export function getDate(date: Date | string | undefined) {
  if (!date) return "";
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function readingSpeed(text: string | undefined) {
  if (!text) return 0;
  const words = text.split(" ");
  const wordsCount = words.length;
  const time = wordsCount / 200;
  return Math.ceil(time);
}

export async function getUserId(){
  return localStorage.getItem("userId");
}