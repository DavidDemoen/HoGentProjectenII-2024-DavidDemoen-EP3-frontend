import { LoginForm } from "./LoginForm";

export function LoginBox() {
  return (
    <>
      <div className="login-box">
        <div className="login-header">
          <p>Login</p>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
