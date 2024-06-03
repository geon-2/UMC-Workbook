import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { closeModal } from '../store/modalSlice';

const ModalContainer = styled.div.attrs(props => ({
    display: props.state ? 'flex' : 'none',
    opacity: props.state ? 1 : 0,
}))`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
    opacity: ${props => props.opacity};
    transition: opacity 0.3s;
`

const ModalContent = styled.div`
    padding: 4rem;
    background: #fff;
    border-radius: 5px;
    & > p {
        font-size: 1.7rem;
        letter-spacing: 0.3rem;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 700;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 4rem;
    & > button {
        padding: 1rem 2rem;
        border-radius: 5px;
        border-style: solid;
        border-width: 1px;
        cursor: pointer;
        font-size: 1.5rem;
        background: none;
        &:first-child {
            color: #000;
            border-color: #666;
            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }
        }
        &:last-child {
            color: #c00;
            border-color: #c00;
            &:hover {
                background: rgba(255, 0, 0, 0.1);
        }
    }
`;

function Modal() {
    const modalState = useSelector(state => state.modal);
    const dispatch = useDispatch();

    return (
        <ModalContainer state={modalState}>
            <ModalContent>
                <p>담아주신 모든 음반을 삭제하세겠습니까?</p>
                <ModalButtons>
                    <button onClick={() => {
                        dispatch(clearCart())
                        dispatch(closeModal())
                    }}>네</button>
                    <button onClick={() => dispatch(closeModal())}>아니요</button>
                </ModalButtons>
            </ModalContent>
        </ModalContainer>
    );
}

export default Modal;