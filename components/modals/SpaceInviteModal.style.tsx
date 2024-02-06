import { styled } from 'styled-components'

export const Wrapper = styled.div`
  width: 457px;
  position: absolute;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  padding: 10px 0;
`

export const InviteText = styled.div`
  color: var(--grey-400, #98a2b3);
  text-align: left;
  font: var(--button-normal-14, 400 14px/20px 'Inter', sans-serif);
  background-color: #fff;
  padding: 1px 10px;
`

export const Divider = styled.div`
  background: var(--gray-200, #eeeeee);
  width: 100%;
  height: 1px;
  margin: 10px 0;
`

export const Suggest = styled.div`
  color: var(--main-text, #101828);
  text-align: left;
  font: var(--button-normal-14, 400 14px/20px 'Inter', sans-serif);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  margin: 10px 0;
  padding: 1px 10px;
`

export const SpaceText = styled.div`
  color: var(--main-text, #101828);
  text-align: left;
  font: var(--button-semi-bold-14, 600 14px/20px 'Inter', sans-serif);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  margin: 10px 0;
  padding: 1px 10px;
`

export const InputField = styled.input`
  background: var(--white, #ffffff);
  border-style: solid;
  border-color: var(--grey-300, #d0d5dd);
  border-width: 1px;
  padding: 8px 24px 8px 24px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 409px;
  margin: 1px 10px;
`

export const LinkBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 20px;
`
export const LinkIcon = styled.div`
  display: flex;
  gap: 20px;
  color: #101828;
  font: var(--button-semi-bold-14, 600 14px/20px 'Inter', sans-serif);
`

export const CopyButton = styled.button`
color: var(--main-primarycolor, #34a853);
text-align: left;
font: var(--button-normal-14, 400 14px/20px 'Inter', sans-serif);
border-radius: 20%;
border: none;
outline: none;
padding: 5px 10px;
cursor: pointer;
`