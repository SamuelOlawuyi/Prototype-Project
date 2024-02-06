import { FC } from "react";

type InputFieldWebProps = {
  text: string;
  text1: string;
  // divClassName: string;
};

export const InputFieldWeb: FC<InputFieldWebProps> = ({
  text,
  text1,
  // divClassName,
}) => {
  return (
    <div>
      <label>{text}</label>
      <input type="text" placeholder={text1} />
    </div>
  );
};

export default InputFieldWeb;
