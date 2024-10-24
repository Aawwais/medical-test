import Header from "components/Headers/Header";
import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  FormGroup,
} from "reactstrap";

const NewPatient = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h5>Patient General Information</h5>
            <Row>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter Patient Name" />
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="patientCnic">Patient CNIC</Label>
                  <Input id="patientCnic" placeholder="Enter Patient CNIC" />
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="patientPhone">Patient Phone Number</Label>
                  <Input
                    id="patientPhone"
                    placeholder="Enter Patient Phone Number"
                  />
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="patientAge">Patient Age</Label>
                  <Input id="patientAge" placeholder="Enter Patient Age" />
                </FormGroup>
              </Col>
            </Row>
          </>
        );
      case 2:
        return (
          <>
            <h5>Select Test Category</h5>
            <Row>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="testCategory">Select Category</Label>
                  <Input type="select" id="testCategory">
                    <option>Select a Category</option>
                    <option>Blood Test</option>
                    <option>X-ray</option>
                    <option>CT Scan</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="urgentFees">Urgent Fees</Label>
                  <Input id="urgentFees" placeholder="Enter Urgent Fees" />
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="normalFees">Normal Fees</Label>
                  <Input id="normalFees" placeholder="Enter Normal Fees" />
                </FormGroup>
              </Col>
            </Row>
          </>
        );
      case 3:
        return (
          <>
            <h5>Discount & Fees</h5>
            <Row>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="discount">Discount</Label>
                  <Input type="select" id="discount">
                    <option>No Discount</option>
                    <option>5%</option>
                    <option>10%</option>
                    <option>15%</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg="4" className="mt-4">
                <FormGroup>
                  <Label for="totalFees">Total Fees</Label>
                  <Input id="totalFees" placeholder="Enter Total Fees" />
                </FormGroup>
              </Col>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  const stepLabels = [
    { label: "General Information", stepNumber: 1 },
    { label: "Test & Category", stepNumber: 2 },
    { label: "Payment", stepNumber: 3 },
  ];

  const renderStepLabels = () => {
    return (
      <div className="stepper mb-4">
        <ul className="stepper-list">
          {stepLabels.map(({ label, stepNumber }, index) => (
            <li
              key={index}
              className={`stepper-item ${step === stepNumber ? "active" : ""} ${
                step > stepNumber ? "completed" : ""
              }`}
            >
              <div className="stepper-circle">{}</div>
              <div className="stepper-label">{label}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="p-4" style={{ minHeight: "500px" }}>
          {renderStepLabels()}

          {stepContent()}

          <div className="d-flex justify-content-between mt-4">
            <Button color="secondary" disabled={step === 1} onClick={prevStep}>
              Previous
            </Button>
            <Button
              color="primary"
              onClick={step === 3 ? "jspdf and add data here" : nextStep}
            >
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default NewPatient;
