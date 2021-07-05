axios.defaults.baseURL = 'http://localhost:3000/';
function getEle(select) {
    return document.querySelector(select)
}

function addEvent(dom, eventType, handle) {
    if (!dom) return
    dom.addEventListener(eventType, handle)
    return () => {
        dom.removeEventListener(eventType, handle)
    }
}




function onProgress(progressEvent) {
    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
    const uploadMessage = '上传 ' + complete
    console.log(uploadMessage);
}

function uploadFile(file, name = 'file') {
    const formData = new FormData()
    formData.append(name, file)
    axios.post('/upload/single', formData, {
        onUploadProgress(progressEvent) {
            if (progressEvent.lengthComputable) {
                onProgress(progressEvent);
            }
        }
    })
}

function checkFileType() {

}



function getDataURL(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = function () {
            resolve(fileReader.result)
        }
        fileReader.onerror = function () {
            reject()
        }
    })

}

function renderImageList(list) {
    if (!list || !Array.isArray(list)) return
    const uploadList = getEle('.el-upload-list')
    uploadList.innerHTML = null
    const Fragment = document.createDocumentFragment()
    list.forEach((item) => {
        const li = document.createElement('li')
        const image = document.createElement('img')
        image.src = item.src
        li.appendChild(image)
        Fragment.appendChild(li)
    })
    uploadList.appendChild(Fragment)
}


function main() {
    const uploadContainer = getEle('.el-upload-dragger')
    const inputElement = getEle('.el-upload__input')
    const previewImageList = []

    async function previewFile(e) {
        let fileList = e.target.files || e.dataTransfer.files
        if (!fileList || !fileList.length) return
        fileList = [...fileList]
        for (const file of fileList) {
            uploadFile(file)
            const dataURL = await getDataURL(file)
            previewImageList.push({
                src: dataURL
            })
        }
        renderImageList(previewImageList)
    }


    addEvent(uploadContainer, 'click', function (e) {
        inputElement.value = null;
        inputElement.click()
    })

    addEvent(uploadContainer, 'dragover', function (e) {
        e.preventDefault()
    })

    addEvent(uploadContainer, 'drop', async function (e) {
        e.preventDefault()
        previewFile(e)
    })

    addEvent(inputElement, 'change', async function (e) {
        previewFile(e)
    })

}

main()

