import React, { Fragment,  useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { UserContext } from "../App";
import { useHistory, Redirect } from "react-router-dom";
import "../App.css";

function Tpost() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(typeof(state))
    //var topic = e.target.topic.value
    // console.log(e.target.lectures);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": state,
        },
      };
      let formData = new FormData(e.target);
      const res = await axios.post("/tpost", formData, config);
      console.log("this is message ",res.data);
      history.push("/");
    } catch (err) {
      console.log("Some Error occured")
      // console.error(err.response.data);
    }
  };

  return  (
    <Fragment>
      <Container>
        <Row>
          <Col className="col-margin" md={{ span: 4, offset: 4 }}>
            <Card body>
              <Card.Title className="text-center text-info">
                <h3>New Course</h3>
              </Card.Title>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId="formBasicTopic">
                  <Form.Label className="font-weight-bold">
                    Topic Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="topic"
                    placeholder="Enter Topic Name"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.File
                    id="lecturesFiles"
                    name="lectures"
                    className="font-weight-bold"
                    label="Upload Lectures"
                    accept="video/mp4"
                    multiple
                  />
                </Form.Group>
                <Form.Group>
                  <Form.File
                    id="NotesFile"
                    name="notes"
                    className="font-weight-bold"
                    accept="application/pdf"
                    label="Upload Notes"
                    multiple
                  />
                </Form.Group>

                <center>
                  <Button variant="primary" type="submit" className="btn-block">
                    Submit
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

export default Tpost;
