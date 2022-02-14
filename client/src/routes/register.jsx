import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const RegisterPage = () => {
  const mutation = useMutation(newUser => {
    return axios.post('http://localhost:1337/api/auth/local/register', newUser)
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  }) 

  const onSubmit = formData => {
    console.log(formData || "no data");
    mutation.mutate(formData);
  }

  return (
    <Container style={{ "paddingLeft":"25rem", "paddingRight":"25rem", "marginTop":"2rem"}}>
      <h3 className="text-center fw-bold">Register</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            {...register("username", {
              required: "The username is required !",
            })}
            className={errors.username ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="exemple@gmail.com"
            {...register("email", {
              required: "The email is required !",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address !",
              },
            })}
            className={errors.email ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "The password is required !",
              minLength: {
                value: 8,
                message: "Your password should contain at least 8 characters !",
              },
            })}
            className={errors.password ? "is-invalid" : ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          <Button variant="primary" className="me-1" type="submit">
            {mutation.isLoading ? "Adding user..." : "Submit"}
          </Button>
          <Button variant="secondary" className="ms-1" onClick={() => reset()}>
            Reset
          </Button>
        </div>

        {mutation.isError ? <Alert variant="danger">Something went wrong : {mutation.error.message}</Alert> : null}

        {mutation.isSuccess ? <Alert variant="success">You have been successfully registered !</Alert> : null}
      </Form>
    </Container>
  );
}

export default RegisterPage;