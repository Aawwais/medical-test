import React, { useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Col,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header";

const Index = () => {
  const [modal, setModal] = useState(false);
  const [testData, setTestData] = useState({
    testName: "",
    testCategory: "",
    testPrice: 0,
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    setTestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <CardTitle tag="h5" className="m-0">
                Test Details
              </CardTitle>
              <Button color="primary" onClick={toggleModal}>
                Add New Test
              </Button>
            </div>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">FHP Id</th>
                  <th scope="col">Fan Name</th>
                  <th scope="col">Allotment</th>
                  <th scope="col">Set Percentage</th>
                  <th scope="col">Expire Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal} centered size="xl">
        <ModalBody>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label for="test-name">Test Name</Label>
                <Input
                  type="text"
                  id="test-name"
                  name="testName"
                  placeholder="Enter normal test details"
                  value={testData.testName}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="test-category">Test Category</Label>
                <Input
                  type="text"
                  id="test-category"
                  name="testCategory"
                  placeholder="Enter medical test details"
                  value={testData.testCategory}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="price">Test Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="testPrice"
                  placeholder="Enter medical test details"
                  value={testData.testPrice}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              toggleModal();
            }}
          >
            Save Test
          </Button>
          <Button color="danger" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;
