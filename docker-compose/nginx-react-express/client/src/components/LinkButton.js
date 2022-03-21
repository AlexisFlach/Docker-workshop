import { useHistory } from "react-router-dom";

import {Button} from 'react-bootstrap'

const LinkButton = ({urlInfo, urlText}) => {

  const history = useHistory();

  function handleClick() {
    history.push(`/${urlInfo}`);
  }

  return (
    <Button type="button" onClick={handleClick}>
     {urlText}
    </Button>
  );
}

export default LinkButton;