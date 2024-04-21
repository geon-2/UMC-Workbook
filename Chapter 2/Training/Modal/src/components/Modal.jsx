import { useState } from 'react'
import '../App.css'

function Modal() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>버튼 열기</button>
            <div className={open ? "modal-cover modal-open" : "modal-cover"}>
                <div className="modal-block">
                    <h2>안녕하세요</h2>
                    <p>모달 내용은 어쩌고 저쩌고</p>
                    <div className='modal-button-cover'>
                        <button onClick={() => setOpen(false)}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;