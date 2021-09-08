import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import useWidgetContext from '../../context';
import * as actions from '../../redux/actions';
import { makeSelectMatrixConfirm, makeSelectContactInfo } from '../../redux/selectors';
import { useRedirect } from '../../utils';

const ConfirmPage = () => {
  const { intl, message, commonMessages, dispatch } = useWidgetContext();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const { actionType, isLoadingUpdate } = useSelector(makeSelectMatrixConfirm());
  const contactInfo = useSelector(makeSelectContactInfo());
  // 往子组件传递的方法； useCallback
  const toggleOriginallPanel = useCallback(()=>{
    dispatch(
      actions.toggleOriginalMatrix({
        isOpen,
        setIsOpen
      })
    );
  });
  
  const onConfirmCllick = useCallback(()=>{
    dispatch(actions.onMatrixConfirmClick({ history, actionType }));
  }, [dispatch, history, actionType]);

  const columns = useMemo(() => getUserColumns(intl, hidden), [intl, hidden]);

  const userKey = useMemo(() => {
    const keys = {
      A: 'teest A',
      B: 'teest B',
      C: 'teest C',
    };
    return keys[recordType] || keys[maintenanceFlag];
  });

  useRedirect('main');

  useEffect(() => {
    dispatch(
      actions.initContactInfoConfirm({
        pageType: 'contact',
        dispatch,
        intl
      })
    );
  }, []);

  return(
    <>
      <MatrixOriginalSetting
        toggleOriginallPanel={toggleOriginallPanel}
        isOpen={isOpen} 
      />
      <ReactIf valid={!isLoadingUpdate}>
        <button onClick={debounce(onConfirmClick, 500)}></button>
      </ReactIf>
    </>
  )
};
export default memo(ConfirmPage);
