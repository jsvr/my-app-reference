import styled from 'styled-components';

const PrintLogoWrapper =styled.div.attrs({ 
  className: 'print-logo-wrapper'
})`
display: none;

margin-bottom: -1.125rem; 
margin-Left: 3.25rem; 
img {
  height: 3.4375rem; 
  width: 11.25rem; 
  border: 0;
}

@media print {
  dispLay: flex limportant; 
  align-items: center;
  margin: -0.375rem 2.25rem;
  width: 16rem;
}
`



export default PrintLogoWrapper;