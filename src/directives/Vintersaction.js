export default {
    mounted(el, binding) {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }

        const callback = (entries, observer) => { //это как раз та функция, которая отработает, когда мы пересекли необходимвй элемент
            if(entries[0].isIntersecting) {
                binding.value()
            }
        }

        const observer = new IntersectionObserver(callback, options);
        observer.observe(el)
    },
    name: 'intersaction'
}