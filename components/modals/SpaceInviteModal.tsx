import {
  Wrapper,
  InviteText,
  Divider,
  Suggest,
  SpaceText,
  InputField,
  LinkBar,
  LinkIcon,
  CopyButton,
} from './InviteDecadev.style'


const InviteDecadev = () => {
  return (
    <>
      <Wrapper>
        <InviteText>INVITE PEOPLE</InviteText>
        <Divider />
        <SpaceText>Invite people to Ezekiel Okafor’s Space</SpaceText>
        <InputField type="text"></InputField>
        <Suggest>dorothystanton@decagonhq</Suggest>
        <Suggest>dorothystanton@decagonhq</Suggest>
        <Suggest>dorothystanton@decagonhq</Suggest>
        <Suggest>howarddixon@decagonhq</Suggest>
        <Suggest>howarddixon@decagonhq</Suggest>
        <Suggest>howarddixon@decagonhq</Suggest>
        <Divider />
        <LinkBar>
          <LinkIcon>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4998 17.5L2.49984 2.5M5.83317 5.83333C4.72206 5.83333 1.6665 6.66667 1.6665 10C1.6665 13.3333 4.58317 14.1667 5.83317 14.1667C6.90553 14.1667 10.4311 14.4733 11.4115 11.6667M10.8332 6.18937C12.1219 5.74179 13.5498 5.8432 14.1665 5.8432C15.4165 5.8432 18.3332 6.67653 18.3332 10.0099C18.3332 11.217 17.9324 12.0963 17.3685 12.7268"
                stroke="#101828"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Get invite link</p>
          </LinkIcon>
          <CopyButton onClick={(e) => e.preventDefault()}>Copy</CopyButton>
        </LinkBar>
      </Wrapper>
    </>
  )
}

export default InviteDecadev