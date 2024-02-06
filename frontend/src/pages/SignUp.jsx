import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { tokenAtom } from "../store/atoms"
import { useSetRecoilState } from "recoil"

export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setTokenAtom = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();

    return <div>
        <div>
            <div>
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <InputBox onChange={e => {
                setFirstName(e.target.value);
                }} placeholder="John" label={"First Name"} />
                <InputBox onChange={(e) => {
                setLastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={e => {
                setUsername(e.target.value);
                }} placeholder="d892@gmail.com" label={"Email"} />
                <InputBox onChange={(e) => {
                setPassword(e.target.value)
                }} placeholder="Password" label={"Password"} />
                <div className="pt-4">
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                    });
                    // localStorage.setItem("token", response.data.token)
                    setTokenAtom(response.data.token);
                    navigate("/")
                }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}