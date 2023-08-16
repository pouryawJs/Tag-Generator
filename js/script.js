let $ = document

const tagList = $.querySelector('ul')
const tagInput = $.querySelector('ul input')
const tagRemainingNum = $.querySelector('.details p span')
const removeAllBtn = $.querySelector('.details button')

let tags = [];
let maxTagCount = 10 


const countTag = () => {

    tagInput.focus()
    tagRemainingNum.innerHTML = maxTagCount - tags.length
    
}
const removeAllLi = () => {
    tagList.querySelectorAll('li').forEach(liElem => liElem.remove())
}

const remove = (el, name) => {
    el.parentElement.remove()
    let indexOfTag = tags.indexOf(name)
    
    tags.splice(indexOfTag , 1)
    addTagsToDOM()
}

const addTagsToDOM = () => {

    removeAllLi()

    let tagLi = null;
    
    [...tags].reverse().forEach(tagName => {
        tagLi = `
            <li>
                ${tagName}
                <i class="uit uit-multiply" onclick="remove(this, '${tagName}')"></i>
            </li>
        `
        tagList.insertAdjacentHTML('afterbegin', tagLi)
        
    })

    countTag()
}

const addTag = (event) => {
    if(tags.length < 10 && tagInput.value && event.key === 'Enter'){
        let tagName = tagInput.value
        if(!tags.includes(tagName.toLowerCase())){
            
            tagName.split(',').forEach(tag => {
                tags.push(tag)
            })
            tagInput.value = ''
            
        }
    }
    addTagsToDOM()
}


tagInput.addEventListener('keyup', addTag)
removeAllBtn.addEventListener('click', () => {
    tags = []

    removeAllLi()
    countTag()
})