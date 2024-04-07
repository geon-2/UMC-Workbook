let valid_obj = {
    name: {
        success_msg: "멋진 이름이네요!",
        empty_msg: '필수 입력 항목입니다.',
        validList: [
            {
                re: /^[a-zA-Zㄱ-ㅎ가-힣]+$/,
                msg: "이름은 문자열이어야 합니다."
            }
        ],
        chk: false
    },
    email: {
        success_msg: "올바른 이메일 형식입니다!",
        empty_msg: '올바른 이메일 형식이 아닙니다.',
        validList: [
            {
                re: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                msg: "올바른 이메일 형석이 아닙니다!"
            }
        ],
        chk: false
    },
    age: {
        success_msg: "올바른 나이 형식이니다!",
        empty_msg: '나이를 입력해주세요!',
        validList: [
            {
                re: /([1-9][0-9]*)$/,
                msg: "나이는 숫자형식이어야 합니다!"
            },
            {
                re: /^(?!-).*[1-9][0-9]*$/,
                msg: "나이는 음수가 될 수 없습니다!"
            },
            {
                re: /^(?!\.)[1-9](?!\.)[0-9]*$/,
                msg: "나이는 소수가 될 수 없습니다!"
            },
        ],
        chk: false
    },
    pw: {
        success_msg: "올바른 비밀번호입니다!",
        empty_msg: '비밀번호는 최소 4자리 이상이어야 합니다.',
        validList: [
            {
                re: /^.{4,}$/,
                msg: "비밀번호는 최소 4자리 이상이어야 합니다."
            },
            {
                re: /^.{4,12}$/,
                msg: "비밀번호는 최대 12자리까지 가능합니다."
            },
            {
                re: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                msg: "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다."
            }
        ],
        chk: false
    },
    pw_chk: {
        success_msg: "비밀번호가 일치합니다.",
        empty_msg: "비밀번호가 일치하지 않습니다.",
        chk: false
    }
}

let chk = true
const vaild_msg = {
    name: '멋진 이름이네요!',
    email: '올바른 이메일 형식입니다!',
    age: '올바른 나이 형식이니다!',
    pw: '올바른 비밀번호입니다!',
    pw_chk: '비밀번호가 일치합니다.'
}

const form = document.getElementById("sign-up-form")
form.onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        age: formData.get('age'),
        pw: formData.get('pw'),
        pw_chk: formData.get('pw_chk'),
    }

    loop: for (const [name, value] of Object.entries(data)) {
        if (value == '' || (name == 'pw_chk' && value != data['pw'])) {
            showMsg(name, valid_obj[name].empty_msg)
        } else {
            if (name != 'pw_chk') {
                for (const valid of valid_obj[name].validList) {
                    if (!valid.re.test(value)) {
                        showMsg(name, valid.msg);
                        continue loop;
                    }
                    if (name == 'age' && ~~value < 19) {
                        showMsg(name, '우리 영화 사이트는 19살 이상만 가입이 가능합니다.')
                        continue loop;
                    }    
                }
            }

            valid_obj[name].chk = true
            showMsg(name, valid_obj[name].success_msg, true)
        }
    }

    for (const [key, value] of Object.entries(valid_obj)) {
        if (!value.chk) return;
    }

    document.getElementById('sign-up-modal').setAttribute('class', 'modal modal-show')
}

const inputs = Array.from(form.getElementsByTagName('input'))
const button = form.getElementsByTagName('button')[0]
const showMsg = function (name, msg, bool = false) {
    const input = form.querySelector(`input[name='${name}'] + div`)
    input.setAttribute('class', `validation_msg ${bool ? 'valid' : 'invalid'}`)
    input.setAttribute('style', 'display: block;')
    input.innerHTML = msg;
}

const modal_close_button = Array.from(document.getElementsByClassName('modal-close-button'))
modal_close_button.forEach(ele => ele.addEventListener('click', function (e) {
    e.currentTarget.parentNode.parentNode.parentNode.setAttribute('class', 'modal')
}))