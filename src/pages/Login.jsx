import Form from "../components/Form";
import MainNavigation from "../components/MainNavigation";

function Login() {
  return (
    <div>
      <MainNavigation />
      <Form route="/api/token/" method="login" />
    </div>
  );
}

export default Login;
