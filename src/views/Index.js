import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Button,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Col,
  Row,
  Form,
  Spinner,
} from "reactstrap";
import Header from "components/Headers/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  addTest,
  fetchTests,
  deleteTest,
  editTest,
} from "store/actions/testsAction"; // Ensure editTest is imported
import moment from "moment";
import { toast } from "react-toastify";

const Index = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [testUid, setTestUid] = useState("");
  const [loader, setLoader] = useState({
    btn: false,
    data: false,
    filterApply: false,
    filterClear: false,
  });
  const [filters, setFilters] = useState({
    category: "",
    testId: "",
  });
  const [testData, setTestData] = useState({
    testName: "",
    testCategory: "",
    testPrice: 0,
  });

  const { tests, hasMore } = useSelector((state) => state.tests);

  const handleChangeFilters = (e) => {
    const { value, name } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setModal(!modal);
    if (modal) resetForm();
  };

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const resetForm = () => {
    setTestData({
      testName: "",
      testCategory: "",
      testPrice: 0,
    });
    setTestUid("");
  };

  useEffect(() => {
    setLoader((prev) => ({ ...prev, data: true }));
    dispatch(
      fetchTests("", "", () => {
        setLoader((prev) => ({ ...prev, data: false }));
      })
    );
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader((prev) => ({ ...prev, btn: true }));
    if (testUid) {
      dispatch(
        editTest(testUid, testData, () => {
          setLoader((prev) => ({ ...prev, btn: false }));
          toggleModal();
          setTestUid("");
        })
      );
    } else {
      dispatch(
        addTest(testData, () => {
          setLoader((prev) => ({ ...prev, btn: false }));
          toggleModal();
        })
      );
    }
  };

  const handleDelete = () => {
    setLoader((prev) => ({ ...prev, btn: true }));
    dispatch(
      deleteTest(testUid, () => {
        setLoader((prev) => ({ ...prev, btn: false }));
        toggleDeleteModal();
        setTestUid("");
      })
    );
  };

  const openEditModal = (item) => {
    setTestData({
      ...item,
      testName: item.testName,
      testCategory: item.testCategory,
      testPrice: item.testPrice,
    });
    setTestUid(item.uid);
    toggleModal();
  };

  const loadMore = () => {
    setLoader((prev) => ({ ...prev, btn: true }));
    dispatch(
      fetchTests("", true, () => {
        setLoader((prev) => ({ ...prev, btn: false }));
      })
    );
  };

  const applyFilter = () => {
    console.log("Apply filter");
    if (filters.category || filters.testId) {
      setLoader((prev) => ({
        ...prev,
        filterApply: true,
      }));
      dispatch(
        fetchTests(filters, false, () => {
          setLoader((prev) => ({
            ...prev,
            filterApply: false,
          }));
        })
      );
    } else {
      toast.warning("Please Add Any Filter");
    }
  };
  const clearFilter = () => {
    setLoader((prev) => ({
      ...prev,
      filterClear: true,
    }));
    dispatch(
      fetchTests("", false, () => {
        setFilters((prev) => ({
          ...prev,
          category: "",
          testId: "",
        }));
        setLoader((prev) => ({
          ...prev,
          filterClear: false,
        }));
      })
    );
  };

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
              <div
                className="d-flex justify-content-center
    align-items-center"
              >
                <Input
                  placeholder="Add Test id"
                  name="testId"
                  value={filters.testId}
                  onChange={handleChangeFilters}
                />
                <Input
                  placeholder="Add Test Category"
                  className="mx-2"
                  value={filters.category}
                  name="category"
                  onChange={handleChangeFilters}
                />
                <Button
                  className="text-nowrap"
                  color="primary"
                  onClick={applyFilter}
                >
                  {loader.filterApply ? <Spinner size="sm" /> : "Apply filter"}{" "}
                </Button>
                <Button
                  className="text-nowrap"
                  color="danger"
                  onClick={clearFilter}
                >
                  {loader.filterClear ? <Spinner size="sm" /> : "Clear filter"}
                </Button>
              </div>
              <Button
                color="primary"
                onClick={() => {
                  toggleModal();
                  setTestUid("");
                }}
              >
                Add New Test
              </Button>
            </div>
            {loader.data ? (
              <div className="text-center">
                <Spinner color="primary" />
              </div>
            ) : (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Test Id</th>
                    <th scope="col">Test Name</th>
                    <th scope="col">Test Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.length > 0 ? (
                    tests.map((item, index) => (
                      <tr key={index}>
                        <td>{item.testId}</td>
                        <td>{item.testName}</td>
                        <td>{item.testCategory}</td>
                        <td>{item.testPrice}</td>
                        <td>
                          {moment
                            .unix(item.created_at.seconds)
                            .format("MM/DD/YYYY")}
                        </td>
                        <td>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => {
                              setTestUid(item.uid);
                              toggleDeleteModal();
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => openEditModal(item)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No tests available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
            {tests.length > 4 && (
              <div className="text-center">
                <Button
                  color="primary"
                  onClick={loadMore}
                  disabled={!hasMore || loader.btn}
                >
                  {loader.btn ? <Spinner size="sm" /> : "Load More"}
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal} centered size="xl">
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label for="test-name">Test Name</Label>
                  <Input
                    required
                    type="text"
                    id="test-name"
                    name="testName"
                    placeholder="Enter test name"
                    value={testData.testName}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="test-category">Test Category</Label>
                  <Input
                    required
                    type="text"
                    id="test-category"
                    name="testCategory"
                    placeholder="Enter test category"
                    value={testData.testCategory}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="price">Test Price</Label>
                  <Input
                    required
                    type="number"
                    id="price"
                    name="testPrice"
                    placeholder="Enter test price"
                    value={testData.testPrice}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggleModal}>
              Close
            </Button>
            <Button color="success" type="submit" disabled={loader.btn}>
              {loader.btn ? (
                <Spinner size="sm" />
              ) : testUid ? (
                "Upgrade"
              ) : (
                "Save Test"
              )}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={deleteModal} centered toggle={toggleDeleteModal}>
        <ModalBody>
          <div className="text-center">
            <span className="mt-5" style={{ fontSize: 30 }}>
              Are you sure?
            </span>
            <br />
            <br />
            <span className="mt-5" style={{ fontSize: 16 }}>
              You want to delete this test.
            </span>
            <br />
            <br />
            <Button color="secondary" onClick={toggleDeleteModal}>
              Cancel
            </Button>{" "}
            <Button color="danger" onClick={handleDelete} disabled={loader.btn}>
              {loader.btn ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Index;
