import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div>
    <div>
      <div>
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e) => {
            setUsername(e.target.value);
        }}/>
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
        <div>
          <Button label={"Sign in"} onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            username,
            password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/")}}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}