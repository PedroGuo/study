
// var vm = new Vue({
//     data: {
//         message: 'Hello Vue!'
//       },
//     // 选项
//     method: {
//         handleClickParent() {
//             console.log(this);
//         }
//     }
// })
var app = new Vue({
    el: '#app',
    data: {
        images: [],
        dragover: false,
        disabled: false,
        message: 'Hello Vue!'
    },
    methods: {
        handleClick() {
            if (!this.disabled) {
                this.$refs.input.value = null;
                this.$refs.input.click();
            }
        },
        handleKeydown(e) {
            if (e.target !== e.currentTarget) return;
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.handleClick();
            }
        },
        handleInputChange(e) {
            console.log(e.target.files);
        },
        onDragover() {
            if (!this.disabled) {
                this.dragover = true;
            }
        },
        onDrop(e) {
            if (this.disabled || !this.uploader) return;
            const accept = this.uploader.accept;
            this.dragover = false;
            if (!accept) {
                this.$emit('file', e.dataTransfer.files);
                return;
            }
            this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
                const { type, name } = file;
                const extension = name.indexOf('.') > -1
                    ? `.${name.split('.').pop()}`
                    : '';
                const baseType = type.replace(/\/.*$/, '');
                return accept.split(',')
                    .map(type => type.trim())
                    .filter(type => type)
                    .some(acceptedType => {
                        if (/\..+$/.test(acceptedType)) {
                            return extension === acceptedType;
                        }
                        if (/\/\*$/.test(acceptedType)) {
                            return baseType === acceptedType.replace(/\/\*$/, '');
                        }
                        if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                            return type === acceptedType;
                        }
                        return false;
                    });
            }));
        }
    }
})