import { styled } from "styled-components";
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1680px;
`;

export const SignupSide = styled.div`
  background-color: #fff;
  padding: 40px 64px;
  max-height: 100vh;
  overflow-y: scroll;

  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

export const FounderSide = styled.div`
  background-color: #e3f1fe;

  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

export const StylishText = styled.h1`
  font-family: "Holtwood One SC", cursive;
  color: var(--Pri-Color);
  font-size: 32px;
  font-weight: 400;
`;

export const RegisterBox = styled.div`
  width: 316px;
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GoogleSignin = styled.a`
  margin: 20px 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  text-align: center;
  background-color: #fff;
  border: 2px solid #ccc;
  padding: 16px 12px;
  border-radius: 8px;
  text-decoration: none;
`;

export const GooglesLogo = styled.img`
  width: 24px;
  height: 24px;
`;

export const Strikethrough = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
`;

export const Strike = styled.div`
  flex: 1;
  border-top: 1px solid #ccc;
`;

export const Or = styled.span`
  padding: 0 12px;
  font-size: 18px;
`;

export const InputHead = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;

export const Label = styled.label`
  color: #000;
`;

export const InputField = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border: 2px solid var(--Pri-Color);
  }

  @media (min-width: 768px) {
    padding: 16px 12px;
  }
`;

export const SubmitForm = styled.button`
  width: 100%;
  border-radius: 4px;
  background-color: var(--Pri-Color);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 12px;
  border: none;
  cursor: pointer;
  margin: 20px 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const ExtLink = styled.a`
  text-decoration: none;
  color: var(--Pri-Color);
`;
