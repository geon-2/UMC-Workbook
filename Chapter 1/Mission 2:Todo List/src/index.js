class Element {
    static createElement (tag, html, attrs = {}) {
        let element = document.createElement(tag);
        element.innerHTML = html;
        for (const [key, value] of Object.entries(attrs)) {
            if (key == 'listener') element.addEventListener(value.event, value.callback);
            else element.setAttribute(key, value)
        }
        return element;
    }

    static appendElement (parent, children) {
        for (let element of children) parent.appendChild(element);
    }

    static removeElement (tag, idx) {
        const element = document.querySelectorAll(tag).item(idx)
        element.parentNode.removeChild(element)
    }
}

class Cookie {
    static setCookie (key, value, expires) {
        value = JSON.stringify(value);
        let date = new Date()
        date.setTime(date.getTime() + expires*24*60*60*1000)
        document.cookie = key + "=" + value + ";expires=" + date.toUTCString() + ";path=/"
    }

    static getCookie (key) {
        let value = JSON.parse(document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)'));
        return value ? value[2] : [];
    }
}

let planning = []
let complete = []

const createTaskElement = (title, idx = null, type = true) => {
    if (idx == null) idx = type ? planning.length : complete.length

    const completeTask = (e) => {
        const currentTarget = e.target.parentNode
        const idx = Array.from(currentTarget.parentNode.children).indexOf(currentTarget)
        const title = planning[idx]
        Element.removeElement('#planning-task .task', idx)
        Element.appendElement(
            document.querySelector('#complete-task > .task-list'),
            [createTaskElement(title, null, false)]
        )
        complete.push(planning[idx])
        if (idx > -1) planning.splice(idx, 1)
        Cookie.setCookie('planning', planning, 20)
        Cookie.setCookie('complete', complete, 20)
    }

    const removeTask = (e) => {
        const currentTarget = e.target.parentNode
        const idx = Array.from(currentTarget.parentNode.children).indexOf(currentTarget)
        if (idx > -1) complete.splice(idx, 1)
        Cookie.setCookie('complete', complete, 20)
        Element.removeElement('#complete-task .task', idx)
    }

    const span = Element.createElement('span', title)
    const button = Element.createElement(
        'button',
        type ? '완료' : '삭제',
        {
            'type': 'button',
            'class': 'task-button',
            'listener': {
                'event': 'click',
                'callback': type ? completeTask : removeTask
            }
        }
    )

    const task = Element.createElement('div', null, {'class': 'task'})
    Element.appendElement(task, [span, button])

    return task
}

const rendering = () => {
    const planningTask = document.querySelector('#planning-task > .task-list')
    for (let idx in planning) Element.appendElement(planningTask, createTaskElement(planning[idx], idx))

    const completeTask = document.querySelector('#complete-task > .task-list')
    for (let idx in complete) Element.appendElement(completeTask, createTaskElement(complete[idx], idx))
}

window.onload = _ => {
    planning = Cookie.getCookie('planning')
    complete = Cookie.getCookie('complete')
    rendering()

    document.getElementById('plan-add-form').addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get('plan_title')
        Element.appendElement(
            document.querySelector('#planning-task > .task-list'),
            [createTaskElement(title)]
        )
        planning.push(title)
        Cookie.setCookie('planning', planning, 20)
    })
}
