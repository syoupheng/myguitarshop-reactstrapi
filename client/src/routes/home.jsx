import Container from "react-bootstrap/esm/Container";
import PopularCarousel from "../components/PopularCarousel";
import NewArrivals from "../components/NewArrivals";

export default function Home() {
    return (
        <Container>
          <PopularCarousel />
          <hr className="my-5"></hr>
          <NewArrivals />
        </Container>
    )
}