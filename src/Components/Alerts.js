import { ToastContainer, Toast } from "react-bootstrap";

export default function Alerts(props) {
  const toastMessages = {
    signUpError: "Please address the error messages before submitting.",
    petFormCompletion: "Please complete your pet's profile.",
    eventFormCompletion:
      "Make sure you include the category, sub-category, and start time.",
    reminderSet: `PawPal will remind you about ${props.petName}'s next ${props.topic}.`,
  };

  return (
    <ToastContainer position="bottom-center" className="margin-tb-sm">
      <Toast
        show={props.showAlert}
        onClose={props.hideAlert}
        delay={3000}
        autohide
      >
        <Toast.Body className="dark small">
          {toastMessages[props.alertKey]}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
