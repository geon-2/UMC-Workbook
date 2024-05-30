import { useRouteError } from "react-router-dom";
import Error from "../components/Error";

function ErrorPage() {
    const error = useRouteError();

    let errorMessage;
    if (error) {
        if (error.status) {
            errorMessage = `${error.status} ${error.statusText}`;
        } else if (error.message) {
            errorMessage = error.message;
        } else {
            errorMessage = "Unknown error occurred";
        }
    } else {
        errorMessage = "No error information available";
    }

    return (
        <Error errorText={errorMessage} />
    );
}

export default ErrorPage;
