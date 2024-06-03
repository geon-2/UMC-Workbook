import styled from 'styled-components';
import { CartIcon } from '../constants/icons';

export const Header = styled.header`
    width: 100%;
    height: 8rem;
    padding: 0 calc(50% - 40rem);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #635DFE;
    color: #fff;
    & > h1 {
        font-size: 2rem;
        font-weight: 700;
    }
`;

const CartButtonStyle = styled.button.attrs(props => ({ 
    amount: props.amount 
}))`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    & > svg {
        width: 3rem;
        height: 3rem;
        stroke: #fff;
    }
    &:after {
        display: block;
        content: "${props => props.amount}";
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: #bbb;
        color: #fff;
        z-index: 1;
        top: -0.5rem;
        right: -0.25rem;
        text-align: center;
        line-height: 2rem;
        font-size: 1.2rem;
    }
`;

export function CartButton({ amount }) {
    return (
        <CartButtonStyle amount={amount}>
            <CartIcon />
        </CartButtonStyle>
    )
}
