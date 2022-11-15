import React, { Fragment,useState,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { UserContext } from "../App";
import { useHistory, Redirect } from "react-router-dom";
import "../App.css";

function Login(props) {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  

  // if (state != null) {
  //   history.push("/");
  // }
  

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const LoginUser = {     
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(LoginUser);
      const res = await axios.post("/users/login", body, config);
      localStorage.setItem("jwt", res.data.token);
      dispatch({ type: "USER", payload: res.data.token });
      history.push("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };


  return  (
    <Fragment>
      <Container>
        <Row>
          <Col className="col-margin" md={{ span: 4, offset: 4 }}>
            <Card body>
              <Card.Title className="text-center text-info">
                <h3>Login</h3>
              </Card.Title>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="font-weight-bold">
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="font-weight-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>
                <center>
                  <Button variant="primary" type="submit" className="btn-block">
                    Login
                  </Button>
                </center>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Login;
