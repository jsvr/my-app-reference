import styled from 'styled-components';

const Styles = styled.div.attrs({
  className: 'flloat-bottom-pannel'
})`
  display: ${(props) => (props.isShow ? '' : 'none')};
  margin-right: 0;
`;

export default Styles;