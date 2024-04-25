import NavigationBar from '../components/NavigationBar';
import {SignSection, SignForm, InputBox} from '../style/signPageStyle'

function SignUpPage() {
    return (
        <>
            <NavigationBar />
            <SignSection>
                <SignForm>
                    <InputBox>
                        <input type="text" name="name" placeholder='이름을 입력하세요'/>
                    </InputBox>
                    <InputBox>
                        <input type="text" name="id" placeholder='아이디를 입력하세요'/>
                    </InputBox>
                    <InputBox>
                        <input type="text" name="pw" placeholder='비밀번호를 입력하세요'/>
                    </InputBox>
                    <InputBox>
                        <input type="text" name="pw_chk" placeholder='비밀번호를 동일하게 입력하세요'/>
                    </InputBox>
                    <button type='submit'>완료</button>
                </SignForm>  
            </SignSection>
        </>
    )
}

export default SignUpPage;