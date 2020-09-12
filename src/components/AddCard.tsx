import React from "react";
import { TextField, makeStyles, createStyles, CircularProgress, Button } from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import { createCards } from "../graphql/mutations";
import { Severity } from "../constants";
import Alert from "./common/Alert";

const useStyles = makeStyles(theme =>
  createStyles({
    form: {
      margin: "0 auto",
      [theme.breakpoints.up("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    btn: {
      width: "100%",
    },
  }),
);

interface Card {
  category: string;
  question: string;
  answer: string;
}

const AddCard = () => {
  const initialState = { category: "", question: "", answer: "" };

  const [input, setInput] = React.useState<Card>(initialState);
  const [errors, setErrors] = React.useState<Card>(initialState);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<{ type: Severity; title: string; content: string }>();
  const [alertVisibility, setAlertVisibility] = React.useState(false);

  const classes = useStyles();

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value, name },
    } = event;
    const newVal = String(value);
    setErrors(initialState);
    setInput(prevState => {
      return { ...prevState, [name]: newVal };
    });
  };

  const save = async () => {
    setLoading(true);
    const add = { id: input.question, category: input.category, question: input.question, answer: input.answer };
    try {
      await API.graphql(graphqlOperation(createCards, { input: add }));
      setInput(initialState);
      setErrors(initialState);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setAlert({ type: "error", title: "Error", content: e });
      setAlertVisibility(true);
    }
  };

  return (
    <div className={classes.form}>
      <TextField
        id="outlined-basic"
        autoComplete="off"
        name="category"
        style={{ width: "100%", height: "auto", paddingBottom: "10px" }}
        value={input.category}
        label="Category"
        inputProps={{ maxLength: 255 }}
        onChange={handleInputChange}
        required
        error={Boolean(errors?.category)}
        helperText={errors?.category}
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        autoComplete="off"
        name="question"
        style={{ width: "100%", height: "auto", paddingBottom: "10px" }}
        value={input.question}
        label="Question"
        inputProps={{ maxLength: 255 }}
        onChange={handleInputChange}
        required
        error={Boolean(errors?.question)}
        helperText={errors?.question}
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        autoComplete="off"
        name="answer"
        multiline
        rows={4}
        style={{ width: "100%", height: "auto", paddingBottom: "10px" }}
        value={input.answer}
        label="Answer"
        inputProps={{ maxLength: 255 }}
        onChange={handleInputChange}
        required
        error={Boolean(errors?.answer)}
        helperText={errors?.answer}
        variant="outlined"
      />
      {loading ? (
        <Button className={classes.btn} onClick={() => save()} variant="contained" color="primary">
          SAVE
          <CircularProgress style={{ marginLeft: "10px" }} size={20} />
        </Button>
      ) : (
        <Button className={classes.btn} onClick={() => save()} variant="contained" color="primary">
          SAVE
        </Button>
      )}
      <Alert
        type={alert?.type}
        title={alert?.title!}
        content={alert?.content!}
        open={alertVisibility}
        close={() => setAlertVisibility(false)}
        timer={false}
      />
    </div>
  );
};
export default AddCard;
