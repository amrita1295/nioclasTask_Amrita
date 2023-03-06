import {React, useState, useEffect,Fragment } from "react";
import { MathJax,MathJaxContext  } from 'better-react-mathjax';
import {GrLinkNext} from 'react-icons/gr';
import {GrLinkPrevious} from 'react-icons/gr';
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import LoadingSpinner from "./Loading";
const  MathQuestions=()=> {
  const questionIDs = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901"
  ];
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionIDs[currentQuestionIndex]}`
    )
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, [currentQuestionIndex]);

  const handleNext = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex === questionIDs.length - 1
        ? 0
        : currentQuestionIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex === 0
        ? questionIDs.length - 1
        : currentQuestionIndex - 1
    );
  };

  return (
    <Fragment>
    <div>
      <h1 style={{color:"red",textAlign:"center"}}>Maths Questions</h1>
      <p style={{fontSize:"25px",fontWeight:"bold"}}> Question {currentQuestionIndex+1}</p>
      {/* Display the current question */}
      <h4 style={{fontSize:"22px"}}>{questions.length > 0 ?<MathJaxContext> <MathJax>{questions[0].Question}</MathJax></MathJaxContext> 
      : 
      <LoadingSpinner />}</h4>
      <div style={{marginTop:"2em"}}>
    <Button color="primary"
        size="md"
        active
        aria-pressed="true"  onClick={handlePrevious} disabled={currentQuestionIndex===0}>Previous <GrLinkPrevious /></Button> {''}
      <Button  color="primary"
        size="md"
        active
        aria-pressed="true" onClick={handleNext} disabled={currentQuestionIndex===questionIDs.length-1}>Next <GrLinkNext /></Button>
    </div>
    </div>
    </Fragment>
   
  );
}

export default MathQuestions;
