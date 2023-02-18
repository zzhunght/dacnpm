import { faCircleUser, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import images from "../../assets/image/";
const rawData = [
  {
    id: 1,
    name: "Lược nhớt",
    price: "10000",
    inventory: "20",
    type: "Phụ tùng",
  },
  {
    id: 2,
    name: "Bugi",
    price: "1000",
    inventory: "500",
    type: "Phụ tùng",
  },
  {
    id: 3,
    name: "Dầu động cơ",
    price: "500",
    inventory: "500",
    type: "LOẠI PHỤ PHẪM, DẦU MỠ",
  },
  {
    id: 4,
    name: "Xăm, lốp",
    price: "10",
    inventory: "10",
    type: "Phụ tùng",
  },
  {
    id: 5,
    name: "Xăm, lốp",
    price: "10",
    inventory: "10",
    type: "Phụ tùng",
  },
];
function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="home-header">
        <Container>
          <Row>
            <Col>
              <div>
                <input
                  type="text"
                  className="search search-home"
                  placeholder="Tìm kiếm"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>
            <Col xs={6}></Col>
            <Col>
              {" "}
              <div className="account">
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <section className="product">
        <div className="container">
          <div className="row">
            {rawData
              .filter(
                (row) =>
                  row.name.toLowerCase().includes(search) ||
                  row.type.toLowerCase().includes(search)
              )
              .map((data, index) => {
                return (
                  <div
                    className="col-xl-3 col-lg-4 col-sm-12 accessory-item"
                    key={index}
                  >
                    <Card
                      className="card-home"
                      style={{ background: "#41a1a4" }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Card.Img
                          src={images.item}
                          variant="top"
                          style={{ width: "60px", height: "60px" }}
                        ></Card.Img>
                      </div>
                      <Card.Body
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Card.Text style={{ fontWeight: "1000" }}>
                          {data.name}
                        </Card.Text>
                        <Card.Text style={{ paddingLeft: "12px" }}>
                          {data.price + "VND"}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
