import React, { Component } from "react";
import { Form, Button, Alert, Container, Row, Col, Card } from "react-bootstrap";

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      course: "",
      email: "",
      certId: "",
      errorMessage: "",
    };
  }

  canBeSubmitted() {
    const { fname, lname, course, email, certId } = this.state;
    return (
      fname.length > 0 &&
      lname.length > 0 &&
      course.length > 0 &&
      email.length > 0 &&
      certId.length > 0
    );
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addcertificate = async (event) => {
    event.preventDefault();
    try {
      await this.props.addcertificate(this.state);
      this.setState({ errorMessage: "" });
    } catch (error) {
      console.error("Error submitting certificate:", error);
      this.setState({ errorMessage: "There was an error submitting the certificate." });
    }
  };

  render() {
    const { errorMessage } = this.state;
    const isEnabled = this.canBeSubmitted();

    return (
      <div className="container-fluid" style={{ minHeight: "100vh", background: "#f3f4f6" }}>
        {/* Blockchain Info Section */}
        <Container fluid className="py-5 text-center bg-primary text-white">
          <h1 className="mb-4" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
            Blockchain Certificate Management
          </h1>
          <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "18px" }}>
            Blockchain technology ensures secure, immutable, and decentralized storage of certificates. It
            guarantees authenticity and tamper-proofing, fostering trust and transparency.
          </p>
        </Container>

        {/* Characteristics Section */}
        <Container className="py-5">
          <h2 className="text-center mb-4" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
            Characteristics of Blockchain Technology
          </h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Decentralized</Card.Title>
                  <Card.Text>
                    Blockchain operates on a decentralized network, eliminating the need for a central authority.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Immutable</Card.Title>
                  <Card.Text>
                    Data stored on the blockchain cannot be altered or deleted, ensuring permanence and reliability.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Transparent</Card.Title>
                  <Card.Text>
                    Transactions are visible to all participants, promoting transparency and accountability.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Secure</Card.Title>
                  <Card.Text>
                    Advanced cryptographic techniques ensure the security of transactions and data.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Efficient</Card.Title>
                  <Card.Text>
                    Automates processes and reduces the need for intermediaries, saving time and cost.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">Trustworthy</Card.Title>
                  <Card.Text>
                    Provides a trustworthy framework for transactions between parties without prior relationships.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
<div >
        
        <Container className="py-5 bg-light">
          <div  style={{background: "rgb(125, 205, 150)"}}>
          <h2 className="text-center mb-4" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>
            Enter the Certificate Details
          </h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={this.addcertificate} className="w-75 mx-auto" style={{width:"-1000px"}}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="fname"
                value={this.state.fname}
                onChange={this.handleChange}
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="lname"
                value={this.state.lname}
                onChange={this.handleChange}
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email@email.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="course"
                value={this.state.course}
                onChange={this.handleChange}
                placeholder="Course name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="certId"
                value={this.state.certId}
                onChange={this.handleChange}
                placeholder="Certificate ID (e.g., roll number)"
              />
            </Form.Group>
            <Button  style={{width:"10px"}}
              disabled={!isEnabled}
              className="w-100 mt-3"
              variant="primary"
              type="submit"
            >
              Add Certificate
            </Button>
          </Form>
          </div>
        </Container>
        </div>

        {/* Footer Section */}
        <footer className="bg-dark text-white py-3 text-center">
          <p className="mb-0">&copy; 2024 Blockchain Certificate Management. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default Forms;