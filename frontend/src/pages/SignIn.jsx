import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
// import { tokenAtom } from "../store/atoms"
// import { useSetRecoilState } from "recoil"
import axios from "axios"

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const setTokenAtom = useSetRecoilState(tokenAtom);
  const navigate = useNavigate();

  return <div>
    <div>
      <div>
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="d892@gmail.com" label={"Email"} onChange={(e) => {
            setUsername(e.target.value);
        }}/>
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
        <div>
          <Button label={"Sign in"} onClick={async () => {
            if(!username || !password) return;
            await axios.post("http://localhost:3000/api/v1/user/signin", {
            username,
            password
            },
            {
              withCredentials: true,
              // credentials: 'include',
              // headers: {
              //   "Access-Control-Allow-Origin": "*"
              // }
            })
            // localStorage.setItem("token", response.data.token)
            // .then(res => setTokenAtom(res.data.token))
            .then(() => navigate("/"))
            .catch(err => console.log(err));
          }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}