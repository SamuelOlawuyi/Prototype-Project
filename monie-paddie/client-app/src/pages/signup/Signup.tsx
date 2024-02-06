import {
  Wrapper,
  SignupSide,
  FounderSide,
  StylishText,
  RegisterBox,
  GoogleSignin,
  GooglesLogo,
  Strikethrough,
  Strike,
  Or,
  InputHead,
  InputField,
  Label,
  SubmitForm,
  ExtLink,
} from "./Signup.style";
import googleLogo from "/google-logo.png";
import { FormEvent } from "react";
// import { InputFieldWeb } from "./InputFieldWeb";

function SignUpPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted");
  }
  return (
    <Wrapper>
      <div className="row">
        <SignupSide className="col col-12 col-lg-5">
          <StylishText>Monie Paddy</StylishText>
          <RegisterBox className="my-4">
            <h2 style={{ fontSize: "32px" }}>Sign Up</h2>
            <p style={{ fontSize: "16px" }}>
              Create an account to enjoy our benefits
            </p>
          </RegisterBox>
          <GoogleSignin href={`http://localhost:5500/auth/google`}>
            <GooglesLogo src={googleLogo} alt="google logo" />
            Sign up with Google
          </GoogleSignin>
          <Strikethrough className="my-4">
            <Strike />
            <Or>Or</Or>
            <Strike />
          </Strikethrough>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="fullname">Full Name</Label>
              </InputHead>
              <InputField
                id="fullname"
                placeholder="John Doe"
                type="text"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="email">Email</Label>
              </InputHead>
              <InputField
                id="email"
                placeholder="name@example.com"
                type="email"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="phoneNumber">Phone Number</Label>
              </InputHead>
              <InputField
                id="phoneNumber"
                placeholder="0812345678"
                type="tel"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="bvn">Bvn</Label>
              </InputHead>
              <InputField
                id="bvn"
                placeholder="22516146577"
                type="number"
                required
              />
            </div>
            <div className="my-3">
              <InputHead>
                <Label htmlFor="password">Password</Label>
              </InputHead>
              <InputField
                id="password"
                placeholder="Password123@"
                type="password"
                required
              />
            </div>
            <div className="mt-5">
              <SubmitForm type="submit">Sign Up</SubmitForm>
            </div>
          </form>
          <div className="d-flex" style={{ gap: "8px" }}>
            <p>Already a member?</p>
            <ExtLink href="/login">Sign In</ExtLink>
          </div>
        </SignupSide>
        <FounderSide className="col col-12 col-lg-7">
          <p>Founder message here</p>
        </FounderSide>
      </div>
    </Wrapper>
  );
}

export default SignUpPage;
