import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, removeItem, calculateTotals } from './store/cartSlice';
import { openModal } from './store/modalSlice';
import { Header, CartButton } from './styles/Header';
import { PlayListContainer, TotalInfo, ResetButton } from './styles/PlayList';
import Modal from './components/Modal';
import PlayInfo from './components/PlayInfo';

function App () {
    const playlist = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const { totalPrice, totalAmount } = useSelector(calculateTotals);
    
    return (
        <>
            <Header>
                <h1>UMC PlayList</h1>
                <CartButton amount={totalAmount} />
            </Header>
            <PlayListContainer>
                <h1>당신이 선택한 음반</h1>
                {playlist.map((item, index) => <PlayInfo 
                        key={index} item={item}
                        upAction={() => dispatch(increase(item.id))}
                        downAction={() => dispatch(item.amount > 1 ? decrease(item.id) : removeItem(item.id))}
                        />
                )}
                <TotalInfo>
                    <p>총 가격</p>
                    <p>₩ {totalPrice}원</p>
                </TotalInfo>
                <ResetButton onClick={() => dispatch(openModal())}>장바구니 초기화</ResetButton>
            </PlayListContainer>
            <Modal />
        </>
    )
}

export default App;