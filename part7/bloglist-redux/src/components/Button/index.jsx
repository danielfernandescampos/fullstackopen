import { Container } from "./styles";

export default function Button(props) {
  return (
    <Container type="button" {...props}>
      {" "}
      {props.children}{" "}
    </Container>
  );
}
