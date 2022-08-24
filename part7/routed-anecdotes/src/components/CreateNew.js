import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.setNotification(`${content.value} added successfuly`);
  };

  const resetForm = () => {
    content.onChange({ target: { value: "" } });
    author.onChange({ target: { value: "" } });
    info.onChange({ target: { value: "" } });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control {...content} />
          <Form.Label>author</Form.Label>
          <Form.Control {...author} />
          <Form.Label>url for more info</Form.Label>
          <Form.Control {...info} />
          <Button variant="primary" type="submit">
            create
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            reset
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateNew;
