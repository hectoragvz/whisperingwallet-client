import Form from "../components/Form";
import MainNavigation from "../components/MainNavigation";

function Register() {
  return (
    <div>
      <MainNavigation />
      <Form route="/api/user/register/" method="register" />
    </div>
  );
}

export default Register;
