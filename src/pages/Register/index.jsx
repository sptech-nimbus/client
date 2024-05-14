import TeamRegister from "./TeamRegister";
import UserRegister from "./UserRegister";

export default function Register({ team = false }) {
    return team ? <TeamRegister /> : <UserRegister />
}