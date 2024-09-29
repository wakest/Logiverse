/*
 *  
 *  The super epic global script js
 * 
 */
document.querySelectorAll('a[data-transition-from]').forEach(element => {
    element.addEventListener("click", async e => {
        e.preventDefault()

        const direction = element.getAttribute('data-transition-from')
        const iframe = document.createElement('iframe')
        iframe.style = `width:100vw;height:100vh;position:fixed;transition:transform .5s;top:0;left:0;transform:translate(${
            ({
                right: '100vw',
                left: '-100vw',
                top: '0, -100vh',
                bottom: '0, 100vh'
            })[direction]
        });`
        document.body.style='transition:transform .5s;'
        iframe.src=element.href

        document.body.appendChild(iframe)

        await new Promise(r => setTimeout(r, 700))

        document.body.style.transform = `translate(${
            ({
                right: '-100vw',
                left: '100vw',
                top: '0, 100vh',
                bottom: '0, -100vh'
            })[direction]
        })`

        await new Promise(r => setTimeout(r, 500))
        location.href=element.href
    })
})