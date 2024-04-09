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

class Storage {
    static setData (key, value, expires) {
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
    }

    static getData (key) {
        return JSON.parse(window.localStorage.getItem(key)) || [];
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
        Storage.setData('planning', planning, 2)
        Storage.setData('complete', complete, 2)
    }

    const removeTask = (e) => {
        const currentTarget = e.target.parentNode
        const idx = Array.from(currentTarget.parentNode.children).indexOf(currentTarget)
        if (idx > -1) complete.splice(idx, 1)
        Storage.setData('complete', complete, 2)
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
    for (let idx in planning) Element.appendElement(planningTask, [createTaskElement(planning[idx], idx)])

    const completeTask = document.querySelector('#complete-task > .task-list')
    for (let idx in complete) Element.appendElement(completeTask, [createTaskElement(complete[idx], idx)], false)
}

window.onload = _ => {
    planning = Storage.getData('planning')
    complete = Storage.getData('complete')
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
        Storage.setData('planning', planning, 2)
        e.target.children[0].value = "";
    })
}
