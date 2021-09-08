import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const useRedirect = (path) => {
  const history = useHistory();
  const { location: { state }, push } = history;

  useEffect(() => {
    if(!state) {
      push(path);
    }
  }, [state]);
}

export { useRedirect };
