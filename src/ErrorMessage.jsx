
import { Alert } from 'react-bootstrap';

export default function ErrorMessage(props) {
    const errorMsg = props.errorMsg

    let errorComponent = (errorMsg)? (
        <Alert variant="warning" >
            {errorMsg}
        </Alert>) : (
            <></>
        )

    return errorComponent;

}